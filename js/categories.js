//for this part i followed https://www.youtube.com/playlist?list=PLCx1FpZ4Dtb0Qapq6tHOGiAxPeAUGwwk8 "categories, v1"

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
}

function showBrand(brand) {
  console.log(brand.brandname);
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);
  console.log(clone);

  const aEl = clone.querySelector("a");
  aEl.textContent = brand.brandname;
  aEl.href = `productlist.html?brandname=${brand.brandname}`;
  console.log(aEl);

  const topParentEl = document.querySelector("#letter-a");
  console.log(topParentEl);
  const olEl = topParentEl.querySelector("ol");
  olEl.appendChild(clone);
  //   const sectionEl = document.querySelector(".letterlinks");
  //   sectionEl.appendChild(olEl);
}
