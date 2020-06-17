$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  let currentUser;
  function getUserData() {
    $.get("/api/user_data").then(data => {
      currentUser = data;
      console.log(currentUser);
      renderCards(currentUser.players);
      $(".member-name").text(data.email);
    });
  }

  function renderCards(players) {
    for (let i = 0; i < 5; i++) {
      $(`#startImg${i}`).html(
        players[i]
          ? `<img src="${players[i].URL}" alt="basketball player" width="100%">`
          : `<div class="icon">
                            <i class="fas fa-basketball-ball" aria-hidden="true"></i>
                        </div>`
      );
      $(`#start${i}`).html(
        players[i]
          ? `
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
  <div class="col-3" >
    <div class="row">${players[i].REB}</div>
    <div class="row">${players[i].AST}</div>
    <div class="row">${players[i].STL}</div>
    <div class="row">${players[i].BLK}</div>
    <div class="row">${players[i].TOV}</div>
  </>
</div>
      `
          : "<h1>Start Building Your Five</h1>"
      );
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
    }).then(() => getUserData());
  }

  function addFav(id) {
    $.ajax({
      method: "PUT",
      url: `/api/fav/add/${currentUser.id}/${id}`
    }).then(() => getUserData());
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

  getUserData();
});
