export class Optimizator {
    private elements
    private OldPosition = window.scrollY

    constructor(elements) {
        this.elements = elements

        //activate allPrograms
        this.elements.forEach((el) => {
            this.turnOnProccess(el)
        });


        window.addEventListener("scroll", () => this.watchProccess() )

    }

    public doRestore(){
        setTimeout(() => this.watchProccess(),100)
    }

    private watchProccess(){

        console.log(this.elements)

        this.elements.forEach((el) => {

            if(el.type === "lightAnim"){
                if(el.container && el.container.length > 0){
                    let getElements = el.container
                    getElements.forEach((element) => {
                        let getContainer = element.id
                        let DiffrentPosition = this.getDiffrentPosition(getContainer)

                        if(DiffrentPosition > 600){
                            el.action("turnOff", element)
                        }else{
                            el.action("turnOn", element)
                        }

                    })
                }

                if(el.mainLight && el.mainLight.length > 0){
                    let getElements = el.mainLight
                    getElements.forEach((element) => {
                        let getContainer = element.id
                        let DiffrentPosition = this.getDiffrentPosition(getContainer)

                        if(DiffrentPosition > 200){
                            if(el.add && el.add !== "disabledTurnOff"){
                                el.action("turnOff", element)
                            }
                        }else{
                            el.action("turnOn", element)
                        }

                    })
                }

                if(el.add_light && el.add_light.length > 0){
                    let getElements = el.add_light
                    getElements.forEach((element) => {
                        let getContainer = element.id
                        let DiffrentPosition = this.getDiffrentPosition(getContainer)

                        if(DiffrentPosition > 300){
                            el.action("turnOff", element)
                        }else{
                            el.action("turnOn", element)
                        }

                    })
                }


                return
            }

            if(el.type === "LockFilter"){
                let getDiffrent = this.getDiffrentPosition(el.container, false)
                let getBottom = el.container.offsetHeight; //2400
                let getContentH = el.content.offsetHeight

                if(getDiffrent <= 50){
                    el.content.style.position = "fixed"
                    el.container.querySelector(".fakeContent").style.display = "block"

                    if(Math.abs(getDiffrent) >= (getBottom - getContentH)){
                        el.content.style.position = "absolute"
                        el.content.style.top = "auto"
                        el.content.style.bottom = "0"
                        el.content.style.transform = "translateY(0)"
                        el.container.querySelector(".fakeContent").style.display = "block"
                    }else{
                        el.content.style.position = "fixed"
                        el.content.style.top = "50%"
                        el.content.style.transform = "translateY(-50%)"
                        el.content.style.bottom = "auto"
                        el.container.querySelector(".fakeContent").style.display = "block"
                    }

                }else{
                    el.content.style.position = "static"
                    el.content.style.transform = "none"
                    el.container.querySelector(".fakeContent").style.display = "none"
                }



                return;
            }

            let getContainer = el.container
            let diffrentPosition = this.getDiffrentPosition(getContainer)

            if (diffrentPosition > 500) {
                this.disabledProgram(el)
            }else{
                this.turnOnProccess(el)
            }

            //ANIMATION_CAR
            //get dist
            // getContainer = el.container
            // diffrentPosition = this.getDiffrentPosition(getContainer)
            //
            // if(el.type === "animationCar" && diffrentPosition < 900){
            //     const data = {
            //         oldPosition: this.OldPosition,
            //         newPosition: window.scrollY
            //     }
            //
            //     el.action(data)
            // }

        });



        this.OldPosition = window.scrollY

    }

    private getDiffrentPosition(getContainer, isAbs=true) {
        const elementPosition = getContainer.getBoundingClientRect().top;
        if(isAbs) return Math.abs(elementPosition)

        return elementPosition
    }

    private disabledProgram(element){
        switch(element.type){
            case "carboneAnimation":
                if(element.id.status === false) return
                clearInterval(element.id.id)
                element.id.status = false
                break

            case "carboneLine":
                element.action("turnOff")
                break
        }
    }

    private turnOnProccess(element){
        switch(element.type){
            case "carboneAnimation":
                if(element.id.status !== false) return
                element.reset()
                break

            case "carboneLine":
                element.action("turnOn")
                break
        }
    }
}