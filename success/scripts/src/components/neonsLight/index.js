export class NeonsLight{
    public lights_export = []
    private globalSettings = {
        turnOff_color: "#4d4d4d"
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

        if(type === "turnOff" && element.status === true){
            this.turnOffLight(element.id)
            element.status = false
        }else if(type === "turnOn" && element.status === false){
            this.turnOnLight(element.id)
            element.status = true
        }
    }

    private turnOnLight = (element) => {
        let getData = {color: element.getAttribute("data-color"), shadow: element.getAttribute("data-shadow")}
        element.style.background = getData.color;

        if(element.classList.contains("mainLight")){
            element.querySelector(".fakeLight").style.boxShadow = `0px 4px 250px 201px ${getData.shadow}`
        }
    }

    private turnOffLight = (element) => {
        element.style.background = this.globalSettings.turnOff_color;

        if (element.classList.contains("mainLight")) {
            element.querySelector(".fakeLight").style.boxShadow = `0px 4px 250px 201px transparent`
        }
    }

}