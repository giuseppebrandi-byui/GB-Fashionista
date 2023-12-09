// Get the form element that opens the modal
const newsletterForm = document.querySelector(".newsletterForm");
// Get the modal
const modal = document.querySelector("#newsLetterModal");
// Get the button that opens the modal
const newsLetterBtn = document.querySelector(".newsletterBtn");
// Get the span element that closes the modal
const newsLetterCloseBtn = document.querySelector(".close");
// Get the p element with the thank you message
const newsletterMessage = document.querySelector(".newsletter-thanks");

// When the user clicks the button, open the modal
newsLetterBtn.onclick = function (e) {
  e.preventDefault();
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let emailFieldValue = document.querySelector("[name=email]").value;
  if (emailFieldValue !== "" && emailFieldValue.match(validRegex)) {
    newsletterMessage.textContent =
      "Thank you for subscribing to our newsletter";
    modal.style.display = "block";
  } else {
    newsletterMessage.textContent = "Please enter a valid email";
    modal.style.display = "block";
  }
};

// When the user clicks on <span> (x), close the modal
newsLetterCloseBtn.onclick = function () {
  modal.style.display = "none";
  newsletterForm.reset();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
