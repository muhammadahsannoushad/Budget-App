console.log("hello");
var budget_btn = document.getElementById("total-amount-button");
var budget = document.getElementById("total-amount");
var t_budget = document.getElementById("amount");
var product_btn = document.getElementById("check-amount");
var title = document.getElementById("product-title");
var cost = document.getElementById("user-amount");
var expense_list = document.getElementById("expense-list");
var expense = document.getElementById("expenditure-value");
var balance = document.getElementById("balance-amount");
// store budget in local storage
budget_btn.onclick = function () {
  // alert("budget.value");
  if (budget.value != "") {
    localStorage.setItem("budget", budget.value);
    location.href = location.href;
  } else {
    alert("budget is empty");
  }
};
// store product in local storage

product_btn.onclick = function () {
  //  alert(cost.value);
  if (title.value != "" && cost.value != "") {
    var p_title = title.value;
    var p_cost = cost.value;
    var data = {
      p_cost: p_cost,
      p_title: p_title,
    };
    var string = JSON.stringify(data);
    localStorage.setItem("budget_" + title.value, string);
    location.href = location.href;

    // alert("success");
  } else {
    alert("please fill this Field ");
  }
};

// retrive data local storage
function all_data() {
  // alert(t_budget.innerHTML);
  var i;
  for (i = 0; i < localStorage.length; i++) {
    var all_keys = localStorage.key(i);
    if (all_keys.match("budget_")) {
      var json_data = localStorage.getItem(all_keys);
      var json_parse = JSON.parse(json_data);
      // alert(json_parse.p_cost);
      expense_list.innerHTML +=
        '<div class="list"><div class="list-style"><h3>' +
        json_parse.p_title +
        '</h3><h3 class="price">' +
        json_parse.p_cost +
        '</h3><div class="icon"><i class="fa fa-pen-to-square edit-btn"></i>&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-trash-can delete-btn"></i></div></div>';
    }
  }
  var price_tag = document.getElementsByClassName("price");
  var price = [];
  for (i = 0; i < price_tag.length; i++) {
    price[i] = price_tag[i].innerHTML;
  }
  var price_int = [];
  for (i = 0; i < price.length; i++) {
    price_int.push(parseInt(price[i]));
  }
  var final_price = 0;
  for (i = 0; i < price_int.length; i++) {
    final_price += price_int[i];
  }
  expense.innerHTML = final_price;

  t_budget.innerHTML = localStorage.getItem("budget");

  var t_bugt = t_budget.innerHTML;
  var t_expense = expense.innerHTML;
  balance.innerHTML = t_bugt - t_expense;

  //  Start delete button coding
  var delete_btn = document.getElementsByClassName("delete-btn");
  for (i = 0; i < delete_btn.length; i++) {
    delete_btn[i].onclick = function () {
      var cnf = window.confirm("Are You Sure Delete it?");
      if (cnf) {
        var del_parent = this.parentElement;
        var div_parent = del_parent.parentElement;
        var h5 = div_parent.children[0].innerHTML;
        localStorage.removeItem("budget_" + h5);
        location.href = location.href;
      } else {
        alert("You Data is Safe!");
      }
    };
  }
  //  Start Edit Button Coding
  var edit_btn = document.getElementsByClassName("edit-btn");
  for (i = 0; i < edit_btn.length; i++) {
    edit_btn[i].onclick = function () {
      var cnf = window.confirm("Are You Sure Edit it?");
      if (cnf === true) {
        var edit_parent = this.parentElement;
        var col_parent = edit_parent.parentElement;
        var h5_data = col_parent.children[0].innerHTML;
        // alert(h5_data);
        var h5_price = col_parent.children[1].innerHTML;
        // alert(h5_price);
        title.value = h5_data;
        cost.value = h5_price;
        title.focus();
        product_btn.innerHTML = "Update your data";
        product_btn.onclick = function () {
          localStorage.removeItem("budget_" + h5_data);
          var p_title = title.value;
          var p_cost = cost.value;
          var data = {
            p_cost: p_cost,
            p_title: p_title,
          };
          var string = JSON.stringify(data);
          localStorage.setItem("budget_" + title.value, string);
          location.href = location.href;
        };
      } else {
        alert("Your Data is Safe!");
      }
    };
  }
}
all_data();
