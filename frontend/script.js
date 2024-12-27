const scrolldivs = document.querySelectorAll('.scrolled');

function checkVisibility() {
    scrolldivs.forEach(div => {
        const rect = div.getBoundingClientRect();

        if (rect.top < window.innerHeight) {
            div.classList.add('visible');
          } else {
            div.classList.remove('visible');
          }
    })

    console.log(div.getBoundingClientRect)
};

window.addEventListener('scroll', checkVisibility);

checkVisibility();