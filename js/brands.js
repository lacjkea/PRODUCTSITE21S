//for the second part I freestyled more - and compared it to Jonas v2 video.
//for the first part of this (earlier) I followed https://www.youtube.com/playlist?list=PLCx1FpZ4Dtb0Qapq6tHOGiAxPeAUGwwk8 "categories, v1"

//https://kea-alt-del.dk/t7/api/categories - ca. 6
//subcategories - alot
//seasons - 4
//brands - a lot

/*
fetch
loop
grab template
clone
append 
*/

//part2

const letters = "abcdefghijklmnopqrstuvwxyz";
const letterArray = letters.split("");
//console.log(letterArray);

letterArray.forEach((letter) => {
  //making a nav for the page one letter at a time
  const template = document.querySelector("template").content;
  const navItemClone = template.cloneNode(true);
  const aEl = navItemClone.querySelector("a");
  aEl.textContent = letter;
  aEl.href = `#letter-${letter}`;
  document.querySelector(".cat-nav ul").appendChild(navItemClone);

  //creates sections with id section-xx, h2 & ol
  const sectionEl = document.createElement("section");
  const h2El = document.createElement("h2");
  h2El.textContent = letter;
  sectionEl.appendChild(h2El);

  sectionEl.id = "letter-" + letter;
  const olEl = document.createElement("ol");

  sectionEl.appendChild(olEl);
  document.querySelector("main").appendChild(sectionEl);
});

fetch("https://kea-alt-del.dk/t7/api/brands")
  .then((response) => {
    if (!response.ok) {
      // throw Error(response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    //We have the data
    //console.log(data);
    handleData(data);
  })
  .catch((e) => {
    //Woops, something went wrong
    //console.error("An error occured:", e.message);
  });

function handleData(data) {
  //console.log(data);
  data.forEach(showBrand);
  console.log("hey");
}

function showBrand(brand) {
  //console.log(brand.brandname);
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);
  //console.log(clone);

  const aEl = clone.querySelector("a");
  aEl.textContent = brand.brandname;
  aEl.href = `productlist.html?brandname=${brand.brandname}`;
  //console.log(aEl);

  const firstLetter = brand.brandname.charAt(0).toLowerCase();
  //console.log(firstLetter);

  const topParentEl = document.querySelector(`#letter-${firstLetter}`);
  //console.log(topParentEl);
  const olEl = topParentEl.querySelector("ol");
  olEl.appendChild(clone);
  //   const sectionEl = document.querySelector(".letterlinks");
  //   sectionEl.appendChild(olEl);
}
