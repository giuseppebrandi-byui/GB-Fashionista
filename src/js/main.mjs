export function showHeroImage() {
  const randNumber = getRndInteger(1, 6);
  const divImage = document.createElement("div");
  divImage.innerHTML = `<img
                        src="images/hero${randNumber}.jpg"
                        alt="Image displaying fashionable products"
                        class="hero-img"
                       />`;
  const heroArea = document.querySelector(".hero-img-box").append(divImage);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
