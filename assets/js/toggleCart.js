let togg1 = document.getElementById("toggleCart");
let d1 = document.getElementById("cart");
togg1.addEventListener("click", () => {
  if (getComputedStyle(d1).display == "none") {
    document.getElementById("cart").className =
      " col-sm-12 col-lg-4 animate__animated animate__slideInLeft  ";
    showCart();
  } else if (getComputedStyle(d1).display == "block") {
    document.getElementById("cart").className =
      " col-sm-12 col-lg-4 animate__animated animate__slideOutLeft  ";
    setTimeout(hideCart, 1000);
  }
});

function hideCart() {
  d1.style.display = "none";
}

function showCart() {
  d1.style.display = "block";
}
