import {randomIze} from "../../module/random";

export class CanvasLine {
    private container
    private canvas
    private dataDraw = []
    private controller_engine = {controller: {id: null, status: false},engine: {id: null, status: false} }
    constructor(container, parram) {
        if(container)
            this.container = container
        this.initCanvas(parram)
        this.generateLine()
    }

    public controller = (action) => {
        if(action === "turnOn"){
            if(!this.controller_engine.controller.status) this.generateLine()
            if(!this.controller_engine.engine.status) this.doAnimation()
        }else{
            if(this.controller_engine.controller.status) {
                this.controller_engine.controller.status = false
                clearInterval(this.controller_engine.controller.id)
            }

            if(this.controller_engine.engine.status) {
                this.controller_engine.engine.status = false
                cancelAnimationFrame(this.controller_engine.engine.id)
            }

        }
    }

    private initCanvas(parram){
        const canvas = parram.canvas
        const ctx = canvas.getContext("2d")

        canvas.width = parram.width
        canvas.height = parram.height

        this.canvas = canvas

        this.controller("turnOn")

    }

    private generateLine(){
        this.controller_engine.controller.id = setInterval(()=>{
            if(this.dataDraw.length <= 1){
                //addNewLine
                let newLine = this.getRandomData()
                this.dataDraw.push(newLine)
            }
        },1000)

        this.controller_engine.controller.status = true
    }

    private doAnimation(){
        const loop = () =>{
            if(this.dataDraw.length > 0) {
                let i = 0
                let deleted = -1
                this.dataDraw.forEach((data) => {

                    //calculsate data
                    if (data.x.direction === "toRight" && this.isDone("x", data) === false && !data.finished) {
                        data.x.point += 2
                    } else if (data.x.direction === "toLeft" && !this.isDone("x", data) && !data.finished) {
                        data.x.point -= 2
                    } else if (data.finished && data.x.direction === "toRight" && !this.isDone("finished", data)) {
                        data.x.start += 4
                    } else if (data.finished && data.x.direction === "toLeft" && !this.isDone("finished", data)) {
                        data.x.start -= 4
                    }


                    if (data.y.direction === "toBottom" && !this.isDone("y", data) && !data.finished) {
                        data.y.point += 2
                    } else if (data.y.direction === "toTop" && !this.isDone("y", data) && !data.finished) {
                        data.y.point -= 2
                    } else if (data.finished && data.y.direction === "toBottom" && !this.isDone("finished_y", data)) {
                        data.y.start += 4
                    } else if (data.finished && data.y.direction === "toTop" && !this.isDone("finished_y", data)) {
                        data.y.start -= 4
                    }


                    this.drawCanvas()

                    //check if data need delete
                    if (this.isDone("x", data) && this.isDone("y", data)) {
                        data.finished = true
                        this.dataDraw.finished = true
                    }

                    if (this.isDone("finished", data) && this.isDone("finished_y", data)) {
                        deleted = i
                    }

                    i++
                });
                if (deleted !== -1) {
                    this.dataDraw.splice(deleted, 1);
                }

                this.controller_engine.engine.id = requestAnimationFrame(this.doAnimation.bind(this))
                this.controller_engine.engine.status = true
            }
        };

        if (this.dataDraw.length <= 0) {
            setTimeout(loop, 1000);

            cancelAnimationFrame(this.controller_engine.engine.id)
            this.controller_engine.engine.status = false
        } else {
            loop();
        }

    }

    private isDone(type, data){

        if(type !== "finished" && type !== "finished_y"){
            let _data = type === "x" ? data.x : data.y;

            if (_data.direction === "toRight" || _data.direction === "toBottom") {
                if (_data.point >= _data.end) {
                    return true;
                }
            }
            else {
                if (_data.point <= _data.end) {
                    return true;
                }
            }

        }else if(type === "finished_y"){
            if(data.y.direction === "toBottom" && data.y.start >= ((data.y.end)-1)) return true
            if(data.y.direction === "toTop" && data.y.start <= ((data.y.end)-1)) return true
        }else{
            if(data.x.direction === "toRight" && data.x.start >= ((data.x.end)-1)) return true
            if(data.x.direction === "toLeft" && data.x.start <= ((data.x.end)-1)) return true
        }

        return false;
    }

    private getRandomData(){
        const newData = {}

        let x = {start: 0, end: 0, point: 0}
        let y = {start: 0, end: 0, point: 0}
        let randomColor = this.getRgbSett(randomIze.getRandomInt(1,4))
        let i = 0
        while(true){
            x.start = randomIze.getRandomInt(0, this.canvas.width)
            x.end = randomIze.getRandomInt(0, this.canvas.width)

            y.start = randomIze.getRandomInt(0, this.canvas.height)
            y.end = randomIze.getRandomInt(0, this.canvas.height)


            if(Math.abs(x.start - x.end) > 300 && Math.abs(y.start - y.end) > 100) break
            if(i >= 100000) {
                alert("Memory error, pls contact developer via telegram @GetWorld")
                break
            }
            i++
        }



        newData.x = x
        newData.x.point = newData.x.start
        newData.x.direction = x.start < x.end ? "toRight" : "toLeft"
        newData.gradient = randomColor

        newData.y = y
        newData.y.point = newData.y.start
        newData.y.direction = y.start < y.end ? "toBottom" : "toTop"
        newData.finished = false

        return newData
    }

    private drawCanvas() {

        const canvas = this.canvas
        const ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.dataDraw.forEach((data)=> {
            ctx.lineWidth = 200;
            let gradient = ctx.createLinearGradient(data.x.start, 300, data.x.point, 300);

            let i = 0;
            data.gradient.forEach((color) => {
                gradient.addColorStop(i, color);
                i++
            });

            ctx.strokeStyle = gradient
            ctx.shadowColor = data.gradient[0];
            ctx.shadowBlur = 20;

            ctx.beginPath();
            ctx.moveTo(data.x.start, data.y.start);
            ctx.lineTo(data.x.point, data.y.point);
            ctx.stroke();
        });
    }

    private getRgbSett(rnd){

        switch (rnd){

            case 1:
                return [
                    "#ff9756",
                    "#94ee9d"
                ]
                break;

            case 2:
                return [
                    "#d556ff",
                    "#56ffd2"
                ]
                break;


            case 3:
                return [
                    "#d5ff56",
                    "#ff5656"
                ]
                break;

            default:
                return [
                    "#566dff",
                    "#ff5656"
                ]
        }
    }


}