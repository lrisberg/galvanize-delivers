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

  let menuColumn = $('#menuColumn');
  let tbody = $('#tbody');
  let table = $('#table');
  let taxRate = 0.08;

  // ---FUNCTIONS--- //

  function toDollaDolla(number) {
    return `\$${number.toFixed(2)}`;
  }

  // create a single menu card
  function createFoodCard(foodName, foodPrice, foodImageURL) {
    let column = $('<div>').addClass('col s12 m6 l6');

    let card = $('<div>').addClass('card').data('foodName', foodName).data('foodPrice', foodPrice);
    column.append(card);

    let cardImage = $('<div>').addClass('card-image');
    card.append(cardImage);

    cardImage.append($(`<img src=${foodImageURL}>`));
    let cardContent = $('<div>').addClass('card-content');
    card.append(cardContent);

    cardContent.append($('<p>').addClass('foodname').text(foodName));
    cardContent.append($('<p>').addClass('foodprice').text(`\$${foodPrice}`));

    let cardAction = $('<div class="card-action">');
    card.append(cardAction);
    cardAction.append($('<a>').addClass("addtoorder").text("ADD TO ORDER"));

    return column[0];
  }

  function createMenuGrid() {
    let row = $('<div>').addClass('row');
    menuColumn.append(row);

    for (let foodName in menuItems) {
      let foodPrice = menuItems[foodName][0];
      let foodImageURL = menuItems[foodName][1];
      let card = createFoodCard(foodName, foodPrice, foodImageURL);

      row.append(card);
    }
  }

  function createOrderItem(foodName, foodPrice) {
    let tr = $('<tr>');

    tbody.append(tr);
    let td = $('<td>');

    tr.append(td);
    td.text(foodName);
    td = $('<td>').addClass('right-align value');
    td.text(`\$${foodPrice}`);
    tr.append(td);
  }

  function createTotalRow(rowName, rowClass) {
    let tr = $('<tr>')
      .append($('<td>').text(rowName))
      .append($('<td>').addClass(rowClass));
    $('.tfoot').append(tr);
  }

  function calculateSubtotal() {
    let values = $(table).find('.value');
    let valuesArray = values.toArray();
    let subtotalAmount = 0;
    for (let value of valuesArray) {
      let price = $(value).text();
      price = parseFloat(price.substring(1));
      subtotalAmount += price;
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
    $(table).find('.subtotalamount').text(toDollaDolla(subtotal));
    $(table).find('.taxamount').text(toDollaDolla(tax));
    $(table).find('.totalamount').text(toDollaDolla(total));
  }

  // ---CREATION--- //

  createMenuGrid();

  createTotalRow('Subtotal', 'subtotalamount');
  createTotalRow('Tax', 'taxamount');
  createTotalRow('Total', 'totalamount');

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
    console.log("You clicked the submit button")

    let tds = $(tbody).find('td');
    console.log(tds.length);
    if (tds.length > 0 && $('#name').val() !== "" && $('#phone_number').val() !== "" && $('#address').val() !== "") {
      Materialize.toast('Success!', 4000);
    }
    else {
      Materialize.toast('Please complete order details', 4000);
    }
  })
});
