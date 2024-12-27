const button = document.getElementById('declencheur');
const resetBtn = document.querySelector ('#reset');

let insertNb = 0;
const number = document.getElementById('compteur');

let progressBar = document.querySelector('#progressBar');

let hundredOn = false;

button.addEventListener('click', function () {
    resetBtn.classList.remove('hidden');

    // Augmenter la valeur de la barre jusqu'à 100
    if (progressBar.value < 100) {

        progressBar.value += 20;
        hundredOn = false;

    }

    // Si la barre atteint 100, réinitialiser
    if (progressBar.value === 100 && hundredOn === false) {

        hundredOn = true;

        function decal() {
        insertNb++;
        number.innerText = insertNb;
        progressBar.value = 0;
        }

        setTimeout(decal, 300);
    }
});

resetBtn.addEventListener('click', function () {
    resetBtn.classList.add('hidden');

    insertNb = 0;
    number.innerText = insertNb;

    progressBar.value = 0;
})