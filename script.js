const main = document.getElementById("gallery");

fetch("https://apis.is/concerts")
.then(function(results) {
    return results.json();
})
.then(function(results) {
    let concerts = [...results.results];
    console.log(concerts);

    return concerts.map(function(concert) { // Map through the results and for each run the code below
        let div = document.createElement('div'), //  Create the elements we need
            img = document.createElement('img'),
            span = document.createElement('span');
        
        img.src = concert.imageSource;  // Add the source of the image to be the src of the img element
        span.innerHTML = concert.eventDateName; // Make the HTML of our span to be the first and last name of our author
        
        div.appendChild(img);
        div.appendChild(span);
        main.appendChild(div);
    });
})
.catch(function(error) {
    // This is where you run code if the server returns any errors
});