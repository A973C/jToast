let toasts = 0;

function showToast(text, args = {}) {
    args.duration = args.duration || 3000;
    args.background = args.background || "#232323";
    args.color = args.color || "#fff";
    args.borderRadius = args.borderRadius || 0;

    $("body").append(`
        <div style="background: ${args.background}; color: ${args.color}; border-radius: ${args.borderRadius}" data-toast-id="${toasts}" class="toast">
            ${text}
        </div>
    `);

    let selectedToast = toasts;
    $(".toast").map((i) => {
        if (i !== selectedToast) {
            $(".toast").eq(i).animate({
                "margin-top": "+=" + parseInt($(`[data-toast-id="${selectedToast}"]`).height() + (15 * 2) + 15 + 5) + "px"
            }, 300);
        }else {
            setTimeout(() => {
                $(".toast").eq(i).animate({
                    "margin-top": "25px"
                }, 300);
            }, 150);
        }
    });

    setTimeout(() => {
        $(`[data-toast-id="${selectedToast}"]`).animate({
            "margin-right": "-" + parseInt($(`[data-toast-id="${selectedToast}"]`).width() + (15 * 2) + 38) + "px"
        }, 300);

        setTimeout(() => {
            $(`[data-toast-id="${selectedToast}"]`).css("display", "none");
        }, 300);
    }, args.duration);

    toasts++;
}

(() => {
    $("head").append(`
        <style>
            .toast {
                padding: 15px;
                color: #fff;
                position: fixed;
                right: 25px;
                top: 0;
                margin-top: -100px;
                box-shadow: 0 10px 40px 0 rgba(62,57,107,.07), 0 2px 9px 0 rgba(62,57,107,.12);
                max-width: 50%;
            }
        </style>
    `)
})();
