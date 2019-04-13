let count = 0;
let id = 0;

$("head").append(`<style>
    .toast { background: #222; padding: 15px; color: #fff; position: fixed; right: -100%; top: 5%; z-index: 1000000; }
    @keyframes show {
        from { right: -100% } to { right: 50px }
    }
    .show { animation: show 500ms; animation-fill-mode: forwards; }
    @keyframes hide {
        from { right: 50px } to { right: -100% }
    }
    .hide { animation: hide 500ms; animation-fill-mode: forwards; }
</style>`);

const showToast = (text, border_radius, time) => {
    $("body").append(`<div id="toast_${id}" class="toast" style="margin-top: ${count*60}px; border-radius: ${border_radius};">${text}</div>`);

    $(`#toast_${id}`).addClass("show");

    setTimeout((hide_id) => {
        $(`#toast_${hide_id}`).addClass("hide");

        $(".toast").map((i) => {
            $(".toast").eq(i).animate({
                "margin-top": ($(".toast").eq(i).attr("style").split("margin-top: ")[1].split(";")[0].replace("px", "") - 60) + "px"
            }, 500);
        });

        count--;
    }, time * 1000, id);

    count++;
    id++;
};
