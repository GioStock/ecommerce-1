//todo da cambiare
const containerProdotti = document.querySelector("#containerProdotti");
const LAPTOPS =localStorage.getItem("laptops");
console.log(LAPTOPS);


// Crea un oggetto URLSearchParams dalla stringa della query
const params = new URLSearchParams(window.location.search);

// Ottieni il valore della variabile "categoria"
const categoria = params.get('nomeVariabile');

console.log(categoria); // Output: laptops
var URLphone = "https://dummyjson.com/products/category/"+categoria;

const laptop = document.getElementById("#")

function telefoni(telefono) {
    fetch(URLphone)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        const prodotti = response.products;
        console.log(prodotti);
        prodotti.forEach((prodotto) => {
          let card = `
          <div class="" id="cardPro${prodotto.id}">
          <div class="card">
              <img src="${prodotto.images[0]}" class="card-img-top" id="card-img" alt="${prodotto.title}">
              <div class="card-body">
                  <h5 class="card-title" card-title="${prodotto.title}">${prodotto.title}</h5>
                  <p class="card-text" id="card-text">${prodotto.description}</p>
                  <p class="card-price" id="card-price">${prodotto.price}€</p>
                  <button class="aggiungi-carrello btn  btn-dark btn-outline-light" data-id="${prodotto.id}">Aggiungi al carrello</button>
                  <a class="AggiungiADesideri" role="button">
                     <i class="bi bi-heart"></i>
                     </a>
              </div>
          </div>
      </div>
      `;
      containerProdotti.innerHTML +=card;
        });
    });
};

telefoni();

