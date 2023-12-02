const form = document.querySelector(".reg-form");
const wrapper = document.querySelector(".wrapper-register");
const closeButton = document.querySelector(".ModalCloseBtn");
const signupCloseBtn = document.querySelector(".registerCloseBtn");
const navCTA = document.querySelector(".nav-cta");

wrapper.style.display = "none";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fullname = document.querySelector("[name=fullname].value");
  const email = document.querySelector("[name=email].value");
  const password = document.querySelector("[name=password].value");
  if (fullname !== "" && email !== "" && password !== "") {
    wrapper.classList.remove("active");
  }
});

navCTA.addEventListener("click", function () {
  wrapper.style.display = "block";
});

signupCloseBtn.addEventListener("click", () => {
  wrapper.style.display = "none";
});

closeButton.addEventListener("click", () => {
  wrapper.style.display = "none";
});
