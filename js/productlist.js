console.log("productlist.js");

const urlParams = new URLSearchParams(window.location.search);
const brandnameParam = urlParams.get("brandname");
const productsUrl =
  "https://kea-alt-del.dk/t7/api/products?brandname=" +
  brandnameParam +
  "&limit=100";

document.querySelector(".brandname").textContent = brandnameParam;

//!!!categories for nav!!!
fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    //We have the data
    //console.log(data);
    handleCategoryFilter(data);
  })
  .catch((e) => {
    //Woops, something went wrong
    console.error("An error occured:", e.message);
  });

fetch(productsUrl)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    //We have the data
    //console.log(data);
    handleProductList(data);
  })
  .catch((e) => {
    //Woops, something went wrong
    console.error("An error occured:", e.message);
  });

function handleCategoryFilter(categories) {
  console.log(categories);

  categories.forEach((category) => {
    const categoryTemplate = document.querySelector("#categories template")
      .content;
    const clone = categoryTemplate.cloneNode(true);

    const catName = category.category.toLowerCase();
    // console.log(catName);
    const cloneInputEl = clone.querySelector("input");
    cloneInputEl.name = catName;
    cloneInputEl.id = catName;
    const cloneLabelEl = clone.querySelector("label");
    cloneLabelEl.setAttribute("for", catName);
    cloneLabelEl.textContent = catName;

    const categoryEl = document.querySelector("#categories");
    categoryEl.appendChild(clone);
  });
}

function handleProductList(products) {
  //sp: singleproduct
  console.table(products);
  products.forEach((sp) => {
    //const sp = product; //sp: singleproduct
    console.log(sp);
    //debugger;
    const mainEl = document.querySelector("main");
    const template = document.querySelector("#main-template").content;
    const clone = template.cloneNode(true);

    const aEl = clone.querySelector("a");
    aEl.href = `product.html?id=${sp.id}`;

    const displayName = sp.productdisplayname;
    clone.querySelector("h2").textContent = displayName;

    const imagePath = `https://kea-alt-del.dk/t7/images/webp/640/${sp.id}.webp`;
    const imgEl = clone.querySelector("img");
    imgEl.src = imagePath;
    imgEl.alt = displayName;

    let price = sp.price;

    if (sp.soldout) {
      const articleEl = clone.querySelector("article");
      articleEl.classList.add("sold-out");
      articleEl.parentElement.classList.add("no-pointer-events");
    }

    if (sp.discount) {
      const priceBoxEl = clone.querySelector(".price-box");
      priceBoxEl.classList.add("onsale");

      priceBoxEl.querySelector(".price-old").textContent = price;

      const priceDiscountEl = priceBoxEl.querySelector(".price-discount span");
      priceDiscountEl.textContent = sp.discount;

      price = price - price * (sp.discount / 100);
      price = Math.round(price);
    }
    const priceEl = clone.querySelector(".price span");
    priceEl.textContent = price;
    mainEl.appendChild(clone);
  });
}

//https://kea-alt-del.dk/t7/images/webp/640/2801.webp
