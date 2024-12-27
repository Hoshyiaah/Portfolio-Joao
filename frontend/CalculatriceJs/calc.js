const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    const ecrit = document.querySelector('.ecrit');

    button.addEventListener('click', function() {
        const lastChar = ecrit.innerText.slice(-1);

        if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(button.innerText)) {
            return; 
        }

        else if (button.innerText === '=') {
            const rep = eval(ecrit.innerText);
            ecrit.innerText = rep;
        }

        else {
            ecrit.innerText += button.innerText;
        }
    })
});