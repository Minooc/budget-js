
// Initialize total Income and expense
var totalIncome = 0;
var totalExpense = 0;

// Constant used for distinct ID
var incomeConstant = 0;
var expenseConstant = 0;

// Store income and expense objects
var incomeList = [];
var expenseList = [];

// container object
var incomeContainer = function(id, value, description) {
  this.id = id;
  this.value = value;
  this.description = description;
}

var expenseContainer = function(id, value, description) {
  this.id = id;
  this.value = value;
  this.description = description;
}


// Initialize first screen
document.querySelector('.budget__income--value').innerHTML = '<p>+ 0.00</p>';
document.querySelector('.budget__expenses--value').innerHTML = '<p>- 0.00</p>';
document.querySelector('.budget__expenses--percentage').innerHTML = '<p>---</p>';
document.querySelector('.budget__value').innerHTML = '<p>+ 0.00</p>';
document.querySelector('.add__type').selectedIndex = 0;
document.querySelector('.add__value').value = '';
document.querySelector('.add__description').value = '';


// click button
document.querySelector('.add__btn').addEventListener('click', function() {

  // Add value and description
  var addType = document.querySelector('.add__type').value;
  var addValue = document.querySelector('.add__value').value;
  var addDes = document.querySelector('.add__description').value;
  var aType;

  // Check if the field is correct
  if ((parseInt(addValue) == addValue || parseFloat(addValue) == addValue) && addDes != '') {

    // Income or Expense
    if (addType == "income") {
      aType = "income__list";
      totalIncome += parseFloat(addValue);
      totalIncome = +totalIncome.toFixed(2);
    }
    else {
      aType = "expenses__list";
      totalExpense += parseFloat(addValue);
      totalExpense = +totalExpense.toFixed(2);
    }


    // Define ID
    var idName = '' + addType + '_';
    if (aType == "income__list") idName += incomeConstant;
    else idName += expenseConstant;

    // Create an object
    var obj;
    if (addType == "income") {
      obj = new incomeContainer(idName, addValue, addDes);
      incomeList.push(obj);
    }
    else {
      obj = new expenseContainer(idName, addValue, addDes);
      expenseList.push(obj);
    }




    // Add new income/expense to list
    // Todo: Design the container well

    addValue = parseFloat(addValue);
    addValue = +addValue.toFixed(2);

    var msg = '<div class = "' + idName + '">' +  addDes + '<em>' + addValue + '</em>';
    msg += '<button id = "' + idName + '_delete">' + 'delete</button></div>';

    document.querySelector('.' + aType).insertAdjacentHTML('beforeend', msg);



    // calculate budget
    calculateBudget();


    //clear field
    document.querySelector('.add__value').value = '';
    document.querySelector('.add__description').value = '';
    document.querySelector('.add__type').selectedIndex = 0;

    // increment constant
    if (aType == "income__list") incomeConstant++;
    else expenseConstant++;

  }

});


// Delete income object
document.querySelector('.income').addEventListener('click', function(e) {
  if (e.target.type == 'submit') {

    var parentClass = e.target.parentNode;
    var thisValue;
    for (var ind=0; ind < incomeList.length; ind++) {

      if (incomeList[ind].id == parentClass.className) {
        thisValue = incomeList[ind].value;
        incomeList.splice(ind, 1);
        break;
      }
    }
    totalIncome -= thisValue;
    parentClass.innerHTML = "";

    console.log(incomeList.length);
    calculateBudget();
  }
});


// Delete expense object
document.querySelector('.expenses').addEventListener('click', function(e) {
  if (e.target.type == 'submit') {
    var parentClass = e.target.parentNode;
    var thisValue;
    for (var ind=0; ind < expenseList.length; ind++) {

      if (expenseList[ind].id == parentClass.className) {
        thisValue = expenseList[ind].value;
        expenseList.splice(ind, 1);
        break;
      }
    }
    totalExpense -= thisValue;
    parentClass.innerHTML = "";

    calculateBudget();
  }
});


// Calculate Budget
var calculateBudget = function() {

      // Update total income and expense
      var totalValue = totalIncome - totalExpense;
      totalValue = +totalValue.toFixed(2);
      var plusMinus = (totalValue >= 0) ? '+' : '';


      // Update UI
      document.querySelector('.budget__income--value').innerHTML = '<p> +' + totalIncome + '</p>';
      document.querySelector('.budget__expenses--value').innerHTML = '<p> -' + totalExpense + '</p>';
      document.querySelector('.budget__value').innerHTML = '<p>' + plusMinus + totalValue + '</p>';

      if (totalExpense != 0)
        document.querySelector('.budget__expenses--percentage').innerHTML = '<p>' + Math.round((totalExpense / totalIncome) * 100) + '%</p>';
      else
        document.querySelector('.budget__expenses--percentage').innerHTML = '<p>---</p>';


}
