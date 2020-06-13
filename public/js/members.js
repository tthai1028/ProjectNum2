$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.email);
  });

  $.get("/");

  $(".fa-heart").on("click", function() {
    const fav = $(this).data("fav");
    fav ? $(this).css("color", "white") : $(this).css("color", "red");
    $(this).data("fav", !fav);
  });

  $(".player").hover(function() {
    $(".player").css("z-index", 1)
    $(this).css('z-index', 100)
  });
});

function myFunction() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("playerTable");
  rows = table.getElementsByTagName("tr");
  for (i = 0; i < rows.length; i++) {
    if (rows[i].id.toUpperCase().indexOf(filter) > -1) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}
