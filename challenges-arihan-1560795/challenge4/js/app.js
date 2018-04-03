(function() {
	"use strict";

    var index = 0;
    document.getElementsByClassName("dot")[0].style.opacity = '1';

    window.onload = function() {
        document.getElementById('left').onclick = decrease;
        document.getElementById('right').onclick = increase;
        document.onkeydown = checkKey;
    };

    function checkKey(e){
        e = e || window.event;
        if(e.keyCode == '37') decrease();
        if(e.keyCode == '39') increase();
    }

    function decrease(){
        index--;
        updateSlides();        
    }

    function increase(){
        index++;
        updateSlides();        
    }

    function updateSlides(){
        if(index == -1) index = 3;
        if(index == 4) index = 0;
        
        var dots = document.getElementsByClassName("dot");
        for (var i = 0; i < dots.length; i++) {
            dots[i].style.opacity = "0.6";
          }
        dots[index].style.opacity = '1';

        document.querySelector('.slides').style.left =  -1 * index * 100 + '%';        
    }
    

})();