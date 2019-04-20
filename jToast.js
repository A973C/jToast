let toasts = 0;
let manager = {
    ready: true,
    jobs: [],
    currentWorkingID: 0,
    addJob(job) {
        this.ready = false;
        this.jobs.push({ text: job.text, args: job.args });

        const waitUntilReady = setInterval(() => {
            if (this.workJobOff()) {
                clearInterval(waitUntilReady);
            }
        }, 250);
    },
    removeJob(id) {
        if (this.currentWorkingID === id) {
            this.ready = true;
        }
    },
    workJobOff() {
        if (this.ready && this.jobs.length > 0) {
            showToast(this.jobs[0].text, this.jobs[0].args);
            this.jobs.splice(0, 1);
            return true;
        }
    }
};

function showToast(text, { duration = 3000, background = "#232323", color = "#fff", borderRadius = "0px" } = {}) {
    const selectedToast = toasts;
    if (!manager.ready) {
        manager.addJob({ text: text, args: showToast.arguments[1], workingID: selectedToast });
        return;
    }
    manager.currentWorkingID = selectedToast;

    $("body").append(`
        <div style="background: ${background}; color: ${color}; border-radius: ${borderRadius};" data-toast-id="${toasts}" class="toast">
            ${text}
        </div>
    `);

    $(".toast").map((i) => {
        manager.ready = false;
        if (i !== selectedToast) {
            $(".toast").eq(i).animate({
                "margin-top": "+=" + parseInt($(`[data-toast-id="${selectedToast}"]`).height() + (15 * 2) + 15 + 5) + "px"
            }, 300);

            setTimeout(() => {
                manager.removeJob(selectedToast);
            }, 300);
        }else {
            setTimeout(() => {
                $(".toast").eq(i).animate({
                    "margin-top": "25px"
                }, 300);

                setTimeout(() => {
                    manager.removeJob(selectedToast);
                }, 300);
            }, 150);
        }
    });

    setTimeout(() => {
        $(`[data-toast-id="${selectedToast}"]`).animate({
            "margin-right": "-" + parseInt($(`[data-toast-id="${selectedToast}"]`).width() + (15 * 2) + 25) + "px"
        }, 300);

        if (selectedToast !== toasts) {
            $(".toast").map((i) => {
                if (i < selectedToast) {
                    setTimeout(() => {
                        $(".toast").eq(i).animate({
                            "margin-top": "-=" + parseInt($(`[data-toast-id="${selectedToast}"]`).height() + (15 * 2) + 15 + 5) + "px"
                        }, 300);
                    }, 300);
                }
            });
        }

        setTimeout(() => {
            $(`[data-toast-id="${selectedToast}"]`).css("display", "none");
        }, 300);
    }, duration);

    toasts++;
    return selectedToast;
}

function hideToast(id) {
    if ($(`[data-toast-id="${id}"]`).css("display") !== "none") {
        $(`[data-toast-id="${id}"]`).animate({
            "margin-right": "-" + parseInt($(`[data-toast-id="${id}"]`).width() + (15 * 2) + 25) + "px"
        }, 300);

        if (id !== toasts) {
            $(".toast").map((i) => {
                if (i < id) {
                    setTimeout(() => {
                        $(".toast").eq(i).animate({
                            "margin-top": "-=" + parseInt($(`[data-toast-id="${id}"]`).height() + (15 * 2) + 15 + 5) + "px"
                        }, 300);
                    }, 300);
                }
            });
        }

        setTimeout(() => {
            $(`[data-toast-id="${id}"]`).css("display", "none");
        }, 300);
    }
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
    `);
})();
