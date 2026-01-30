const APILINK = 'https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&api_key=live_E9VADUvj1QPz05NGTsXD7bBiZsN4LoBZrSGh0B9tDUsVPfzKnHYHCER0E949TQJF&page=1';
const BREEDS_API = "https://api.thecatapi.com/v1/breeds";
const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query');

let breedsList = [];

fetch(BREEDS_API)
  .then(res => res.json())
  .then(data => {
    breedsList = data;
  });

returnCats(APILINK);

function returnCats(url) {
    fetch(url).then(res => res.json())
    .then(function(data) {
        data.forEach(element => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');

            const div_row = document.createElement('div');
            div_row.setAttribute('class', 'row');

            const div_column = document.createElement('div');
            div_column.setAttribute('class', 'column');

            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.src = element.url;

            const title = document.createElement('h3');
            
            if (element.breeds && element.breeds.length > 0) {
                title.innerHTML = element.breeds[0].name;
            } else {
                title.innerHTML = "Unknown Breed";
            }

            div_card.appendChild(image);
            div_card.appendChild(title);
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);

            main.appendChild(div_row);
        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const searchItem = search.value.toLowerCase();
    const breed = breedsList.find(b => b.name.toLowerCase() === searchItem);

    if (breed) {
        returnCats(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}&limit=10&api_key=live_E9VADUvj1QPz05NGTsXD7bBiZsN4LoBZrSGh0B9tDUsVPfzKnHYHCER0E949TQJF`);
        search.value = '';
    } else {
        alert("Breed not found! Try exact breed name.");
    }
});