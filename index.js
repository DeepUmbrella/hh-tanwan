window.addEventListener("DOMContentLoaded", () => {
  const all_alert_game = document.querySelectorAll(".alert_game");
  const all_alert_list = document.querySelectorAll(".alert_list");
  const all_data_gid = document.querySelectorAll("[data-gid]");

  try {
    window.WinAPI.HandleEvent(
      "setting-update",
      (g_name_group, server_name_group, roles_name_group) => {
        console.log(6666, props);
      }
    );
  } catch (error) {
    console.log("your environment bad");
  }
  $(".alert_select_close").on("click", function () {
    $(".alert_select").hide();
  });

  $("#d_game_select").on("click", function () {
    $("#d_game_select_box").show();
    $("#d_server_select_box").hide();
  });

  $("#d_server_select").on("click", function () {
    $("#d_server_select_box").show();
    $("#d_game_select_box").hide();
  });

  for (let index = 0; index < all_alert_game.length; index++) {
    const element = all_alert_game[index];
    element.addEventListener("click", () => {
      all_alert_game.forEach((element, key) => {
        if (key == index) {
          element.classList.add("on");
        } else {
          element.classList.remove("on");
        }
      });
      all_alert_list.forEach((element, key) => {
        if (key == index) {
          element.style.display = "block";
        } else {
          element.style.display = "none";
        }
      });
    });
  }

  all_data_gid.forEach((element) => {
    element.addEventListener("click", () => {
      d_game_select.innerHTML = element.innerHTML;
      d_game_select_box.style.display = "none";
    });
  });

  $(".box_selectmoney [data-money]").on("click", function () {
    $(this).addClass("cur").siblings().removeClass("cur");
  });
});
