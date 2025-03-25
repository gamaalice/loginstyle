const toggle = document.querySelector('.toggle'); 
const inputCheck = document.querySelector('.input-check'); 
const body = document.querySelector('body'); 
const h2 = document.querySelector('h2'); 
const inputLines = document.querySelectorAll('.input-line'); 
const inputs = document.querySelectorAll('.input-box input'); 
const icons = document.querySelectorAll('.icon ion-icon'); 
const button = document.querySelector('button'); 
const toggleTextOff = document.querySelector('.text.off'); 
const toggleTextOn = document.querySelector('.text.on'); 

// Listener para o checkbox 
inputCheck.addEventListener('change', () => {
    const isActive = inputCheck.checked; 

    // Estilo com base no estado
    if (isActive) {
        body.classList.add('active');
        h2.style.color = '#8b008b';
        h2.style.textShadow = '0 0 15px #8b008b, 0 0 30px #cc00cc';

        inputLines.forEach(line => {
            line.style.background = '#8b008b';
            line.style.boxShadow = '0 0 10px #8b008b';
        });

        inputs.forEach(input => {
            input.style.color = '#8b008b';
        });

        icons.forEach(icon => {
            icon.style.color = '#8b008b';
        });

        button.style.background = '#8b008b';
        button.style.boxShadow = '0 0 15px #8b008b, 0 0 15px #cc00cc';

        toggleTextOn.style.opacity = '1';
        toggleTextOff.style.opacity = '0';
    } else {
        body.classList.remove('active');
        h2.style.color = '#fff';
        h2.style.textShadow = '';

        inputLines.forEach(line => {
            line.style.background = '#fff';
            line.style.boxShadow = '';
        });

        inputs.forEach(input => {
            input.style.color = '#fff';
        });

        icons.forEach(icon => {
            icon.style.color = '#fff';
        });

        button.style.background = '#fff';
        button.style.boxShadow = '';

        toggleTextOn.style.opacity = '0';
        toggleTextOff.style.opacity = '1';
    }
});

// Listener para botão 
button.addEventListener('click', (e) => {
    e.preventDefault(); 
    inputs.forEach(input => {
        if (!input.value) {
            alert(`Por favor, preencha o campo: ${input.placeholder}`);
        }
    });
});