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
    let column = $('<div class="col s12 m6 l6">');

    let card = $('<div class="card">');

    column.append(card);

    let cardImage = $('<div class="card-image">');

    card.append(cardImage);

    let img = $(`<img src=${foodImageURL}>`);

    cardImage.append(img);

    let cardContent = $('<div class="card-content">');

    card.append(cardContent);

    let pLabel = $('<p>').addClass('foodname').text(foodName);

    cardContent.append(pLabel);

    let pPrice = $('<p>').addClass('foodprice').text(foodPrice);

    cardContent.append(pPrice);

    let cardAction = $('<div class="card-action">');

    card.append(cardAction);

    let orderButton = $('<a>').addClass("addtoorder").text("ADD TO ORDER");

    cardAction.append(orderButton);

    return column[0]
  }


  function createMenuGrid(menuItemsObject, menuColumnElement) {
    for (let foodName in menuItems) {
      let row = $('<row>');

      menuColumnElement.append(row);
      let foodPrice = menuItemsObject[foodName][0];
      let foodImageURL = menuItemsObject[foodName][1];
      let card = createFoodCard(foodName, foodPrice, foodImageURL);

      row.append(card);
    }
  }

  createMenuGrid(menuItems, menuColumn);

  let tbody = $('#tbody')

  function createTableRow(tbodyElement, foodName, foodPrice) {
    let tr = $('<tr>');

    tbody.append(tr);
    let td = $('<td>');

    tr.append(td);
    td.text(foodName);
    td = $('<td>');
    td.text(foodPrice);
    tr.append(td);
  }

  createTableRow(tbody, 'Crispy Quinoa Burgers', 8.99);
  createTableRow(tbody, 'Nice Cream', 7.99);

  // ---EVENTS---

  $(".order").click(function(event) {
    let target = event.target;
    if (target.className === "addtoorder") {
      console.log("You clicked an order button");

      let card = $(target).parents().parents();
      let cardContent = $(card).children(".card-content");
      let foodName = $(cardContent).children(".foodname").text();
      let foodPrice = $(cardContent).children(".foodprice").text();
      //let foodCost = foodPrice.text()
      //console.log(foodCost);
      //let foodPrice = $(target).parents();
      //console.log(foodPrice[0]);
      createTableRow(tbody, foodName, foodPrice);

      // add a row to the table with the foodname and price
      // update the totaling of the monies
    }
  })
});
