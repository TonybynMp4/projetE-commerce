function addToCart(productId) {
  var quantity = document.getElementById("quantity_" + productId).value;
  var productName = document.querySelector("#" + productId + " h3").innerText;
  var productPrice = document
    .querySelector("#" + productId + " .bottomproduct p")
    .innerText.split(" ")[1]; // Supposons que le prix soit formaté comme "Price: $X"

  var item = {
    name: productName,
    price: parseFloat(productPrice),
    quantity: parseInt(quantity),
  };

  // Récupérer les articles existants dans le panier depuis le stockage local
  var existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Ajouter le nouvel article au panier
  existingCartItems.push(item);

  console.log("jai ajouté");

  // Mettre à jour le panier dans le stockage local
  localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
}
