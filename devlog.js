document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".devlog-card").forEach((card) => {
        if (card.getAttribute("href") === "#") {
            card.addEventListener("click", (event) => {
                event.preventDefault()
            })
            card.setAttribute("aria-disabled", "true")
        }
    })
})
