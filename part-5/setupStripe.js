const Stripe = window.Stripe;

export function setupStripe() {
  const productButtons = document.getElementsByClassName("product");
  const stripeSpinner = document.getElementById("stripeSpinner");
  const productsList = document.getElementById("products");
  const buyMeACoffeeButton = document.getElementById("buyMeACoffeeButton");
  const modal = document.getElementById("modal");

  buyMeACoffeeButton.addEventListener("click", () => {
    modal.classList.toggle("hidden");
  });

  modal.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      modal.classList.toggle("hidden");
    }
  });

  [...productButtons].forEach((productButton) => {
    productButton.addEventListener("click", (event) => {
      stripeSpinner.classList.remove("hidden");
      productsList.classList.add("hidden");

      const productCode = event.currentTarget.getAttribute("data-productCode");
      fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify({ productCode }),
      })
        .then((res) => res.json())
        .then((data) => {
          const stripe = Stripe(
            "pk_test_51LCPFoIqey7J2iTMMZzFjfKYxQBMOL7OsAnSXtfCdDCTi7z0t8KNPAqjARKXijx8A9qu7x13OOVNcOFoqtLtFhTg003e5inJkS"
          );
          stripe.redirectToCheckout(data);
        })
        .finally((err) => {
          productsList.classList.remove("hidden");
          stripeSpinner.classList.add("hidden");
        });
    });
  });
}
