let controls = document.querySelector('.menu-item');
let menuOpen = document.querySelector('.open_btn');
let menuClose = document.querySelector('.close_btn');
let edit = document.querySelectorAll('.edit-btn');

function toggleMenu() {
    controls.addEventListener('click', () => {
        menuOpen.classList.toggle('hide');
        menuClose.classList.toggle('show');

        if (menuClose.classList.contains('show')) {
            for(let i = 0; i < edit.length; i++){
                edit[i].classList.remove('hide');
                edit[i].classList.add('show');
            }
        } else {
            for(let i = 0; i < edit.length; i++){
                edit[i].classList.remove('show');
                edit[i].classList.add('hide');
            }
        }
    });
}

toggleMenu();
