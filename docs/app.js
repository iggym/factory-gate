// docs/app.js
function runSimulation() {
    const terminal = document.getElementById('terminalScreen');
    const fileSelection = document.getElementById('fileSelection').value;
    const schemaSelection = document.getElementById('schemaSelection').value;

    // Reset Terminal screen
    terminal.innerHTML = `<span class="text-indigo-400">[Executing] Triggered via GitHub Actions Virtual Hook...</span><br>`;

    let violations = 0;
    
    setTimeout(() => {
        terminal.innerHTML += `<span>🏭 FactoryGate: Initiating structural policy verification...</span><br>`;
    }, 300);

    setTimeout(() => {
        terminal.innerHTML += `<span>🔍 Scanning PR #1042 submitted by AI Agent: <b>[ArchitectBot-v4]</b></span><br>`;
        terminal.innerHTML += `<span class="text-slate-400">--------------------------------------------------</span><br>`;
    }, 700);

    setTimeout(() => {
        terminal.innerHTML += `<span>📋 Evaluating Policy: <b>STRICT_PATH_ISOLATION</b>...</span><br>`;
        if (fileSelection === 'violatePath') {
            terminal.innerHTML += `<span class="text-red-500 font-bold">   ❌ CRITICAL VIOLATION: Agent attempted to modify a restricted structural path: "config/database.json"</span><br>`;
            violations++;
        } else {
            terminal.innerHTML += `<span class="text-emerald-400">   ✅ Clear: No modified path violations detected.</span><br>`;
        }
    }, 1200);

    setTimeout(() => {
        terminal.innerHTML += `<span class="mt-2 block">📋 Evaluating Policy: <b>SCHEMA_INTEGRITY</b>...</span><br>`;
        if (schemaSelection === 'invalid') {
            terminal.innerHTML += `<span class="text-red-500 font-bold">   ❌ SCHEMA VIOLATION: Modified system manifest JSON missing mandatory structural key: [stateFingerprint]</span><br>`;
            violations++;
        } else {
            terminal.innerHTML += `<span class="text-emerald-400">   ✅ Clear: Structural payload schema completely valid.</span><br>`;
        }
    }, 1800);

    setTimeout(() => {
        terminal.innerHTML += `<br><span class="text-slate-400">--------------------------------------------------</span><br>`;
        if (violations > 0) {
            terminal.innerHTML += `<span class="text-red-500 font-bold text-lg animate-pulse">🚨 GUARDRAIL FAILURE: ${violations} policy violation(s) found. Ingestion BLOCKED.</span><br>`;
        } else {
            terminal.innerHTML += `<span class="text-emerald-400 font-bold text-lg">✅ GUARDRAIL PASSED: Safe agent state confirmed. Ingestion ALLOWED.</span><br>`;
        }
        // Auto-scroll terminal to bottom
        terminal.scrollTop = terminal.scrollHeight;
    }, 2400);
}
