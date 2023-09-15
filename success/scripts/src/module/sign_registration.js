export class Sign_registration {
    private alert
    private responseLine
    constructor(){
        if(!document.querySelector("main").classList.contains("sign_page")) return

        this.alert = document.querySelector("#InformationResponse")
        this.responseLine = document.querySelector("#lineResponseForServer")

        document.querySelector("#RegistrationTryGetToken").addEventListener("click", (e) => this.handller_registation(e) )
        document.querySelector("#loginTryGetToken").addEventListener("click", (e) => this.handller_login(e) )
    }

    private handller_registation(e){

    }

    private handller_login(e){

    }

    private actionOpenThenCloseAlert(text){
        if (!this.alert) return

        this.alert.querySelector("p").innerText = text
        this.alert.style.display = "block"
        this.alert.classList.add("actionOpen")

        setTimeout(() => {
            this.alert.style.display = "none"
        },5000)

    }

    private changeResponseLineTo(type, text = null){
        switch (type){
            case "doWaiting":
                this.responseLine.classList.remove("error")
                this.responseLine.classList.add("waiting")
                break
            case "doError":
                this.responseLine.classList.add("error")
                this.responseLine.classList.remove("waiting")
                this.actionOpenThenCloseAlert(text)
                break
        }
    }



}