const searchButton = document.getElementById('searchButton');
const clearButton = document.getElementById('clearButton');
const searchInput = document.getElementById('travelSearch');
const recommendationDiv = document.getElementById('recommendationContent');
let recommendations = [];

clearButton.addEventListener('click', () => {
    searchInput.value = '';
})

searchButton.addEventListener('click', () => {

    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {

        recommendations = [];
        recommendationDiv.classList.remove('recommendationContainer');
        recommendationDiv.classList.add('recommendationContainer');
        recommendationDiv.innerHTML = "<h1 class='title'>Your Results</h1>";
        
        if(searchInput.value.toLowerCase().includes('beach')) {
            data.beaches.forEach( beach => {
                recommendations.push(beach);
            })
        } else if (searchInput.value.toLowerCase().includes('temple')) {
            data.temples.forEach( temple => {
                recommendations.push(temple);
            })
        } else if (searchInput.value.toLowerCase().includes('country')) {
            data.countries.forEach( country => {
                country?.cities.forEach( city => {
                    recommendations.push(city);
                })
            })
        } else {
            const notFound = "<p class='not-found'> No Data Is Found.</p>";

            recommendationDiv.innerHTML += notFound;
        }

        recommendations.forEach((a)=> {
            const child = `<div class="recommendation"><img src="${a.imageUrl}" class="image" /><h2 class="title">${a.name}</h2><h6 class="description">${a.description}</h6></div>`
            recommendationDiv.innerHTML += child;
        });

        recommendationDiv.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
    .catch(e=>console.log(e))
})