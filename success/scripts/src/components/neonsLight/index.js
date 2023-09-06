export class NeonsLight{
    public lights_export = []
    public mainLight = []
    public add_light = []

    private globalSettings = {
        turnOff_color: "#4d4d4d",
        turnOff_gradient: "#424242",
        turnOff_add: "#3d3d3d"
    }

    constructor(ARR, mainLights) {
        if(ARR) ARR.forEach((el) => {

            if(el.getAttribute("data-type") === "add_light"){
                this.add_light.push({
                    id: el,
                    status: false
                })

            }else{
                this.lights_export.push({
                    id: el,
                    status: false
                })
            }
        });

        if(mainLights){
            mainLights.forEach((el) => {
              this.mainLight.push({ id: el, status: false })
            })
        }

    }

    public controller_light = (type, element) => {

        if(type === "turnOff" && element.status === true){
            this.turnOffLight(element.id)
            element.status = false
        }else if(type === "turnOn" && element.status === false){
            this.turnOnLight(element.id)
            element.status = true
        }else if(type === "changeMainLight") {
            element.forEach((el) => {
                if (el.status === true){
                    this.turnOnLight(el.id)
                }
            })
        }
    }

    private turnOnLight = (element) => {

        if(element.classList.contains("mainLight")){
            let getData = document.querySelector("#mainSwiper").querySelector(".swiper-slide.swiper-slide-active")
            let data = {color: getData.getAttribute("data-color"), shadow: getData.getAttribute("data-shadow")}
            element.querySelector(".fakeLight").style.boxShadow = `0px 4px 250px 201px ${data.shadow}`
            element.style.background = `${data.color}`

            if(document.querySelectorAll(".GlobalText").length > 0){
                let el_text = document.querySelectorAll(".GlobalText")
                el_text.forEach((el) => {
                    el.style.color = data.color;
                    el.style.textShadow = `0px 0px 60px ${data.shadow}`
                })
            }
        }else{

            if(element.getAttribute("data-type") === "add_light")
            {
                let getClassText = element.getAttribute("data-text")
                let getImg = document.querySelector(getClassText)
                let getText = document.querySelectorAll(getClassText)[1]
                let getSecondText = document.querySelectorAll(getClassText)[2]

                let getColor = element.getAttribute("data-color")
                let getShadow = element.getAttribute("data-shadow")

                getImg.style.opacity = 1
                getText.style.color = "white"
                getSecondText.style.color = "#CBCBCB"

                getText.classList.add("animation_turnOnLight")
                getSecondText.classList.add("animation_turnOnLight")

                element.classList.add("animation_turnOnLight")
                element.style.background = getColor
                element.style.boxShadow = `0px 0px 250px 136px ${getShadow}`
            }else{
                let data = {color: element.getAttribute("data-color"), shadow: element.getAttribute("data-shadow")}
                let text_color = element.querySelector("h2")
                let bg_color = element.querySelector(".fakeLine")

                text_color.style.color = "white";
                bg_color.style.background = data.color
                bg_color.style.boxShadow = `0px 0px 37px 12px ${data.shadow}`
            }

        }
    }

    private turnOffLight = (element) => {
        if(element.classList.contains("mainLight")){
            element.querySelector(".fakeLight").style.boxShadow = `0px 4px 250px 201px transparent`
            element.style.background = this.globalSettings.turnOff_color

            if(document.querySelectorAll(".GlobalText").length > 0){
                let el_text = document.querySelectorAll(".GlobalText")
                el_text.forEach((el) => {
                    el.style.color = this.globalSettings.turnOff_gradient
                    el.style.textShadow = `0px 0px 39px transparent`
                })
            }
        }else{

            if(element.getAttribute("data-type") === "add_light")
            {
                let getClassText = element.getAttribute("data-text")
                let getImg = document.querySelector(getClassText)
                let getText = document.querySelectorAll(getClassText)[1]
                let getSecondText = document.querySelectorAll(getClassText)[2]

                let getColor = this.globalSettings.turnOff_add

                getImg.style.opacity = "0.6"
                getText.style.color = "#393939"
                getSecondText.style.color = "#393939"

                getText.classList.remove("animation_turnOnLight")
                getSecondText.classList.remove("animation_turnOnLight")

                element.classList.remove("animation_turnOnLight")
                element.style.background = getColor
                element.style.boxShadow = `0px 0px 250px 136px transparent`
            }else{
                let text_color = element.querySelector("h2")
                let bg_color = element.querySelector(".fakeLine")

                text_color.style.color = "#4D4D4D";
                bg_color.style.background = "#282828"
                bg_color.style.boxShadow = `0px 0px 37px 12px transparent`
            }

        }
    }

}