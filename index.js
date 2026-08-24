document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById('terminal-input');
    const historyDiv = document.getElementById('terminal-history');
    const outputDiv = document.getElementById('terminal-output');

    const commands = {
        help: function() {
            return `Available commands:
  help      - Displays this list of commands
  about     - Information about the HAT-CODE project
  nato      - Displays the NATO graphic
  clear     - Clears the terminal screen
  ls        - Lists files in the directory
  sudo      - Attempts to escalate privileges`;
        },
        about: function() {
            return `HAT-CODE Presents:
The 'NATO' project is a visualization within a terminal environment.
Built using pure HTML, CSS, and JS. A minimalist approach.
Just black, white, and code.`;
        },
        nato: function() {
            return `None.`;
        },
        ls: function() {
            return `index.html   index.css   index.js   README.md   .gitignore`;
        },
        clear: function() {
            historyDiv.innerHTML = '';
            return null;
        },
        sudo: function() {
            return `User root is not in the sudoers file. This incident will be reported.`;
        }
    };
    function addOutput(text, className = '') {
        if (text === null) return;
        const p = document.createElement('div');
        p.className = `output-text ${className}`;
        p.textContent = text;
        historyDiv.appendChild(p);
        outputDiv.scrollTop = outputDiv.scrollHeight;
    }
    function executeCommand(cmd) {
        const commandLine = document.createElement('div');
        commandLine.className = 'output-text';
        commandLine.innerHTML = `<span class="prompt">root@hat-code:~#</span> ${cmd}`;
        historyDiv.appendChild(commandLine);
        const trimmedCmd = cmd.trim().toLowerCase();
        if (trimmedCmd === '') {
        } else if (commands[trimmedCmd]) {
            const result = commands[trimmedCmd]();
            if (result) addOutput(result);
        } else {
            addOutput(`bash: ${trimmedCmd}: command not found`, 'error');
        }
        outputDiv.scrollTop = outputDiv.scrollHeight;
    }
    inputField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = inputField.value;
            executeCommand(command);
            inputField.value = '';
        }
    });
    document.addEventListener('click', function(e) {
        if (window.getSelection().toString() === '') {
             inputField.focus();
        }
    });
    setTimeout(() => {
        addOutput("Type 'help' and press Enter to view available commands.", 'success');
        outputDiv.scrollTop = outputDiv.scrollHeight;
    }, 1000);
});