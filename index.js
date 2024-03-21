window.addEventListener("DOMContentLoaded", () => {
  try {
    window.WinAPI.HandleEvent("setting-update", applyInformation);
  } catch (error) {
    applyInformation(
      "aaaaa,bbbbbb,ccccccc",
      "上古:说的:tom,上古:说的:tom,上古:说的:tom",
      "name1,name2,name3"
    );
    console.log("your environment bad");
  }

  function applyInformation(g_name_group, server_name_group, roles_name_group) {
    g_name_group.split(",").map((game_name) => {
      $($(".alert_list").eq(0)).prepend(
        `<a target="_self" data-gid="40">${game_name}</a>`
      );
    });
  }

  $("#d_username input").on("blur", function () {
    if ($(this).val() === "") {
      $("#d_username")
        .addClass("pay-zh-error")
        .find(".pay-zh-ts")
        .removeClass("none")
        .html("请输入账号");
    } else {
      $("#d_username")
        .addClass("pass")
        .removeClass("pay-zh-error")
        .find(".pay-zh-ts")
        .addClass("none")
        .html("");
    }
  });

  $("#d_reusername input").on("blur", function () {
    if (
      $(this).val() === "" ||
      $(this).val() !== $("#d_username input").val()
    ) {
      $("#d_reusername")
        .addClass("pay-zh-error")
        .find(".pay-zh-ts")
        .removeClass("none")
        .html("两次输入的账号不一致");
    } else {
      $("#d_reusername")
        .addClass("pass")
        .removeClass("pay-zh-error")
        .find(".pay-zh-ts")
        .addClass("none")
        .html("");
    }
  });

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

  $(".alert_game").each(function (index) {
    $(this).on("click", function () {
      $(this).addClass("on").siblings().removeClass("on");
      $(".alert_list").each(function (list_index) {
        if (list_index === index) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    });
  });

  $("[data-gid]").on("click", function () {
    $("#d_game_select").addClass("pass");
    $("#d_game_select span").html(this.innerHTML);
    $("#d_game_select_box").hide();
  });

  $(".box_selectmoney [data-money]").on("click", function () {
    $(this).addClass("cur").siblings().removeClass("cur");
  });

  $(".pay-cz-zdy-je input").on("blur", function () {
    $(".pay-cz-zdy-je").attr(
      "data-money",
      $(this).val() !== "" ? $(this).val() : 0
    );
  });

  $(".pay-tc-close").on("click", closeTips);
  $(".pay-tc-btn").on("click", closeTips);

  function showTips(element_selector) {
    closeTips();
    $(".pay-bg").removeClass("none");
    $(element_selector).removeClass("none");
  }

  function closeTips() {
    $(".pay-tc").addClass("none");
    $(".pay-bg").addClass("none");
  }

  //验证信息
  function validateFormInfo() {
    if (
      !$("#d_reusername").hasClass("pass") ||
      !$("#d_username").hasClass("pass")
    ) {
      $("#d_username input").focus();
      return false;
    }

    if (!$("#d_game_select").hasClass("pass")) {
      showTips("#tc_pay_game_tips");
      return false;
    }
  }
  $(".pay-btn a").on("click", function () {
    const validateSuccess = validateFormInfo();
    if (validateSuccess) {
      const payMoney = $(".box_selectmoney .cur").attr("data-money");
      console.log(payMoney, "payMoney");
    }
  });
});
