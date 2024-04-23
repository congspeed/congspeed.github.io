// Initialize products array
let products = [];

// Add new product to the products array
function addNewProduct() {
  const newProduct = document.getElementById("newProduct").value.trim();
  if (newProduct !== "") {
    products.push({ name: newProduct, price: 0 });
    updateProductDropdowns();
    document.getElementById("newProduct").value = "";
  }
}

// Set price for an existing product
function setPrice() {
  const selectedProductIndex = document.getElementById("existingProduct").selectedIndex;
  const price = parseFloat(document.getElementById("price").value);
  if (isNaN(price)) {
    alert("Please enter a valid price.");
    return;
  }
  if (selectedProductIndex === -1) {
    alert("Please select a product.");
    return;
  }
  products[selectedProductIndex].price = price;
  document.getElementById("price").value = "";
  updateProductDropdowns(); // Update dropdowns after setting price
}

// Update dropdown menus with products
function updateProductDropdowns() {
  const existingProductDropdown = document.getElementById("existingProduct");
  const productsDropdown = document.getElementById("products");

  // Clear existing options
  existingProductDropdown.innerHTML = "";
  productsDropdown.innerHTML = "";

  // Add options for each product
  products.forEach((product, index) => {
    const option1 = new Option(product.name, index);
    const option2 = new Option(`${product.name} - $${product.price.toFixed(2)}`, index);
    existingProductDropdown.appendChild(option1);
    productsDropdown.appendChild(option2);
  });
}


// Initialize variables for checkout
let units = 0;

// Function to clear dynamic rows
function clearDynamicRows() {
  const receiptContainer = document.getElementById("receipt");
  receiptContainer.innerHTML = "";
}

// Start new transaction
function startNewTransaction() {
  units = 0;
  document.getElementById("unit").value = "";
  cart = []; // Clear the cart
  clearDynamicRows(); // Clear dynamic rows
  updateCart(); // Update cart display
}



// Set number of units
function setUnits(num) {
  units = num;
  document.getElementById("unit").value = units;
}

// Add selected product to cart
// Initialize cart array
let cart = [];

// Add selected product to cart
function addToCart() {
  const selectedProductName = document.getElementById("products").value;
  const selectedProduct = products[selectedProductName];
  
  if (selectedProduct) {
    cart.push({ name: selectedProduct.name, price: selectedProduct.price, units: units });
    updateCart();
  }
}

// Update cart display
function updateCart() {
  const cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = "";

  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.textContent = `${item.name} - Price: $${item.price.toFixed(2)}, Units: ${item.units}`;
    cartContainer.appendChild(cartItem);
  });
}

// Pay for products
function pay() {
  if (cart.length > 0) {
    displayReceipt();
  } else {
    alert("Your cart is empty. Please add products before paying.");
  }
}

// Display receipt with products in the cart
function displayReceipt() {
  // Get current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();

  // Create receipt table
  const receiptTable = document.createElement('table');
  receiptTable.innerHTML = `
    <thead>
      <tr>
        <th colspan="4">Receipt</th>
      </tr>
      <tr>
        <th colspan="4">${formattedDate}</th>
      </tr>
      <tr>
        <th>Product</th>
        <th>Price per unit</th>
        <th>Quantity</th>
        <th>Total price</th>
      </tr>
    </thead>
    <tbody>
  `;

  let subTotal = 0;

  // Iterate through items in the cart
  cart.forEach(item => {
    const totalPrice = item.price * item.units;
    subTotal += totalPrice;

    // Add row for current product
    const productRow = document.createElement('tr');
    productRow.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.units}</td>
      <td>$${totalPrice.toFixed(2)}</td>
    `;
    receiptTable.querySelector('tbody').appendChild(productRow);
  });

  // Calculate tax and grand total
  const tax = subTotal * 0.05;
  const grandTotal = subTotal + tax;

  // Add totals row
  const totalsRow = document.createElement('tfoot');
  totalsRow.innerHTML = `
    <tr>
      <td colspan="3">Subtotal:</td>
      <td>$${subTotal.toFixed(2)}</td>
    </tr>
    <tr>
      <td colspan="3">Tax (5%):</td>
      <td>$${tax.toFixed(2)}</td>
    </tr> 
    <tr>
      <td colspan="3">Grand Total:</td>
      <td>$${grandTotal.toFixed(2)}</td>
    </tr>
  `;

  // Close the table body
  receiptTable.innerHTML += `
    </tbody>
  `;

  // Display the receipt
  const receiptContainer = document.getElementById("receipt");
  receiptContainer.innerHTML = ''; // Clear any previous content
  receiptContainer.appendChild(receiptTable);
  receiptTable.appendChild(totalsRow);
}
