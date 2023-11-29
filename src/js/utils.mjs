// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  document.location.reload();
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear && parentElement !== null) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);

  if (parentElement !== null) {
    parentElement.insertAdjacentHTML(position, htmlString.join(""));
  }
}

// get a parameter from URL when needed
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear && parentElement !== null) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  if (parentElement !== null) {
    parentElement.insertAdjacentHTML(position, htmlString);
  }
  if (callback) {
    callback(data);
  }
}

function displayCartIndicator() {
  let cart = getLocalStorage("so-cart");
  let cartCounter = 0;

  if (cart != null) {
    cart.forEach((item) => {
      cartCounter += item.productOnHold;
    });
  }

  if (cartCounter > 0) {
    document.querySelector(".items-indicator").textContent = cartCounter;
    document.querySelector(".items-indicator").style.display = "block";
  }
}

async function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export async function loadHeaderFooter() {
  const headerTemplateFn = await loadTemplate("/partials/header.html");
  const footerTemplateFn = await loadTemplate("/partials/footer.html");
  const headerEl = document.querySelector(".header");
  const footerEl = document.querySelector(".footer");
  await renderWithTemplate(headerTemplateFn, headerEl);
  await renderWithTemplate(footerTemplateFn, footerEl);
  displayCartIndicator();
}
