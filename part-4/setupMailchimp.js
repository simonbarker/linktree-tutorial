export function setupMailchimp() {
  const subscribeButton = document.getElementById("subscribeButton");
  const subscriberForm = document.getElementById("subscriberForm");
  const signupSuccess = document.getElementById("signupSuccess");
  const signupError = document.getElementById("signupError");
  const mailchimpError = document.getElementById("mailchimpError");

  subscriberForm.addEventListener("submit", (event) => {
    subscribeButton.innerHTML = "Subscribing...";
    subscribeButton.disabled = true;
    signupSuccess.classList.add("hidden");
    signupError.classList.add("hidden");

    const email = event.target.elements.email.value;
    const firstName = event.target.elements.first_name.value;

    fetch("/api/mailchimp", {
      method: "POST",
      body: JSON.stringify({ firstName, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "success") {
          signupSuccess.classList.remove("hidden");
          event.target.elements.email.value = "";
          event.target.elements.first_name.value = "";
        } else {
          signupError.classList.remove("hidden");
          mailchimpError.innerHTML = data.message;
        }
      })
      .finally(() => {
        subscribeButton.innerHTML = "Subscribe";
        subscribeButton.disabled = false;
      });

    event.preventDefault();
  });
}
