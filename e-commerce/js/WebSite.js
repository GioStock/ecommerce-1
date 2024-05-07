// -- se il programma non funziona controlla i link 
// fai partire il terminal per la connessione dal finto database

document.getElementById("btnShop").addEventListener("click", function() {
  window.open("https://www.youtube.com/watch?v=znI0ppwx4Yc", "_blank");
});

const URLphone = "https://dummyjson.com/products/category/smartphones";
const cardProdotto = document.querySelector("#cardProdotto");

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
          <div class="swiper-slide" id="cardPro${prodotto.id}">
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
        cardProdotto.innerHTML += card;
      });

      // Aggiungi event listener per "Aggiungi al carrello" su tutti i bottoni
      document.querySelectorAll(".aggiungi-carrello").forEach((btn) => {
        btn.addEventListener("click", function () {
          // Ottieni l'ID del prodotto dalla data attributo del bottone
          let prodottoId = this.getAttribute("data-id");
          // Esegui la logica per aggiungere il prodotto al carrello
          aggiungiProdottoAlCarrello(prodottoId);
        });
      });
      // whislist
      document.querySelectorAll('.AggiungiADesideri').forEach(iconaCuore => {
        iconaCuore.addEventListener('click', funzioneAggiungiADesideri);
      })
    });
}
// aggiungi al cuore
let toastElementInterno = document.querySelector('.toast');
 let toastElement = document.querySelector('.divToast');
 let perStampaToast = document.getElementById('perStampaToast');
 document.getElementById('perStampaToast');
function funzioneAggiungiADesideri (){
  console.log("oddioooo");
  console.log(toastElementInterno);
  perStampaToast.style.display = "block";

  // questa parte imposta la sparizione del "toast" dopo 3 secondi
  setTimeout(() => {
    perStampaToast.style.display = "none";
  }, 1000);
//parte per stampare la carta nel modal Lista dei Desideri
  let elCarta = event.target.closest('.swiper-slide');
  let modalBody = document.querySelector('#listaDesideriModal .modal-body');
  let cartaClonata = elCarta.cloneNode(true);
  modalBody.appendChild(cartaClonata);

  //nascondo l'icona del cuore dalla card stampata
  let iconaCuoreClonata = cartaClonata.querySelector('.AggiungiADesideri');
  iconaCuoreClonata.style.display = "none";

  
  
}


function aggiungiProdottoAlCarrello(prodottoId) {
  // Recupera il carrello dell'utente dal localStorage
  let utente = JSON.parse(localStorage.getItem("utente")) || { carrello: [] };
  // Aggiungi l'ID del prodotto al carrello dell'utente
  fetch("https://dummyjson.com/products/" + prodottoId)
    .then((response) => response.json())
    .then((prodotto) => {
      utente.carrello.push(prodotto);

      // Salva l'aggiornamento del carrello dell'utente nel localStorage
      localStorage.setItem("utente", JSON.stringify(utente));
      // Esegui eventuali altre operazioni, come aggiornare l'interfaccia utente
      console.log(prodotto);
      //richiama la funzione 
      // showCarrello();
    });
}

// Chiamata per ottenere e visualizzare i prodotti
telefoni(URLphone);

let utente = JSON.parse(localStorage.getItem("utente"));

let welcame = document.querySelector("#welcome");
let utenteBenvenuto = document.querySelector("#utenteBenvenuto");

let btnLogout = document.querySelector("#btnLogout");

const URLJSON = "http://localhost:3000/utenti";

btnLogout.addEventListener("click", function () {
  fetch(URLJSON, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      utente,
    }),
  });
  localStorage.removeItem(utente);
  localStorage.clear();
});

let loginProva = document.getElementById("loginProva");

function funzione() {
  console.log(localStorage.getItem("utente"));
  if (localStorage.getItem("utente") != null) {
    console.log("connesso");
    loginProva.style = "display:none";
    welcame.innerHTML = `<i class=""></i><span>  ${utente.username}! <br> Solo per Oggi!</span>`;
    utenteBenvenuto.innerHTML = `<i class=""></i><span> Benvenuto ${utente.username}!</span>`;
    // TODO con boIcon su class aggiungi icona
  } else {
    console.log("non connesso");
    btnLogout.style = "display:none";
    loginProva.style = "display:";

    // window.location.href = "http://127.0.0.1:5500/ecommerce/index.html";
  }
}
loginProva.addEventListener("click", function () {
  window.location.href = href="http://127.0.0.1:5500/index.html";
});

funzione();



let elencoCarrelloPieno = document.getElementById("elencoCarrelloPieno");

let checkout = document.getElementById("checkout");
checkout.addEventListener('click', showCarrello);


/* -------------------------------------------------------------------------- */
/*                                showCarrello                                */
/* -------------------------------------------------------------------------- */
function showCarrello() {
  elencoCarrelloPieno.innerHTML = "";
  let carrelloPieno = localStorage.getItem("utente", "carrello");
  let JsonCarrelloPieno = JSON.parse(carrelloPieno);
  console.log(JsonCarrelloPieno);

  JsonCarrelloPieno.carrello.forEach((prodotto) => {
    console.log(prodotto);
    let prodottoCard = `
    <div class="swiper-slide" id="cardCarrello${prodotto.id}">
    <div class="card">
    <img src="${prodotto.images[0]}" class="card-img-top" id="card-img" alt="${prodotto.title}">
    <div class="card-body">
    <h5 class="card-title" card-title="${prodotto.title}">${prodotto.title}</h5>
    <p class="card-text" id="card-text">${prodotto.description}</p>
    <p class="card-price btn btn-danger" id="card-price">${prodotto.price}€</p>
    <p><button class="rimuovi-prodotto btn btn-danger" car-id=${prodotto.id} >Rimuovi</button></p>
    </div>
    </div>
    </div>
    `;

    elencoCarrelloPieno.innerHTML += prodottoCard;
  });

  // Aggiungi un listener per "Rimuovi" su tutti i pulsanti

  let bottoni = document.querySelectorAll(`.rimuovi-prodotto`);
  bottoni.forEach(bottone => {
    bottone.addEventListener("click", function () {
      let prodottoId = this.getAttribute("car-id");
      rimuoviProdottoDalCarrelloStorage(prodottoId);
      showCarrello();
    });
  });
}

function rimuoviProdottoDalCarrelloStorage(prodottoId) {
  // Recupera il carrello dell'utente dall'localStorage
  let utente = JSON.parse(localStorage.getItem("utente")) || {
    carrello: [],
  };
  // Rimuovi il prodotto dal carrello dell'utente
  utente.carrello = utente.carrello.filter(c => c.id!= prodottoId);
  // Aggiorna il carrello dell'utente nell'localStorage
  localStorage.setItem("utente", JSON.stringify(utente));
}





// bottone - tasto invio ricerca
document.getElementById("searchForm").addEventListener("submit", function(event) {
  
  event.preventDefault();
  
  
  performSearch();
});

document.getElementById("searchButton").addEventListener("click", performSearch);

function performSearch() {
  
  let searchTerm = document.getElementById("searchInput").value;
  
  // encodeUri controlla se quello che hai scritto vada bene come termire di ricerca
  let wikipediaURL = "https://en.wikipedia.org/wiki/" + encodeURIComponent(searchTerm);
  
  
  window.open(wikipediaURL, "_blank");
}
// ho agiungo anche allinvio
document.getElementById("searchInput").addEventListener("keyup", function(event) {
  // invio e sulla tastiera il 13 e keycode vede cosai premuto
  if (event.keyCode === 13) {
      
      performSearch();
  }
});


const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  breakpoints: {
      576: {
          slidesPerView: 1, // Imposta 1 slide per dispositivi con larghezza inferiore a 576px
          spaceBetween: 10, // Imposta lo spazio tra le slide
      },
      768: {
          slidesPerView: 2,
          spaceBetween: 20,
      },
      992: {
          slidesPerView: 4,
          spaceBetween: 50,
      },
      1200: {
          slidesPerView: 4,
          spaceBetween: 50,
      },
  },
  pagination: {
      el: '.swiper-pagination',
      type: "fraction",
  },
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  scrollbar: {
      el: '.swiper-scrollbar',
  },
});