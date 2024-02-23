window.onload = function () {
  displayCartItems();
};

function displayCartItems() {
  var cartContainer = document.getElementById("cartItems");
  cartContainer.innerHTML = ""; // Efface le contenu précédent

  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  var table = document.createElement("table");
  table.classList.add("cartTable");

  var headerRow = table.insertRow();
  var headers = ["Nom", "Quantité", "Prix unitaire", "Total", "Actions"];
  headers.forEach(function (header) {
    var cell = headerRow.insertCell();
    cell.textContent = header;
  });

  cartItems.forEach(function (item, index) {
    var row = table.insertRow();
    var nameCell = row.insertCell();
    var quantityCell = row.insertCell();
    var priceCell = row.insertCell();
    var totalCell = row.insertCell();
    var actionCell = row.insertCell(); // Cellule pour les actions comme supprimer
    table.style.width = "90%"
    table.style.margin = "0 auto 0 auto"

    nameCell.textContent = item.name;
    quantityCell.textContent = item.quantity;
    priceCell.textContent = "$" + item.price;
    totalCell.textContent = "$" + item.price * item.quantity;

    
    [nameCell, quantityCell, priceCell, totalCell].forEach(function(cell) {
      cell.style.fontSize = "1.6em"; // Par exemple, pour une taille de police plus petite que celle des en-têtes
      cell.style.fontFamily = "Lato"
    });

    // Créer un bouton de suppression
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.style.backgroundColor = "#ff4d4d";
    deleteBtn.style.width = "auto";
    deleteBtn.style.height = "auto"
    deleteBtn.style.backgroundColor.onclick = "#FFFFFF"
    deleteBtn.style.margin = "0"
    deleteBtn.onclick = function() {
      removeFromCart(index);
    };
    actionCell.appendChild(deleteBtn);
  });

  cartContainer.appendChild(table);
}

function removeFromCart(index) {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.splice(index, 1); // Supprime l'élément à l'index spécifié
  localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Met à jour le stockage local
  displayCartItems(); // Rafraîchit l'affichage du panier
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
  var productPrice = priceMatch ; // Si le prix est trouvé, on l'extrait et le convertit en nombre flottant

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
