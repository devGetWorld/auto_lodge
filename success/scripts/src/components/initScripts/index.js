import {carboneCanvas} from "../carbonCanvas/index"
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

        let initBG_canvas = new carboneCanvas(document.getElementById("bg_canvas_carbons"), width, height)
    }
}