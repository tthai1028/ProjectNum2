$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  $.get("/");

  $(".fa-heart").on("click", function() {
    const fav = $(this).data("fav");
    fav ? $(this).css("color", "white") : $(this).css("color", "red");
    $(this).data("fav", !fav);
  });
});

function myFunction() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
