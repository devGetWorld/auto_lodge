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


    private watchProccess(){

        this.elements.forEach((el) => {

            if(el.type === "lightAnim"){
                if(el.container.length > 0){
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

                if(el.mainLight.length > 0){
                    let getElements = el.mainLight
                    getElements.forEach((element) => {
                        let getContainer = element.id
                        let DiffrentPosition = this.getDiffrentPosition(getContainer)

                        if(DiffrentPosition > 200){
                            el.action("turnOff", element)
                        }else{
                            el.action("turnOn", element)
                        }

                    })
                }

                if(el.add_light.length > 0){
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

    private getDiffrentPosition(getContainer) {
        const elementPosition = getContainer.getBoundingClientRect().top;
        return Math.abs(elementPosition)
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