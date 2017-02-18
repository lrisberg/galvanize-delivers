$(document).ready(function() {
// ---DECLARATION--- //

  let menuItems = {
    'Crispy Quinoa Burger':
      [8.99, 'img/burgerresized.jpg'],
    'Arugula Pie':
      [11.99, 'img/pizza.jpg'],
    'BBQ Tofu Ribs':
      [14.99, 'img/TofuRibsresized.jpg'],
    'Nice Cream Bisquit':
      [7.99, 'img/nicecream.jpg']
  }

  let menuColumn = $('#menuColumn');

  // ---FUNCTIONS--- //

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


  function createMenuGrid(menuItemsObject, menuColumnElement) {
    let row = $('<div>').addClass('row');
    menuColumnElement.append(row);

    for (let foodName in menuItems) {
      let foodPrice = menuItemsObject[foodName][0];
      let foodImageURL = menuItemsObject[foodName][1];
      let card = createFoodCard(foodName, foodPrice, foodImageURL);

      row.append(card);
    }
  }

  createMenuGrid(menuItems, menuColumn);

  let tbody = $('#tbody');
  let table = $('#table');

  function createTableRow(tbodyElement, foodName, foodPrice) {
    let tr = $('<tr>');

    tbody.append(tr);
    let td = $('<td>');

    tr.append(td);
    td.text(foodName);
    td = $('<td>').addClass('right-align value');
    td.text(`\$${foodPrice}`);
    tr.append(td);
  }

  function calculateSubtotal(tableElement) {
    let values = $(tableElement).find('.value');
    let valuesArray = values.toArray();
    let total = 0;
    for (let value of valuesArray) {
      let price = $(value).text();
      price = parseFloat(price.substring(1));
      total += price;
    }

    return `\$${total.toFixed(2)}`;
  }

  function createTfoot(table) {
    let tfoot = $('<tfoot>').addClass("tfoot");
    table.append(tfoot);
  }

  function createSubTotal(tableElement, tfootElement) {
    let subTotalTr = $('<tr>');
    tfootElement.append(subTotalTr);
    subTotalTr.append($('<td>').text("Subtotal"));
    let subTotalAmount = '$0';
    let subTotalTd = $('<td>').addClass('subtotalamount').text(subTotalAmount);
    subTotalTr.append(subTotalTd);
  }

  createTfoot(table);
  createSubTotal(table, $('.tfoot'));

  function updateTax(tfootElement, taxAmount) {
    let taxTr = $('<tr>');
    tfootElement.append(taxTr);
    let taxTd = $('<td>').text("Tax");
    taxTr.append(taxTd);
    let taxAmountTd = $('<td>').text(taxAmount);
  }

  function updateTotal(tfootElement, subTotal, taxAmount, totalAmount) {
    let totalTr = $('<tr>');
    tfootElement.append(totalTr);
    let totalTd = $('<td>').text("Total");
    totalTr.append(totalTd);
    let totalAmountTd = $('<td>').text(totalAmount);
    totalTr.append(totalAmountTd);
  }



  // ---EVENTS---

  $(".order").click(function(event) {
    let target = event.target;
    if (target.className === "addtoorder") {
      let card = $(target).parents('.card');
      let foodName = card.data('foodName');
      let foodPrice = card.data('foodPrice');

      createTableRow(tbody, foodName, foodPrice);
      let subtotal = $(table).find('.subtotalamount');
      $(subtotal).text(calculateSubtotal(table));
    }
  })
});
