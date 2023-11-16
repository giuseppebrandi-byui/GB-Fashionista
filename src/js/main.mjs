export function showHeroImage() {
  const randNumber = getRndInteger(1, 5);
  const image = document.createElement("div");
  image.innerHTML = ` <img
                        src="images/hero${randNumber}.jpg"
                        alt="Image displaying fashionable products"
                        class="hero-img"
                      />`;
  const heroArea = document.querySelector(".hero-img-box").append(image);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
