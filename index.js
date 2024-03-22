let serverList = [];
window.addEventListener("DOMContentLoaded", () => {
  try {
    window.WinAPI.HandleEvent("setting-update", applyInformation);
  } catch (error) {
    applyInformation(
      "aaaaa,bbbbbb,ccccccc",
      "上古-616-区:说的-178-服:tom-56-服,上古:说的:555,上古:说的:6666",
      "name1,name2,name3"
    );
    console.log("your environment bad");
  }

  function applyInformation(g_name_group, server_name_group, roles_name_group) {
    g_name_group.split(",").map((game_name, index) => {
      $($(".alert_list").eq(0)).prepend(
        `<a target="_self" data-gid="${index}">${game_name}</a>`
      );
    });
    serverList = server_name_group.split(",").map((server_info) => {
      const serverList = server_info.split(":");
      return serverList.map((info) => {
        const [name, s_num = "1", suffix = "服"] = info.split("-");

        return {
          name,
          s_num: parseInt(s_num),
          suffix,
        };
      });
    });
    roles_name_group.split(",").map((role_name, index) => {
      $("#d_select_roles ul").prepend(`<li>${role_name}</li>`);
    });

    $("#d_select_roles ul li").on("click", function (e) {
      e.stopPropagation();
      $("#d_select_roles").addClass("pass");
      $("#d_select_roles span").html(this.innerHTML);
      $("#d_select_roles ul").hide();
    });
  }

  function applyServerList(g_index) {
    const server_info = serverList[g_index] ?? [];
    $(".picList").html(null);
    $("#d_server_select_tab_box").html(null);
    server_info.forEach((server, index) => {
      $(".pay-game-select").append(
        `<option value="${server.name}">${server.name}${server.suffix}</option>`
      );

      $(".picList").append(
        `<li data-tab=${server.name} class="alert_server ${
          index === 0 ? "on" : ""
        }" style="float: left; width: 73px">${server.name}</li>`
      );
      const tab = $(
        `<div class="server_cnt_tab" id="server_cnt_tab_${
          server.name
        }" style="display: ${index === 0 ? "block" : "none"}" ></div`
      );
      const gs_sub = $(`<div class="gs-sel-sub"></div>`);
      const gs_sub_list = $(`<ul class="sub-list-main"></ul>`);
      const gs_content = $(`<div class="server_content"></div>`);

      const s_num = server.s_num;
      let html = "";
      for (let i = 1; i <= s_num; i++) {
        html += `<a href="javascript:;" target="_self">${server.name}${i}${server.suffix}</a>`;

        if (i % 100 === 0) {
          gs_sub_list.append(
            `<li><a class="on" data-server_cnt=${server.name}_${Math.floor(
              i / 100
            )}>${i - 99}--${i}${server.suffix}</a></li>`
          );
          const element = $(`<div
            id="server_cnt_${server.name}_${Math.floor(i / 100)}"
            class="alert_list server_list"
            style="display: ${Math.floor(i / 100) == 1 ? "block" : "none"}"
          ></div>`);
          element.html(html);
          gs_content.append(element);
          html = "";
        }
      }
      if (s_num % 100 !== 0) {
        gs_sub_list.append(
          `<li><a class="on" data-server_cnt=${server.name}_${
            Math.floor(s_num / 100) + 1
          } >${s_num - ((s_num % 100) - 1)}--${s_num}${server.suffix}</a></li>`
        );
        const element = $(`<div
            id="server_cnt_${server.name}_${Math.floor(s_num / 100) + 1}"
            class="alert_list server_list"
            style="display: ${
              Math.floor(s_num / 100) + 1 == 1 ? "block" : "none"
            }"
          ></div>`);
        element.html(html);
        gs_content.append(element);
      }

      gs_sub.append(gs_sub_list);
      tab.append(gs_sub).append(gs_content);
      $("#d_server_select_tab_box").append(tab);
    });

    $(".pay-game-select").on("change", function () {
      $(`[data-tab=${$(this).val()}]`).click();
      console.log($(this).val(), "$(this).val()");
    });

    $(".picList li").on("click", function () {
      $(this).addClass("on").siblings().removeClass("on");
      $(`#server_cnt_tab_${this.dataset.tab}`).show().siblings().hide();
    });

    $(".sub-list-main li a").on("click", function () {
      $(this).addClass("on").siblings().removeClass("on");
      $(`#server_cnt_${this.dataset.server_cnt}`).show().siblings().hide();
    });

    $(".server_list a").on("click", function () {
      $("#d_server_select").addClass("pass");
      $("#d_server_select span").html(this.innerHTML);
      $("#d_server_select_box").hide();
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
    $("#d_select_roles ul").hide();
  });

  $("#d_server_select").on("click", function () {
    $("#d_server_select_box").show();
    $("#d_game_select_box").hide();
    $("#d_select_roles ul").hide();
  });
  $("#d_select_roles").on("click", function () {
    $("#d_select_roles ul").show();
    $("#d_game_select_box").hide();
    $("#d_server_select_box").hide();
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
    applyServerList(this.dataset.gid);
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
