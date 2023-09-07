import {CarboneCanvas} from "../carbonCanvas/index"
import {CanvasLine} from "../carbonCanvas/canvasLine"
import {Optimizator} from "../optimizator/optimizator"
import {NeonsLight} from "../neonsLight/index";
import {Swipers} from "../swipers";
import {checkbox} from "../../module/checkbox";
import {RoadAnimation} from "../roadAnimation";
import {InputPrice} from "../../module/input_price";
import {MapLocation} from "../../module/mapLocation";
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
                this.initMainPage()

                break
        }
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
                container: initNeonLight.lights_export,
                action: initNeonLight.controller_light,
                mainLight: initNeonLight.mainLight,
                add_light: initNeonLight.add_light
            },
            {
                type: "animationCar",
                container: document.querySelector(".registration__section"),
                action: initRoadCar.getAndCalcData,
            }
        ]

        new Optimizator(argument)

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

    }
}

