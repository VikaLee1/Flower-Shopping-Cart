// step1 -extract data from json
let flowers = JSON.parse(data);
console.log(flowers);

//step2- currency formatter
const currencyFormater = new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
});

// step 3 - select the products row and add items dynamically 
let productsRow = document.querySelector(".products");

for (let flower of flowers) {
    productsRow.innerHTML +=
        `       
             <div class="card product col my-4" style="width: 300px;">
                  <img class="card-img-top mt-2 px-3" src="./images/${flower.image}" alt="${flower.bouquetteName}">
                  <div class="card-body px-3 py-0">
                      <h5 class="card-title">${flower.bouquetteName}</h5>
                      <p class="card-text h3 text-end">${currencyFormater.format(flower.price)}</p>
                      <p class="card-text text-end">${flower.description}</p>
                      <p class="card-text3 d-flex justify-content-end">
                      
                      <button class="btn w-75 product-button bg-secondary text-white">
                      <i class="fs-4 bi bi-cart-plus"></i> Add to cart</button></p>  

                  </div>  
    `;
}

// step4a - cart declared , an array into which we're parsing the info
const cart = [];

// step4b - we have cards and we want to activate ALL buttons
const addToCartBtn = document.querySelectorAll(".product-button");
// console.log(addToCartBtn);
// step 4c - now we create a forEach loop or any other loop. The first info in the loop is an iterater
addToCartBtn.forEach((btn, i) => {
    // we want an event to happen when we click on a button
    btn.addEventListener("click", () => {
        // we cannot call the function just by itself, we need to parse an argument
        // console.log(index) - shows an index of a clicked button you know where you're clicking
        //  and we need a function that will create a cart for us and we are parsing an index => we need to obtain th einfo from index, but we dont have the function
        addtoCart(flowers[i]);
    });
});

// step 4d- creating a function
const addtoCart = (flower) => {
    // it will be adding=pushing the info from the specific object to the cart, but the object is not yet connected 
    // cart.push(flower);
    // console.table(cart);
    // step4e - we neew to check if the product is already in shopping cart. The item is from the shopping cart! array and the product name is from array, the information
    if (cart.find((val) => val.bouquetteName == flower.bouquetteName)) {
        // if there is a match, then it is going to increase a quantity of a product in a shopping cart 
        // but it the product already exists in a shopping cart, then just push a product to the shopping card
        flower.qtty++;
        // console.log("product is already there") - for testing
    } else {
        cart.push(flower);
    }
    console.table(cart);
    // step 5b -we call the function each time we click on the button
    createRows();
    // step 6b - 23 have to call the total function each time
    cartTotal();
};

// The most IMPORTANT part of this project!
// step5 - constructing new cart with updated information
// we need to construct a new card with the information, a row. We need to create a variable, that would be a placeholder for our information that we are going to build

const createRows = () => {
    let result = "";
    for (let item of cart) {
        //step5 each time there is an iteration, it is going to receive an info
        result += `
            <div class="cart-row row gx-0">
            <div class="cart-item col-6 ps-md-5 my-2 d-flex align-items-center justify-content-start">
                <img class="cart-item-image" src="./images/${item.image}" width="100" height="100" alt="${item.bouquetteName}">
                <div class="cart-item-title h5 ms-2">${item.bouquetteName}</div>
            </div>
            <div class="cart-qtty-action col-2 d-flex justify-content-center align-items-center">
                <div class="d-flex">
                    <i class="plus fs-5 bi bi-plus-circle-fill"></i>
                </div>
                <div class="text-center m-0 cart-quantity h4 w-25">${item.qtty}</div>
                <div class="d-flex">
                    <i class="minus fs-5 bi bi-dash-circle-fill"></i>
                </div>
            </div>
            <div class="col-1 d-flex justify-content-start align-items-center">
                <i class="del fs-4 bi bi-trash3-fill text-danger"></i>
            </div>
            <div class="cart-price col-3 h5 my-auto text-end p-2 pe-sm-5">${currencyFormater.format(item.price)}</div>
        </div>
        `;
    }
    // step5 all info above will go to the class cart-items 
    document.querySelector(".cart-items").innerHTML = result;
    // step7 - create a new array within the row! as we want the event to continue
    const plusBtns = document.querySelectorAll(".plus");
    // the loop that will give an event , will manipulate the button
    plusBtns.forEach((btn, index) => {
        // we call a function that we create later
        btn.addEventListener("click", () => {
            plusQtty(index);
        });
    });

    const minusBtns = document.querySelectorAll(".minus");
    // the loop that will give an event , will manipulate the button
    minusBtns.forEach((btn, index) => {
        // we call a function that we create later
        btn.addEventListener("click", () => {
            minusQtty(index);
        });
    });

    const deleteItems = document.querySelectorAll(".del")
    deleteItems.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            deleteItem(index);
        });
    });
};


//step7b we create functions for buttons +,- and trash 
// to increase the quantity in the shopping cart
const plusQtty = (index) => {
    cart[index].qtty++;
    createRows();
    cartTotal();
};

// to decrease the quantity in the shopping cart
// to avoid the -item in the cart we create a loop
const minusQtty = (index) => {
    if (cart[index].qtty == 1) {
        cart.splice(index, 1);
    } else {
        cart[index].qtty--;
    }
    createRows();
    cartTotal();
};

const deleteItem = (index) => {
    cart[index].qtty = 1;
    cart.splice(index, 1);
    cartTotal();
    createRows();
};


// step6 - we create a total function too sum the total price
const cartTotal = () => {
    // each time we start it starts with 0
    let total = 0;
    for (let item of cart) {
        total += item.price * item.qtty;
    }

    document.querySelector("#price").innerHTML = currencyFormater.format(total);
    console.log(total);
};