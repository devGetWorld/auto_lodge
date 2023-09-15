import {CarLoaded} from "./CarLoaded";
import {FilterInventory} from "../components/filters/FilterInventory";

export class BasicSelector {
    constructor() {
        document.querySelectorAll(".initSelectorBasic").forEach((el) => {
            el.querySelector(".display").addEventListener("click", (e) => this.handler__openCloseMenu(e))
            el.querySelector(".list").addEventListener("click", (e) => this.handler__selectElement(e))
        })

        let sel = document.querySelectorAll(".initSelectorBasic")
        document.addEventListener("click", (e) => {
            sel.forEach((el) => {
                const withinBoundaries = e.composedPath().includes(el);

                if(!withinBoundaries){
                    let list = el.querySelector(".list")
                    let MainContainer = el

                    list.style.opacity = 0
                    MainContainer.querySelector(".button svg").classList.remove("active")
                    setTimeout(()=>{
                        list.style.display = "none"
                    },300)
                }
            })
        })
    }

    private handler__openCloseMenu(e){
        const MainContainer = e.target.closest(".initSelectorBasic")
        const list = MainContainer.querySelector(".list")

        let getStyle = getComputedStyle(list)
        if(getStyle.getPropertyValue("display") === "none"){
            //doOpen
            list.style.display = "block"
            setTimeout(()=>{
                list.style.opacity = 1
                MainContainer.querySelector(".button svg").classList.add("active")
            },10)
        }else{
            //doClose
            list.style.opacity = 0
            MainContainer.querySelector(".button svg").classList.remove("active")
            setTimeout(()=>{
                list.style.display = "none"
            },300)
        }
    }

    private handler__selectElement(e){
        const target = e.target
        const mainContainer = target.closest(".initSelectorBasic")
        const list = mainContainer.querySelector(".list")

        if(target.classList.contains("active")){
            mainContainer.querySelector(".display").click()
            return
        }

        list.querySelectorAll("li").forEach((el) => {
            el.classList.remove("active")
        })

        let getData = target.getAttribute("data-value")
        let getText = target.innerHTML
        mainContainer.setAttribute("data-val", getData)

        target.classList.add("active")

        mainContainer.querySelector(".display").click()
        mainContainer.querySelector(".display p").innerHTML = getText

        if(getData !== "ALL" ){
            mainContainer.querySelector(".display p").classList.add("active")
        }else{
            mainContainer.querySelector(".display p").classList.remove("active")
        }

        clearTimeout(FilterInventory.babelLoaderStatus)

        FilterInventory.babelLoaderSetup()
    }


}