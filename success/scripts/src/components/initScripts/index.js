import {CarboneCanvas} from "../carbonCanvas/index"
import {CanvasLine} from "../carbonCanvas/canvasLine"
import {Optimizator} from "../optimizator/optimizator"
import {NeonsLight} from "../neonsLight/index";
import {Swipers} from "../swipers";
import {checkbox} from "../../module/checkbox";
import {RoadAnimation} from "../roadAnimation";
import {InputPrice} from "../../module/input_price";
import {MapLocation} from "../../module/mapLocation";
import {InitForm} from "../../module/form";
import {initSelectors} from "../../module/selector";
import {BasicSelector} from "../../module/BasicSelector";
import {FilterInventory} from "../filters/FilterInventory";
import {SwitchFormPopup} from "../../module/PopupSwitch";
import {Sign_registration} from "../../module/sign_registration";
export class InitScripts {
    private pageId
    constructor(pageId){
        if(pageId !== null)
        this.pageId = pageId
    }

    public init(){
        switch (this.pageId){

            case "main-page":
                //init scripts
                return this.initMainPage()

                break
            case "inventory-page":
                return this.initInvertoryPage()
                break

            case "product-page":
                return this.initProductPage()
                break
            case "about-page":
                return this.initAboutPage()
                break
            case "sign_page":

                return this.signIN()
                break
        }
    }

    private signIN(){

        new InitForm()

        document.querySelectorAll("[data-switch-to]").forEach((el) => {
            el.addEventListener("click", (e) => {
                const getSwitcher = document.querySelector(e.target.getAttribute("data-switch-to"))
                const getContainer = e.target.closest(".mainContents")
                const titleContainer = document.querySelector("#TitleMain")
                //clearform
                getContainer.querySelectorAll("form").forEach((form) => {
                    form.style.opacity = 0;

                    let dataType = getSwitcher.getAttribute("data-type")

                    titleContainer.classList.add("animationChangeTitle")

                    setTimeout(() => {

                        console.log(dataType)

                        if(dataType === "login"){
                            titleContainer.querySelector("p").innerText = "Dealer Zone"
                            titleContainer.querySelector("p").style.color = "#88E892"
                            titleContainer.querySelector(".line").style.background = "#9CFFA6"
                            titleContainer.querySelector(".line").style.boxShadow = "0px 0px 37px 12px rgba(82,255,99,0.8)"
                        }else{
                            titleContainer.querySelector("p").innerText = "Seller registration"
                            titleContainer.querySelector("p").style.color = "#E6E888"
                            titleContainer.querySelector(".line").style.background = "#FFE5A3"
                            titleContainer.querySelector(".line").style.boxShadow = "0px 0px 37px 12px rgba(255, 208, 90, 0.80)"
                        }


                        setTimeout(() => {
                            titleContainer.classList.remove("animationChangeTitle")
                        }, 500)



                    },150)

                    setTimeout(() => {
                        form.style.display = "none"
                        getSwitcher.style.display = "block"
                        getSwitcher.style.opacity = "1"
                    },300)
                })
            })
        })

        new Sign_registration()
    }
    private initAboutPage(){
        let initNeonLight = new NeonsLight(document.querySelectorAll(".initlight"),[document.getElementById("mainLightLeft"),document.getElementById("mainLightRight")])
        let argument = [
            {
                type: "lightAnim",
                add: "disabledTurnOff",
                container: initNeonLight.lights_export,
                action: initNeonLight.controller_light,
                mainLight: initNeonLight.mainLight,
                add_light: initNeonLight.add_light
            },
        ]

        Swipers.initAutoSwiper()

        return new Optimizator(argument)
    }
    private initProductPage(){
        let initNeonLight = new NeonsLight(document.querySelectorAll(".initlight"),[document.getElementById("mainLightLeft"),document.getElementById("mainLightRight")])

        let argument = [
            {
                type: "lightAnim",
                add: "disabledTurnOff",
            },
        ]



        Swipers.initProductSwiper()
        new InitForm()
        new initSelectors(document.querySelectorAll(".initSelector"))
        new SwitchFormPopup()

        if(document.querySelector(".contactAutolodge")){

            document.querySelector(".contactAutolodge").querySelector(".btn-close").addEventListener("click", (e) => {
                document.querySelector(".contactAutolodge").querySelector(".btn-ui-close").click()
            })

        }

        //init clip board

        if(document.querySelectorAll(".initCopyBord")){
            document.querySelectorAll(".initCopyBord").forEach((el) => {
                el.addEventListener("click", (e) => {
                    let target = e.target
                    let getContainer = target.closest(".view")

                    let getData = getContainer.getAttribute("data-number")

                    const textarea = document.createElement('textarea');
                    textarea.value = getData;
                    textarea.style.opacity = 0;
                    textarea.style.position = "absolute"
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                })
            })
        }

        return new Optimizator(argument)

    }

    private initInvertoryPage(){
        let initNeonLight = new NeonsLight(document.querySelectorAll(".initlight"),[document.getElementById("mainLightLeft"),document.getElementById("mainLightRight")])

        let argument = [
            {
                type: "lightAnim",
                add: "disabledTurnOff",
                container: initNeonLight.lights_export,
                action: initNeonLight.controller_light,
                mainLight: initNeonLight.mainLight,
                add_light: initNeonLight.add_light
            },

            {
                type: "LockFilter",
                container:  document.querySelector(".main_content"),
                content: document.querySelector("#filter_container"),
            }
        ]

        new BasicSelector()

        new FilterInventory()
        new InitForm()
        new initSelectors(document.querySelectorAll(".initSelector"))

        return new Optimizator(argument)

    }

    private initMainPage(){
        const width = document.querySelector(".home__section").offsetWidth
        const height = document.querySelector(".home__section").offsetHeight

        let initBG_canvas = new CarboneCanvas(document.getElementById("carbone_container"), width, height)

        let argument = {
            canvas: document.getElementById("canvasLineCarbone"),
            width: document.getElementById("carbone_container").width,
            height: document.getElementById("carbone_container").height
        }

        let initCanvasBgLine = new CanvasLine(document.getElementById("carbone_container"), argument)
        let initNeonLight = new NeonsLight(document.querySelectorAll(".initlight"),[document.getElementById("mainLightLeft"),document.getElementById("mainLightRight")])
        let initRoadCar = new RoadAnimation(document.getElementById("canvasAnimationRoad"), document.querySelector(".registration__section"))



        argument = {
            id: initNeonLight.mainLight,
            action: initNeonLight.controller_light
        }

        Swipers.initMainSwiper(document.getElementById("mainSwiper"), argument)
        Swipers.initReviwsSwiper(document.getElementById("swiper_reviews_main"),
            {
                left: document.getElementById("swiper_left_review"),
                right: document.getElementById("swiper_right_review"),
            })
        /*newCarSwiperInit*/ Swipers.initNewCarSwiper(document.getElementById("swiper_newCar"))


        let initInputsDom = document.querySelectorAll(".initInputPrice")
        let initInputs = new InputPrice(initInputsDom)

        //init checkboxs
        new checkbox()

        new MapLocation()
        new InitForm()
        new initSelectors(document.querySelectorAll(".initSelector"))

        argument = [
            {
                type: "carboneAnimation",
                container: initBG_canvas.containerId,
                id: initBG_canvas.animationStatus,
                reset: initBG_canvas.resetAnimation
            },
            {
                type: "carboneLine",
                container: initBG_canvas.containerId,
                action: initCanvasBgLine.controller
            },

            {
                type: "lightAnim",
                add: "none",
                container: initNeonLight.lights_export,
                action: initNeonLight.controller_light,
                mainLight: initNeonLight.mainLight,
                add_light: initNeonLight.add_light
            },
            // {
            //     type: "animationCar",
            //     container: document.querySelector(".registration__section"),
            //     action: initRoadCar.getAndCalcData,
            // }
        ]

        return new Optimizator(argument)
    }
}

