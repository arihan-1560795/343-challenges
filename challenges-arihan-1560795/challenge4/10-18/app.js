var leftButton = document.getElementById('left');
var rightButton = document.getElementById('right');
var slides = document.querySelector('.slides');

var index = 0;

leftButton.addEventListener('click', function (e) {
    console.log(e);

    index--;

    updateSlidesPosition();
});

rightButton.addEventListener('click', function (e) {
    console.log(e);

    index++;

    updateSlidesPosition();
});

function updateSlidesPosition() {
    slides.style.left = -1 * index * 100 + '%';
}