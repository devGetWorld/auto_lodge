import {randomIze} from "../../module/random";

export class carboneCanvas {
    private canvasId
    private carbonImage
    private listsElements = []
    private ctx
    private animationArray = []
    private animationId

    constructor(canvasId, width, height) {
        if(!canvasId) return
        this.canvasId = canvasId
        this.ctx = canvasId.getContext("2d")
        this.initCanvas(width, height)
    }

    private initCanvas(width, height){
        const canvas = this.canvasId
        const ctx = this.canvasId.getContext("2d")

        canvas.width = width
        canvas.height = height

        this.carbonImage = new Image();
        this.carbonImage.src = '../success/resourse/static/background/carbone.png';
        this.carbonImage.onload = () => this.doInitCarbons(canvas, ctx)
    }

    private doInitCarbons(canvas, ctx){
            const width = canvas.width
            const height = canvas.height
            const imgWidth = 224
            const imgHeight = 263
            const space = 10
            let reverse = true
            let spaceReverse = 0
            let listCarbon = []

            const numImgsHorizontally = (Math.floor((width + space) / (imgWidth + space))) + 1;
            const numImgsVertically = (Math.floor((height + space) / (imgWidth + space))) + 1;

            for(let i = 0; i < numImgsVertically; i++) {
                reverse = !reverse

                for(let j = 0; j < numImgsHorizontally; j++) {
                    let startPointID = i * 8
                    let x = j * (imgWidth + space);
                    let y = (i * (imgHeight + space)) - spaceReverse;

                    if(reverse){
                       x -= 117;
                       y -= 70
                    }

                    listCarbon.push({id: startPointID + j, x: x, y: y, exposure: 1})
                }

                if (reverse){
                    spaceReverse+=140
                }
            }

            this.listsElements.push(listCarbon)
            console.log(this.listsElements[0])
            this.doDraw(canvas, ctx)
    }

    private doDraw() {
        if (this.animationArray.length === 0) {
            this.animationArray = randomIze.getRandomElAndChangeExp(this.listsElements[0], 1);
            // console.log("empty array");
        }

        this.ctx.clearRect(0, 0, this.canvasId.width, this.canvasId.height);

        this.listsElements[0].forEach((el) => {
            let foundElement = this.animationArray.find(item => item.id === el.id);
            if (foundElement) {
                if (Math.abs(foundElement.exposure - foundElement.exposure_end) < 0.01) {
                    const index = this.animationArray.findIndex(item => item.id === foundElement.id);

                    if (index > -1) {
                        this.animationArray.splice(index, 1);
                    }

                    // if(this.animationArray.length < 1 ) {
                    //     let i = Math.abs(this.animationArray.length - 1)
                    //     let tempArr = randomIze.getRandomElAndChangeExp(this.listsElements[0], i);
                    //
                    //     this.animationArray = this.animationArray.concat(tempArr)
                    // }

                    // console.log('Removed element', foundElement, 'Current array', this.animationArray);
                } else if (foundElement.exposure > foundElement.exposure_end) {
                    el.exposure -= 0.01;
                } else if (foundElement.exposure < foundElement.exposure_end) {
                    el.exposure += 0.01;
                }
            }

            this.ctx.filter = 'brightness(' + el.exposure + ')';
            this.ctx.drawImage(this.carbonImage, el.x, el.y, 224, 263);
            this.ctx.filter = 'none';
        });

        this.animationId = requestAnimationFrame(() => this.doDraw());
    }

}