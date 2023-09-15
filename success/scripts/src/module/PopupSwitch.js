export class SwitchFormPopup {

    constructor() {
        let target = document.querySelectorAll(".initPopupSwitcher")
        if(target) {
            target.forEach((el) => {
                let getContainer = el.closest(".container_popup")

                getContainer.querySelectorAll(".buttons-switch button").forEach((el) => el.addEventListener("click", (e) => this.handler__switchBtn(e) ))
            })
        }
    }

    private handler__switchBtn(e){
        let getTarget = e.target
        let getContainer = getTarget.closest(".container_popup")
        let getForms = getContainer.querySelector(".content")
        let getDataTo = getTarget.getAttribute("data-switch")

        if(getTarget.classList.contains("active")) return;

        //clear
        getForms.querySelectorAll(".list").forEach((el) => {
            el.style.opacity = 0
            setTimeout(() => {
                el.style.display = "none"

                //doActive
                getForms.querySelector(getDataTo).style.display = "block"
                setTimeout(() => {
                    getForms.querySelector(getDataTo).style.opacity = 1
                },10)

                getContainer.querySelectorAll(".buttons-switch button").forEach((el) => {
                    el.disabled = false
                    el.classList.remove("active")
                })
                getTarget.disabled = true
                getTarget.classList.add("active")

            }, 300)
        })


    }
}