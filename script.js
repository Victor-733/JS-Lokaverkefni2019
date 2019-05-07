const main = document.getElementById("gallery");
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
            date = document.createElement('span');
        
        img.src = concert.imageSource;  // Add the source of the image to be the src of the img element
        p_name.textContent = concert.eventDateName;
        p_place.textContent = concert.eventHallName;
        date.innerHTML = concert.dateOfShow;
        
        div.appendChild(img);
        div.appendChild(p_name);
        div.appendChild(p_place);
        div.appendChild(date);
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
    const date_picker = document.getElementById("date-picker");

    flatpickr(date_picker, {
        locale: "is",
        mode: "range",
        altInput: true,
        altFormat: "D.d.m.Y",
        onChange(selectedDates){
            let startDate = selectedDates[0];
            let endDate = selectedDates[1];
            searchDate(startDate, endDate);
        }
    })

    function searchDate(start, end){
        let before = end.toLocaleString().split(",");
        let after = start.toLocaleString().split(",");
        all_concerts.forEach(function(concert) {
            if(){

            } else {
                
            }
        });
    }
})

.catch(function(error) {
    // This is where you run code if the server returns any errors
});