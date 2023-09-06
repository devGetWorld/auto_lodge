export class checkbox {
    private className = ".initCheckBox"
    private initBoxs

    constructor() {
        const allBoxes = document.querySelectorAll(this.className)
        if(allBoxes.length < 1) return

        this.initBoxs = allBoxes
        this.Init()
    }

    private Init(){
        this.initBoxs.forEach((el) => {
            el.addEventListener("click", this.eventClick.bind(this))
        })
    }

    private eventClick(e){
        const input = e.currentTarget.querySelector('input[type="checkbox"]');

        if (input) {
            if (input.checked) {
                this.TurnOff(e.currentTarget, input)
            } else {
                this.TurnOn(e.currentTarget, input)
            }
        }
    }

    private TurnOn(el, input){
        el.querySelectorAll(".side").forEach(side => side.classList.remove("active"))

        el.querySelector(".checked").classList.add("active")
        el.querySelector(".side").classList.add("active")
        input.checked = true
    }

    private TurnOff(el, input){
        el.querySelectorAll(".side").forEach(side => side.classList.remove("active"))

        el.querySelector(".checked").classList.remove("active")
        el.querySelectorAll(".side")[1].classList.add("active")
        input.checked = false
    }

}