export class initSelectors {
    private domSelectors = []
    constructor(element){
        const data = {
            addInput: null,
            selector: null
        }

        if(element){
            element.forEach((el) => {
                data.addInput = el.getAttribute("data-validation")
                data.selector = el

                el.querySelector(".btn_close").addEventListener("click", this.handler__close_openMenu.bind(this))
                el.querySelectorAll(".list li").forEach((el) => el.addEventListener("click", this.handler__changeTypeValidation.bind(this)))
                document.getElementById(data.addInput).addEventListener("input", (e) => this.handler__inputchack_type(e, el))
            })

            this.domSelectors.push(data)
        }
    }

    private handler__close_openMenu(event){
        const getMainContainer = event.target.closest(".initSelector")
        const list = getMainContainer.querySelector(".list")
        const btn = getMainContainer.querySelector(".btn_close")

        if(list){
            const computedStyle = window.getComputedStyle(list)
            if(computedStyle.getPropertyValue("display") === "none"){
                //do open
                list.style.display = "block"
                btn.classList.add("active")
                getMainContainer.classList.add("active")
            }else{
                list.style.display = "none"
                btn.classList.remove("active")
                getMainContainer.classList.remove("active")
            }
        }
    }

    private handler__changeTypeValidation(e){
        let target = e.target;
        const getMainContainer = e.target.closest(".initSelector")
        const getInputValidation = document.getElementById(getMainContainer.getAttribute("data-validation"))
        const btn = getMainContainer.querySelector(".btn_close")
        btn.click()
        setTimeout(() => {
            getInputValidation.value = ""
            if(target.tagName !== "LI" ) target = target.closest("li")
            let getData = target.getAttribute("data-type")
            //delete active

            getMainContainer.querySelectorAll(".list li").forEach((el) => el.classList.remove("active"))
            getMainContainer.setAttribute("data-type", getData)
            //swap image
            let getImage = target.querySelector("img").getAttribute("src")
            getMainContainer.querySelector(".display img").setAttribute("src", getImage)
            target.classList.add("active")

            if(getData === "phone"){
                getInputValidation.setAttribute("placeholder", "+1 (000)-000-0000")
            }else{
                getInputValidation.setAttribute("placeholder", "example@example.com")
            }

        },10)
    }

    private handler__inputchack_type(e, el){
        const target = e.target
        const getType = el.getAttribute("data-type")

        if(getType === "phone"){
            this.validationByPhone(target)
        }
    }


    private validationByPhone(target){
        let value = target.value
        let value_replace = value.replace(/[^0-9+]/g, '');

        if(value_replace.length > 12){
            target.value = value.substr(0, value.length - 1)
            return
        }

        if(value_replace.length === 1 && value_replace === "+") {
            value = "+"
        }else if(value_replace.length === 1 && value_replace === "1"){
            value = "+1"
        }else if(value_replace.length === 1 && value_replace !== "1"){
            value = "+1 (" + value_replace
        }else if(value_replace.length > 3){
            value = ""
            for(let i = 0; i < value_replace.length; i++){
                if(i === 2){
                    value += " ("
                }

                if(i === 5){
                    value += ")-"
                }

                if(i === 8){
                    value += "-"
                }
                value += value_replace[i]
            }
        }



        //setup
        target.value = value
    }

    public static checkedValidation(selector){
        let getType = selector.getAttribute("data-type")
        let getInput = document.getElementById(selector.getAttribute("data-validation"))

        if(getType === "phone"){
            let value = getInput.value
            let value_replace = value.replace(/[^0-9+]/g, '');

            if(value_replace.length >= 12){
                return true
            }
        }else{
            let value = getInput.value
            return this.isValidEmail(value)
        }

        return false
    }

    private static isValidEmail(email) {
        // Создаем регулярное выражение для проверки email-адреса
        let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        // Проверяем email с помощью регулярного выражения
        return emailRegex.test(email);
    }
}