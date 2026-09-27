let searchInput = document.querySelector("#search");
let searchBtn = document.querySelector("#searchBtn");
let modal = document.querySelector(".modal");
let products = [];

async function getApis() {
  document.querySelector(".noProduct").classList.add("d-none");
  document.querySelector(".loading").classList.remove("d-none");
  document.querySelector(".containerDiv").style.height = "100vh";

  try {
    let response = await fetch("https://dummyjson.com/products");

    if (response.ok) {
      document.querySelector(".loading").classList.add("d-none");
      document.querySelector(".containerDiv").style.height = "100%";

      let data = await response.json();
      products = data.products;

      displayData(products);
    } else {
      throw new Error("Network error");
    }
  } catch (error) {
    console.error("Operation failed", error);
  }
}

getApis();

function displayData(rowData) {
  let data = "";

  rowData.forEach((item) => {
    data += `
          <div class="card rounded-5 px-3 pb-2">
            <img src="${item.thumbnail}" class="card-img-top" alt="${item.thumbnail}" />
            <div class="card-body">
              <h4 class='title fs-5'> ${item.title}:</4> 
              <p class="card-text fs-6 mt-2">
                ${item.description.split(" ").splice(0, 15).join(" ")} ...
              </p>
            </div>
            <div class="card-bottom fs-6 mb-3 ms-1 d-flex justify-content-around align-items-center">
               <div class='fs-5 fw-semi'>Price: ${item.price}$</div> 
               <div>Rating: ${item.rating} <i class="fa-solid fa-star star"></i></div>
            </div>
            <div class="view-div ms-2 mb-1">
                <button class="view-item" onclick="getSingleItem(${item.id})">View-item</button>
            </div>
        </div>
        `;
  });

  products = rowData;
  document.querySelector(".content").innerHTML = data;
}

searchBtn.addEventListener("click", (e) => search(searchInput.value));

function search(inputValue) {
  let searchResults = [];
  products.forEach((item) => {
    if (item.title.toLowerCase().includes(inputValue.toLowerCase())) {
      console.log(searchInput);
      searchResults.push(item);
    }
  });

  displayData(searchResults);
  console.log(searchInput.value);
  clearInput();
  document.querySelector(".containerDiv").style.height = "100vh";
}

function clearInput() {
  searchInput.value = "";
}



/*Make it possible to delete after entering input */

window.getSingleItem = getSingleItem;
async function getSingleItem(id) {
 
    try{

        let response= await fetch(`https://dummyjson.com/products/${id}`);
        let data= response.json();
        
        displaySingleData(data);
        console.log(data);
    }
    catch(error){
        console.error('Failed to fetch data:',error);
    }
}



function displaySingleData(product){
    console.log(product.title);

    modal.innerHTML=`
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">${product.title}</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <p>${product.description}</p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
    `
    
}