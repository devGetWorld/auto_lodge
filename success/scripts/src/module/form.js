import {initSelectors} from "../module/selector"
export class InitForm {
    constructor(){
        document.querySelectorAll("form").forEach((form) => {
            form.addEventListener("submit", function (e){
                e.preventDefault()
            })


            form.querySelectorAll("input").forEach((el) => el.addEventListener("input", (e) => this.checkStatus_form(e, form)))
            if(form.querySelector(".btn-ui-send")){
                form.querySelector(".btn-ui-send").addEventListener("click", (e) => this.sendData(e, form))

            }
        })
    }

    private sendData(e, form){
        let getName = form.document.getElementById("nameOfInputContactMe")
        let getPhone_mail = form.document.getElementById("addOfInputContactMe")

        if(getName && getPhone_mail){
            //do ajax send
        }
    }

    private checkStatus_form(e, form){
       let isDone = true

       form.querySelectorAll("input").forEach((el) => {
           if(el.getAttribute("type") !== "tel" && el.value.length < 3){
               isDone = false
           }
       })

        if(isDone){
            form.querySelectorAll(".initSelector").forEach((el) => {
                if(!initSelectors.checkedValidation(el)){
                    isDone = false
                }
            })
        }

        form.querySelector(".btn-ui-send").disabled = isDone

    }
}