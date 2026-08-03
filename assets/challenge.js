/* ── Coding Challenge Widget ── */

function createChallenge(containerId, prompt, solution) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const header = container.querySelector('.challenge');
  if (header) return;

  const template = `
    <div class="challenge">
      <div class="challenge-header">✏️ Code Challenge</div>
      <div class="challenge-prompt">${prompt}</div>
      <textarea class="challenge-editor" spellcheck="false" placeholder="// 在這裡寫你的解答..."></textarea>
      <div class="challenge-actions">
        <button class="challenge-btn challenge-btn-run" onclick="runChallenge(this)">▶ Run</button>
        <button class="challenge-btn challenge-btn-solution" onclick="showChallengeSolution(this)">Show Solution</button>
      </div>
      <div class="challenge-output"></div>
      <div class="challenge-solution">
        <strong>解答：</strong>
        <pre>${solution}</pre>
      </div>
    </div>
  `;

  container.innerHTML = template;
}

function runChallenge(btn) {
  const editor = btn.closest('.challenge').querySelector('.challenge-editor');
  const output = btn.closest('.challenge').querySelector('.challenge-output');
  const code = editor.value;

  output.classList.add('show');

  if (!code.trim()) {
    output.textContent = '// 請先寫一些程式碼';
    return;
  }

  // Capture console.log output
  const logs = [];
  const originalLog = console.log;
  console.log = (...args) => {
    logs.push(args.map(a =>
      typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
    ).join(' '));
  };

  try {
    const result = eval(code);
    if (result !== undefined) {
      logs.push('→ ' + (typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)));
    }
    output.textContent = logs.length > 0 ? logs.join('\n') : '// 程式執行完畢（無輸出）';
  } catch (e) {
    output.textContent = '❌ Error: ' + e.message;
  } finally {
    console.log = originalLog;
  }
}

function showChallengeSolution(btn) {
  const solution = btn.closest('.challenge').querySelector('.challenge-solution');
  solution.classList.toggle('show');
  btn.textContent = solution.classList.contains('show') ? 'Hide Solution' : 'Show Solution';
}
