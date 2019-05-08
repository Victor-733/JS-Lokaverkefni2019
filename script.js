const main = document.getElementById("gallery");
const datePicker = document.getElementById("datePicker");
let concerts;
let all_concerts = [];

fetch("https://apis.is/concerts")
.then(function(results) {
    return results.json();
})
.then(function(results) {
    concerts = [...results.results];
    console.log(concerts);

    concerts = concerts.map(function(concert) { // Map through the results and for each run the code below
        let div = document.createElement('div'), //  Create the elements we need
            img = document.createElement('img'),
            p_name = document.createElement('p'),
            p_place = document.createElement('p'),
            p_date = document.createElement('p');
        
        img.src = concert.imageSource;  // Add the source of the image to be the src of the img element
        p_name.textContent = concert.eventDateName;
        p_place.textContent = concert.eventHallName;

        // set the date
        let date = concert.dateOfShow;
        let dateArray = date.split("T");
        let splittedDateArray = dateArray[0].split("-");
        let splittedClock = dateArray[1].split(":");
        div.dataset.date = dateArray[0];
        p_date.innerHTML = icelandicDate(splittedDateArray[0], splittedDateArray[1], splittedDateArray[2]) + " KL: " + displayClock(splittedClock[0], splittedClock[1]);

        // fall sem að breytir yfir í Íslenskt format :)
        function icelandicDate(year, month, day){
            return day + "." + month + "." + year;
        }

        function displayClock(hours, minutes){
            return hours + ":" + minutes;
        }

        
        div.appendChild(img);
        div.appendChild(p_name);
        div.appendChild(p_place);
        div.appendChild(p_date);
        main.appendChild(div);
        all_concerts.push(div);

        concert.element = div;
        return concert;
    });

    // search barinn
    const submit = document.getElementById("search");
    const input_box = document.getElementById("search-bar");
    submit.addEventListener("submit", doSearch);
    // when the search button is pressed
    function doSearch(e){
        e.preventDefault();
        console.log("hello");
        concerts.forEach(function(concert) {
            console.log(input_box);
            if (concert.eventDateName.includes(input_box.value)) {
                concert.element.removeAttribute("hidden");
            } else {
                concert.element.setAttribute("hidden", "");
            }
        });
    }

    //date pickerinn
    flatpickr(datePicker, {
        locale: "is",
        mode: "range",
        altInput: true,
        altFormat: "d.m.Y",
        onChange(selectedDates){
            let startDate = selectedDates[0];
            let endDate = selectedDates[1];
            searchDate(startDate, endDate);
        }
    })

    // function sem að breytir formatinu á dagsetningunni í rétt
    function changeDateFormat(date){
        let splitted = date.split("/");
        if(splitted[1].length < 2 && splitted[2].length < 2){
            return splitted[0] + "-0" + splitted[1] + "-0" + splitted[2]; 
        }
        else if(splitted[1].length < 2){
            return splitted[0] + "-0" + splitted[1] + "-" + splitted[2]; 
        }
        else if(splitted[2].length < 2){
            return splitted[0] + "-" + splitted[1] + "-0" + splitted[2]; 
        }
        else{
            return splitted[0] + "-" + splitted[1] + "-" + splitted[2]; 
        }
    }

    // fall sem að tékkar hvort að dagsetningin passar við dagsetninguna á tónleikunum
    function searchDate(start, end){
        let after = (start.getFullYear() + "/" + (start.getMonth() + 1) + "/" + start.getDate())
        let before = (end.getFullYear() + "/"+ (end.getMonth() + 1) + "/" + end.getDate())
        console.log(changeDateFormat(before));
        all_concerts.forEach(function(concert) {
            if(concert.dataset.date >= changeDateFormat(after) && concert.dataset.date <= changeDateFormat(before)){
                concert.removeAttribute("hidden");
            } else {
                concert.setAttribute("hidden", "");
            }
        });
    }
}) 

.catch(function(error) {
    // This is where you run code if the server returns any errors
    console.log(error)
});