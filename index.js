let searchbar = document.getElementById("search-bar");
let listviewbtn = document.getElementById("listview-btn");
let gridviewbtn = document.getElementById("gridview-btn");
let productlist = document.getElementById("product-list");
let pContainer = document.getElementById("pcontainer");

let productsInfo = [];

function createAndAppendSearchResult(product) {
  let {
    product_image,
    product_badge,
    product_title,
    product_variants,
  } = product;

  var prodctCardEl = document.createElement("div");
  prodctCardEl.classList.add("product-card");

  let imageContainer = document.createElement("div");
  imageContainer.classList.add("img-container");

  let productBadge = document.createElement("span");
  productBadge.classList.add("product-badge");
  productBadge.textContent = product_badge;
  imageContainer.appendChild(productBadge);

  let productImage = document.createElement("img");
  productImage.src = product_image;
  productImage.alt = product_title;
  productImage.classList.add("product-image");
  imageContainer.appendChild(productImage);

  prodctCardEl.appendChild(imageContainer);

  let productDataContainer = document.createElement("div");

  let productTitle = document.createElement("h3");
  productTitle.textContent = product_title.toUpperCase();
  productTitle.classList.add("product-name");
  productDataContainer.appendChild(productTitle);

  const productVariants = document.createElement("div");

  product_variants.forEach((variant) => {
    const variantItem = document.createElement("h6");
    for (const key in variant) {
      if (variant.hasOwnProperty(key)) {
        variantItem.textContent = ` ${variant[key]}`.toUpperCase();
      }
    }
    variantItem.classList.add("target-style");
    productDataContainer.appendChild(variantItem);
  });

  prodctCardEl.appendChild(productDataContainer);

  pContainer.appendChild(prodctCardEl);

  
  return productVariants;
}

function renderProduct(productsInfo) {
  for (let product of productsInfo) {
    createAndAppendSearchResult(product);
  }
}

function searchHandler(event) {
  let searchInput = searchbar.value;
  if (event.key === "Enter") {
    let query = searchInput.toUpperCase();
  }
}

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093"
    );
    const jsondata = await response.json();
    productsInfo = jsondata.data;
    renderProduct(productsInfo);
  } catch (err) {
    console.log(err);
    alert("Error While Fetching Data... Please Reload...");
  }
};

const switchToGridView = () => {
  pContainer.classList.remove("pccontainr");
  pContainer.classList.add("grid");
};

// Function to switch to list view
const switchToListView = () => {
  pContainer.classList.remove("pccontainr");
};

// gridviewbtn.addEventListener('click', switchToGridView);
listviewbtn.addEventListener("click", switchToListView);

fetchData();

// searchbar.addEventListener("keydown", searchHandler);
