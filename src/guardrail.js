// src/guardrail.js
const fs = require('fs');
const path = require('path');

console.log("🏭 FactoryGate: Initiating autonomous structural policy verification...");

// Configuration rules
const PROTECTED_PATHS = ['config', 'auth', 'database'];
const REQUIRED_MANIFEST_KEYS = ['agentVersion', 'capabilities', 'stateFingerprint'];

function runGuardrailChecks() {
    let policyViolations = 0;

    // Simulate reading a PR configuration or payload map passed by GitHub Environment
    let payloadPath = path.join(__dirname, 'mock-payload.json');
    if (!fs.existsSync(payloadPath)) {
        console.error("❌ Guardrail Error: State payload missing.");
        process.exit(1);
    }

    const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
    console.log(`\n🔍 Scanning PR #${payload.prNumber} submitted by AI Agent: [${payload.agentName}]`);

    // Rule 1: STRICT_PATH_ISOLATION
    console.log("📋 Evaluating Policy: STRICT_PATH_ISOLATION...");
    payload.modifiedFiles.forEach(file => {
        const isViolating = PROTECTED_PATHS.some(protected => file.startsWith(protected));
        if (isViolating) {
            console.error(`   ❌ CRITICAL VIOLATION: Agent attempted to modify a restricted system structural file: "${file}"`);
            policyViolations++;
        }
    });

    // Rule 2: SCHEMA_INTEGRITY
    console.log("📋 Evaluating Policy: SCHEMA_INTEGRITY...");
    if (payload.manifestChanges) {
        const missingKeys = REQUIRED_MANIFEST_KEYS.filter(key => !(key in payload.manifestChanges));
        if (missingKeys.length > 0) {
            console.error(`   ❌ SCHEMA VIOLATION: Modified manifest is missing mandatory structural keys: [${missingKeys.join(', ')}]`);
            policyViolations++;
        }
    }

    // Processing Results
    console.log("\n--------------------------------------------------");
    if (policyViolations > 0) {
        console.error(`🚨 GUARDRAIL FAILURE: ${policyViolations} policy violation(s) found. Target branch ingestion BLOCKED.`);
        process.exit(1); // Fails the GitHub Actions build
    } else {
        console.log("✅ GUARDRAIL PASSED: State transitions verified as safe. Ready for target branch ingestion.");
        process.exit(0);
    }
}

runGuardrailChecks();
