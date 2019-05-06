const main = document.getElementById("gallery");
let concerts;

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

        concert.element = div;
        return concert;
    });
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
})

.catch(function(error) {
    // This is where you run code if the server returns any errors
});