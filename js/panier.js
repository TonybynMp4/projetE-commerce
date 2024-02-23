window.onload = function () {
  displayCartItems();
};

function displayCartItems() {
  var cartContainer = document.getElementById("cartItems");

  // Efface d'abord le contenu précédent du panier
  cartContainer.innerHTML = "";

  // Récupérer les articles du panier depuis le stockage local
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Créer le tableau pour afficher les articles
  var table = document.createElement("table");
  table.classList.add("cartTable");

  // Créer l'en-tête du tableau
  var headerRow = table.insertRow();
  var headers = ["Nom", "Quantité", "Prix unitaire", "Total"];
  headers.forEach(function (header) {
    var cell = headerRow.insertCell();
    cell.textContent = header;
  });

  // Parcourir chaque article dans le panier et les ajouter au tableau
  cartItems.forEach(function (item, index) {
    var row = table.insertRow();
    var nameCell = row.insertCell();
    var quantityCell = row.insertCell();
    var priceCell = row.insertCell();
    var totalCell = row.insertCell();

    nameCell.textContent = item.name;
    quantityCell.textContent = item.quantity;
    priceCell.textContent = "$" + item.price;
    totalCell.textContent = "$" + item.price * item.quantity;
  });

  // Ajouter le tableau au conteneur du panier
  cartContainer.appendChild(table);
}

function checkout() {
  // Logique de paiement
  console.log("Paiement effectué avec succès !");
}

function addToCart(productId) {
  var quantity = document.getElementById("quantity_" + productId).value;
  var productName = document.querySelector(
    "#product" + productId + " h3"
  ).innerText;
  var productPriceText = document.querySelector(
    "#product" + productId + " .bottomproduct p"
  ).innerText;
  var priceMatch = productPriceText.match(/\$\d+(\.\d+)?/); // Recherche du prix dans le format "$X.XX"
  var productPrice = priceMatch ? parseFloat(priceMatch[0].substring(1)) : 0; // Si le prix est trouvé, on l'extrait et le convertit en nombre flottant

  var item = {
    name: productName,
    price: productPrice,
    quantity: parseInt(quantity),
  };

  // Récupérer les articles existants dans le panier depuis le stockage local
  var existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Ajouter le nouvel article au panier
  existingCartItems.push(item);

  // Mettre à jour le panier dans le stockage local
  localStorage.setItem("cartItems", JSON.stringify(existingCartItems));

  // Actualiser l'affichage du panier
  displayCartItems();
}
