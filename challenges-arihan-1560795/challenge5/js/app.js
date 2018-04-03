
(function() {
	"use strict";

    var API_KEY = 'FGXUlHhGHwOHIDiSNxX0mcVBXlElosq2sf19g51p';
    var datePicker;

	window.onload = function(){
        datePicker = document.getElementById('date-picker');
        setDatePickerDate();
        getURL();
		datePicker.onchange = getURL;        
    };
    
    function getURL(){
        toggleElements("none", "block", "none", true);

        var ajax = new XMLHttpRequest();
		ajax.onload = updatePage;
		ajax.open("GET", "https://api.nasa.gov/planetary/apod?api_key=" + API_KEY + "&date=" + datePicker.value, true);
		ajax.send();
    }

    function updatePage(){
        if (this.status != 200){
            toggleElements("none", "none", "block", false);
            document.getElementById("error").innerHTML="ERROR! " + this.status;
        } else {          
            toggleElements("block", "none", "none", false);
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            document.getElementById("title").innerHTML=json.title;
            document.getElementById("photo").setAttribute("src", json.url, "alt", title + "photo");
            document.getElementById("description").innerHTML=json.explanation;
        }
    }

    function setDatePickerDate(){
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        datePicker.value = year + '-' + month + '-' + date; 
        datePicker.setAttribute("max", datePicker.value);
    }

    function toggleElements(info, load, err, btn){
        document.getElementById("apod-info").style.display = info;
        document.getElementById("loading").style.display = load;
        document.getElementById("error").style.display = err;
        datePicker.disabled = btn;
    }

})();	