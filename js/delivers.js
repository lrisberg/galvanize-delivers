$(document).ready(function() {
  let Materialize = window.Materialize;

  // ---INITIALIZATION--- //

  let menuItems = {
    'Crispy Quinoa Burger':
      [8.99, 'img/burgerresized.jpg'],
    'Arugula Pie':
      [11.99, 'img/pizza.jpg'],
    'BBQ Tofu Ribs':
      [14.99, 'img/TofuRibsresized.jpg'],
    'Nice Cream Biscuit':
      [7.99, 'img/nicecream.jpg']
  }

  let taxRate = 0.08;

  // ---FUNCTIONS--- //

  function toDollaDolla(number) {
    return `\$${number.toFixed(2)}`;
  }

  // create a single menu card
  function createFoodCard(name, price, imageURL) {
    let column = $('<div>').addClass('col s12 m6 l6');

    let cardElem = $('<div>').addClass('card')
      .data('foodName', name)
      .data('foodPrice', price);
    column.append(cardElem);

    let imageElem = $('<div>').addClass('card-image')
      .append($('<img>').attr('src', imageURL));
    cardElem.append(imageElem);

    let contentElem = $('<div>').addClass('card-content')
      .append($('<p>').text(name))
      .append($('<p>').text(toDollaDolla(price)));
    cardElem.append(contentElem);

    let actionElem = $('<div>').addClass('card-action')
      .append($('<a>').addClass("addtoorder").text("ADD TO ORDER"));
    cardElem.append(actionElem);

    return column[0];
  }

  function createMenuGrid() {
    let row = $('<div>').addClass('row');
    $('.menu').append(row);

    for (let foodName in menuItems) {
      let foodPrice = menuItems[foodName][0];
      let foodImageURL = menuItems[foodName][1];

      row.append(createFoodCard(foodName, foodPrice, foodImageURL));
    }
  }

  function createOrderItem(foodName, foodPrice) {
    let item = $('<tr>').addClass('order-item');
    $('.order-items').append(item);

    item.append($('<td>').text(foodName));

    let priceElem = $('<td>').addClass('right-align price')
      .text(toDollaDolla(foodPrice));
    item.append(priceElem);
  }

  function createTotalRow(rowName, rowClass) {
    let totalRow = $('<tr>')
      .append($('<td>').text(rowName))
      .append($('<td>').addClass(rowClass));
    $('.order-totals').append(totalRow);
  }

  function calculateSubtotal() {
    let pricesArray = $('.price').toArray();
    let subtotalAmount = 0;
    for (let price of pricesArray) {
      let priceAmount = parseFloat($(price).text().substring(1));
      subtotalAmount += priceAmount;
    }

    return subtotalAmount;
  }

  function calculateTax(subtotal) {
    return subtotal * taxRate;
  }

  function calculateTotal(subtotal, tax) {
    return subtotal + tax;
  }

  function updateDisplayTotals(subtotal, tax, total) {
    $('.subtotal-amount').text(toDollaDolla(subtotal));
    $('.tax-amount').text(toDollaDolla(tax));
    $('.total-amount').text(toDollaDolla(total));
  }

  // ---CREATION--- //

  createMenuGrid();

  createTotalRow('Subtotal', 'subtotal-amount');
  createTotalRow('Tax', 'tax-amount');
  createTotalRow('Total', 'total-amount');

  updateDisplayTotals(0, 0, 0);

  // ---EVENTS--- //

  $(".order").click(function(event) {
    let target = event.target;
    if (target.className === "addtoorder") {
      let card = $(target).parents('.card');
      let foodName = card.data('foodName');
      let foodPrice = card.data('foodPrice');

      createOrderItem(foodName, foodPrice);

      let subtotal = calculateSubtotal();
      let tax = calculateTax(subtotal);
      let total = calculateTotal(subtotal, tax);

      updateDisplayTotals(subtotal, tax, total);
    }
  })

  // click function for submit button
  $(".placeorder").click(function(event) {
    let target = event.target;
    let orderItems = $('.order-item');
    if (orderItems.length > 0 && $('#name').val() !== "" && $('#phone_number').val() !== "" && $('#address').val() !== "") {
      Materialize.toast('Success!', 4000);
    }
    else {
      Materialize.toast('Please complete order details', 4000);
    }
  })
});
