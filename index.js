let serverList = [];
let gameList = [];

function applyInformation(
  game_name,
  game_bi,
  game_bl,
  server_name,
  server_num,
  server_suffix,
  user_name
) {
  game_bi_group = game_bi.split(",");
  game_bl_group = game_bl.split(",");
  server_num_group = server_num.split(",");
  server_suffix_group = server_suffix.split(",");
  gameList = game_name.split(",").map((name, index) => {
    $($(".alert_list").eq(0)).prepend(
      `<a target="_self" data-gid="${index}">${name}</a>`
    );

    return {
      game_name: name,
      pay_type: game_bi_group?.[index] ?? "通用路费",
      pay_count: parseInt(game_bl_group?.[index] ?? "10"),
    };
  });

  serverList = server_name.split(",").map((server_info, index) => {
    const serverList = server_info.split(":");
    const serverSum = server_num_group[index].split(":");
    const serverSuffix = server_suffix_group[index].split(":");
    return serverList.map((name, index2) => {
      return {
        name,
        s_num: parseInt(serverSum[index2]),
        suffix: serverSuffix[index2],
      };
    });
  });
  user_name.split(",").map((role_name, index) => {
    $("#d_select_roles ul").prepend(`<li>${role_name}</li>`);
  });

  $("#d_select_roles ul li").on("click", function (e) {
    e.stopPropagation();
    $("#d_select_roles").addClass("pass");
    $("#d_select_roles span").html(this.innerHTML);
    $("#d_select_roles ul").hide();
  });
}
function addEvents() {
  function applyServerList(g_index) {
    const server_info = serverList[g_index] ?? [];
    $(".picList").html(null);
    $(".pay-game-select").html(null);
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
            )}>${i - 99}-${i}${server.suffix}</a></li>`
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
          } >${s_num - ((s_num % 100) - 1)}-${s_num}${server.suffix}</a></li>`
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

  function applyGamePayInfo() {
    const game_name = $("#d_game_select span").html();
    $(".pay-je-que").hide();
    const { pay_type = "元宝", pay_count = "10" } = gameList.find(
      (game) => game.game_name === game_name
    );

    const payMoney = $(".box_selectmoney .cur").attr("data-money");
    $(".pay-je-que span").html(`${pay_count * payMoney}${pay_type}`);
    $(".pay-je-que em").html(`(兑换比例 1:${pay_count})`);
    $(".pay-je-que").show("slow");
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

      const reusername = $("#d_username input").val();
      if (reusername !== "" && reusername !== $(this).val()) {
        $("#d_reusername")
          .addClass("pay-zh-error")
          .find(".pay-zh-ts")
          .removeClass("none")
          .html("两次输入的账号不一致");
      }
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
    applyGamePayInfo();
  });

  $(".box_selectmoney [data-money]").on("click", function () {
    $(this).addClass("cur").siblings().removeClass("cur");
    applyGamePayInfo();
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
    if (!$("#d_server_select").hasClass("pass")) {
      showTips("#tc_pay_server_tips");
      return false;
    }
    if (!$("#d_select_roles").hasClass("pass")) {
      showTips("#tc_pay_role_tips");
      return false;
    }
    return true;
  }
  $(".pay-btn a").on("click", function () {
    const validateSuccess = validateFormInfo();
    if (!validateSuccess) {
      return;
    }
    $("#tc_extlogin_box .pay-tc-zh").html(
      `您的贪玩平台账号是：${$("#d_username input").val()}`
    );
    showTips("#tc_extlogin_box");
  });

  $("#tc_extlogin_box .pay-tc-btn").on("click", function () {
    $("#tc_pay_preview_box .pay-jieguo-form ").html(`
    <p><span>充值方式：</span>支付宝支付</p>
    <p><span>充值账号：</span>${$("#d_username input").val()}</p>
    <p><span>充值游戏：</span>${$("#d_game_select span").html()}</p>
    <p><span>充值区服：</span>${$("#d_server_select span").html()}</p>
    <p><span>充值角色：</span>${$("#d_select_roles span").html()}</p>
    <p>
      <span>充值金额：</span>${$(".box_selectmoney .cur").attr("data-money")}元
    </p>
    <p class="voucher_pay_tips">
      <span>代金券减免：</span>0.00元
    </p>
    <p>
      <span>充值所得：</span>${$(".pay-je-que span").html()}
    </p>
    `);

    showTips("#tc_pay_preview_box");
  });

  $("#tc_pay_preview_box #frm_post_submit").on("click", function () {
    showTips("#tc_pay_qrcode_box");
    //show loading
    processPayment();
  });

  function waitTime(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time * 1000);
    });
  }

  async function processPayment() {
    await waitTime(3);
    $("#tc_pay_qrcode_box .qr-loading").hide();
    $("#tc_pay_qrcode_box .qr-code").show();
    await waitTime(4);
    $("#tc_pay_qrcode_box .qr-scan-success").removeClass("d-none");
    await waitTime(3);
    $("#tc_pay_qrcode_box .qr-code").hide();
    $("#tc_pay_qrcode_box .pay-alipay-way").hide();
    $("#tc_pay_qrcode_box .qr-loading").show();
    $("#tc_pay_qrcode_box .pay-processing").show("slow");
    await waitTime(4);
    showTips("#tc_pay_tips_box");
  }
}

window.addEventListener(
  "DOMContentLoaded",

  () => {
    try {
      window.WinAPI.HandleEvent("tanwan-setting-update", (...props) => {
        applyInformation(...props);
        addEvents();
      });
      window.WinAPI.SendEventToRenderer("tanwan-page-update");
    } catch (error) {
      console.log("your environment bad");
    }
  }
);
