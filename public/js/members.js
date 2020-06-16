$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  let currentUser;
  $.get("/api/user_data").then(data => {
    currentUser = data;
    $(".member-name").text(data.email);
  });

  $.get("/");

  $(".fa-heart").on("click", function() {
    const fav = $(this).data("fav");
    if (fav) {
      $(this).css("color", "white");
      console.log("removing ");
      removeFav($(this).data("id"));
    } else {
      $(this).css("color", "red");
      console.log("adding ", $(this).data("id"));
      addFav($(this).data("id"));
    }
    $(this).data("fav", !fav);
  });

  $(".player").hover(
    function() {
      $(".player").css("z-index", 1);
      $(this).css("z-index", 100);
    },
    () => {
      $(".player").each((i, a) => $(a).css("z-index", i + 1));
    }
  );

  function removeFav(id) {
    $.ajax({
      method: "PUT",
      url: `/api/fav/remove/${currentUser.id}/${id}`
    });
  }

  function addFav(id) {
    $.ajax({
      method: "PUT",
      url: `/api/fav/add/${currentUser.id}/${id}`
    });
  }

  $("#myInput").on("keyup", () => {
    const input = document.getElementById("myInput");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("playerTable");
    const rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
      if (rows[i].id.toUpperCase().indexOf(filter) > -1) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  });
});
