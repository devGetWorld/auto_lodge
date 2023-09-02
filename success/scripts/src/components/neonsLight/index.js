export class NeonsLight{
    public lights_export = []
    private globalSettings = {
        turnOff_color: "#4d4d4d",
        turnOff_gradient: "#424242"
    }

    //{
    // id: (object) class
    // status: false | true
    //}
    constructor(ARR) {
        if(ARR) ARR.forEach((el) => {
            this.lights_export.push({
                id: el,
                status: false
            })
        });

    }

    public controller_light = (type, element) => {

        console.log(type)
        if(type === "turnOff" && element.status === true){
            this.turnOffLight(element.id)
            element.status = false
        }else if(type === "turnOn" && element.status === false){
            this.turnOnLight(element.id)
            element.status = true
        }else if(type === "changeMainLight"){
            this.turnOnLight(document.querySelector(".mainLight"))
            this.turnOnLight(document.querySelectorAll(".mainLight")[1])
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
        }
    }

}