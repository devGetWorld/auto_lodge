import { InitScripts } from "./components/initScripts/index"
import { MainMenuEvent } from "./components/mainEvents/mainMenuEvent"

let pageId = document.querySelector("main").className
let initWeb = new InitScripts(pageId)
new MainMenuEvent()

let callbaack = initWeb.init()

//global script
document.querySelectorAll("[data-popup]").forEach((el) => {
    el.addEventListener("click", (e) => popupOpen(e))

    document.querySelectorAll(".popup").forEach((el)=>{
        el.querySelector(".btn-ui-close").addEventListener("click", (e) => doClose(e) )
    })
})

function doClose(e){
    const mainTarget = e.target.closest(".popup")

    mainTarget.style.opacity = 0
    setTimeout(()=>{
        mainTarget.style.display = "none"
        document.querySelector("html").style.overflowY = "auto"

    },300)
}
function popupOpen(e){
    let getPopup = document.querySelector(e.target.getAttribute("data-popup"))

    getPopup.style.display = "block"
    setTimeout(()=>{
        getPopup.style.opacity = "1"
        //freeze_html
        document.querySelector("html").style.overflowY = "hidden"
    },10)
}

window.addEventListener("load", () => {
    const getLoader = document.querySelector(".preloader")
    if(window.innerWidth <= 1400 ){
        alert("sorry, but your screen width too small for view at this beta version site")
        return
    }

    getLoader.style.opacity = 0

    setTimeout(() => {
        getLoader.style.display = "none"
        document.getElementsByTagName("html")[0].style.overflowY = "auto"
        if(callbaack){
            callbaack.doRestore()
        }
    },300)
})
