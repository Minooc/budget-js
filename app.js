
// Initialize total Income and expense
var totalIncome = 0;
var totalExpense = 0;

// Initialize first screen
document.querySelector('.budget__income--value').innerHTML = '<p>+ 0.00</p>';
document.querySelector('.budget__expenses--value').innerHTML = '<p>- 0.00</p>';
document.querySelector('.budget__expenses--percentage').innerHTML = '<p>---</p>';
document.querySelector('.budget__value').innerHTML = '<p>+ 0.00</p>';
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
    if (addType == "inc") {
      aType = "income__list";
      totalIncome += parseFloat(addValue);
      totalIncome = +totalIncome.toFixed(2);
    }
    else {
      aType = "expenses__list";
      totalExpense += parseFloat(addValue);
      totalExpense = +totalExpense.toFixed(2);
    }

    // Update total income and expense
    var totalValue = totalIncome - totalExpense;
    var plusMinus = (totalValue >= 0) ? '+' : '';
    addValue = parseFloat(addValue);
    addValue = +addValue.toFixed(2);
    document.querySelector('.' + aType).insertAdjacentHTML('beforeend', '<p>' + addDes + '<em>' + addValue + '</em></p>');
    document.querySelector('.budget__income--value').innerHTML = '<p> +' + totalIncome + '</p>';
    document.querySelector('.budget__expenses--value').innerHTML = '<p> -' + totalExpense + '</p>';
    document.querySelector('.budget__value').innerHTML = '<p>' + plusMinus + totalValue + '</p>';

    if (totalExpense != 0)
      document.querySelector('.budget__expenses--percentage').innerHTML = '<p>' + Math.round((totalExpense / totalIncome) * 100) + '%</p>';
    else
      document.querySelector('.budget__expenses--percentage').innerHTML = '<p>---</p>';


    //clear field
    document.querySelector('.add__value').value = '';
    document.querySelector('.add__description').value = '';

  }

});

