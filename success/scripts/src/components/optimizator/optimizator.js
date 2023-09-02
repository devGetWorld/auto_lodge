export class Optimizator {
    private elements
    constructor(elements) {
        this.elements = elements

        //activate allPrograms
        this.elements.forEach((el) => {
            this.turnOnProccess(el)
        });


        document.addEventListener("scroll", () => this.watchProccess() )

    }

    private watchProccess(){
        this.elements.forEach((el) => {

            if(el.type === "lightAnim"){
                let getElements = el.container
                getElements.forEach((element) => {
                    let getContainer = element.id
                    let DiffrentPosition = this.getDiffrentPosition(getContainer)

                    //console.log(DiffrentPosition)
                    if(DiffrentPosition > 300){
                        el.action("turnOff", element)
                    }else{
                        el.action("turnOn", element)
                    }

                })

                return
            }

            let getContainer = el.container
            let diffrentPosition = this.getDiffrentPosition(getContainer)

            if (diffrentPosition > 500) {
                this.disabledProgram(el)
            }else{
                this.turnOnProccess(el)
            }

        });

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