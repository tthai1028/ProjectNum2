$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  let currentUser;
  $.get("/api/user_data").then(data => {
    currentUser = data;
    console.log(currentUser);
    renderCards(currentUser.players);
    $(".member-name").text(data.email);
  });

  function renderCards(players) {
    for (let i = 0; i < players.length; i++) {
      $(`#startImg${i}`).html(`
      <img class="img-fluid" width="100%" src="https://media.gettyimages.com/photos/feb-2000-steve-francis-of-the-houston-rockets-jumps-to-the-basket-picture-id72484004?s=612x612"/>
      `);
      $(`#start${i}`).html(`
        <div class="row">${players[i].PLAYER}</div>
        <div class="row">
        <div class="col-3">
        <div class="row">GP</div>
        <div class="row">PTS</div>
        <div class="row">FG%</div>
        <div class="row">3P%</div>
        <div class="row">FT%</div>
        </div>
        <div class="col-3">
        <div class="row">${players[i].GP}</div>
        <div class="row">${players[i].PTS}</div>
        <div class="row">${players[i]["FG%"]}</div>
        <div class="row">${players[i]["3P%"]}</div>
        <div class="row">${players[i]["FT%"]}</div>
        </div>
  <div class="col-3">
    <div class="row">REB</div>
    <div class="row">AST</div>
    <div class="row">STL</div>
    <div class="row">BLK</div>
    <div class="row">TOV</div>
  </div>
  <div class="col-3">
    <div class="row">${players[i].REB}</div>
    <div class="row">${players[i].AST}</div>
    <div class="row">${players[i].STL}</div>
    <div class="row">${players[i].BLK}</div>
    <div class="row">${players[i].TOV}</div>
  </>
</div>
      `);
    }
  }

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
