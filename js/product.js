//console.log("hello");
//const id = 2801; //product ID
const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get("id");

const url = "https://kea-alt-del.dk/t7/api/products/" + idParam; //2801
//1. fetch Data

fetch(url)
  .then((res) => res.json())
  .then((data) => showProduct(data));

//2. populate the page
function showProduct(product) {
  console.table(product);

  aEl = document.querySelector("#main-nav ul li:nth-child(3) a");
  aEl.textContent = product.brandname;
  aEl.href = `productlist.html?brandname=${product.brandname}`;

  const displayName = product.productdisplayname;

  document.querySelector("main h2").textContent = displayName;
  document.querySelector(
    "#main-nav ul li:nth-child(4)"
  ).textContent = displayName;

  //const imagePath = `https://kea-alt-del.dk/t7/images/webp/640/${id}.webp`;
  const imagePath = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  const imgEl = document.querySelector(".center img");
  imgEl.src = imagePath;
  imgEl.alt = displayName;

  document
    .querySelector("button:first-of-type")
    .insertAdjacentHTML("afterend", product.description);
}
