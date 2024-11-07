const display = document.getElementById('display');
        let currentInput = '';
        let isDegreeMode = true;

        function appendNumber(number) {
            currentInput += number;
            updateDisplay();
        }

        function appendOperator(operator) {
            currentInput += ` ${operator} `;
            updateDisplay();
        }

        function appendFunction(func) {
            currentInput += `${func}(`;
            updateDisplay();
        }

        function appendBrackets(bracket) {
            currentInput += bracket;
            updateDisplay();
        }

        function clearDisplay() {
            currentInput = '';
            updateDisplay();
        }

        function deleteLast() {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        }

        function calculate() {
            try {
                let expression = currentInput;
                if (isDegreeMode) {
                    expression = expression.replace(/sin\(([^)]+)\)/g, (match, p1) => `Math.sin(${p1} * Math.PI / 180)`);
                    expression = expression.replace(/cos\(([^)]+)\)/g, (match, p1) => `Math.cos(${p1} * Math.PI / 180)`);
                    expression = expression.replace(/tan\(([^)]+)\)/g, (match, p1) => `Math.tan(${p1} * Math.PI / 180)`);
                    expression = expression.replace(/asin\(([^)]+)\)/g, (match, p1) => `Math.asin(${p1}) * 180 / Math.PI`);
                    expression = expression.replace(/acos\(([^)]+)\)/g, (match, p1) => `Math.acos(${p1}) * 180 / Math.PI`);
                    expression = expression.replace(/atan\(([^)]+)\)/g, (match, p1) => `Math.atan(${p1}) * 180 / Math.PI`);
                }
                expression = expression.replace(/log\(([^)]+)\)/g, (match, p1) => `Math.log(${p1})`);
                expression = expression.replace(/sqrt\(([^)]+)\)/g, (match, p1) => `Math.sqrt(${p1})`);
                expression = expression.replace(/cbrt\(([^)]+)\)/g, (match, p1) => `Math.cbrt(${p1})`);
                expression = expression.replace(/exp\(([^)]+)\)/g, (match, p1) => `Math.exp(${p1})`);
                expression = expression.replace(/π/g, 'Math.PI');
                currentInput = eval(expression).toString();
            } catch (error) {
                currentInput = 'Error';
            }
            updateDisplay();
        }

        function updateDisplay() {
            display.textContent = currentInput || '0';
        }

        function toggleMode() {
            isDegreeMode = !isDegreeMode;
            alert(`Mode switched to ${isDegreeMode ? 'Degree' : 'Radian'}`);
        }