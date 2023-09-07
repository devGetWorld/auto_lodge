export class RoadAnimation {
    private initRoadGradient = {
        bottom: 0.1
    };
    private initCar = [];
    private initCanvas;
    private engineWhile
    // private animationStack = []

    constructor(canvas, container) {
        if(canvas) this.initCanvas = canvas

        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
        let img = new Image()
        img.src = "/success/resourse/static/decorations/car_from_top.png"

        img.onload = () => {
            this.initCar.push({
                y: 50,
                y_new: -100,
                image: img,
                x: 1510
            })

            this.initObjects()
        }
    }

    private initObjects(){
        this.drawRoad(this.initCanvas, this.initCanvas.getContext("2d"))
        this.drawCar(this.initCanvas, this.initCanvas.getContext("2d"))
    }
    public getAndCalcData = (data) => {
        const thisCar = this.initCar[0]
        let diffranse = Math.abs(data.oldPosition - data.newPosition)
        if(diffranse > 700) return

        if(data.oldPosition < data.newPosition ){
            //to bottom
            if(thisCar.y < 800 ){
                this.changeGradient("toBottom")
                this.moveCar("toBottom")
                this.initCar[0].y_new.push((parseInt(this.initCar[0].y) + parseInt(diffranse)))

                // this.animationStack.push({ y_new:  })
                // console.log("Diffrance: "+ diffranse + " ,endResult: " + this.initCar[0].y_new)
                // console.log("do toBottom")

            }

        }else{
            // if(thisCar.y >= thisCar.y_new && thisCar.y < 800 ){
            //     this.initCar[0].y_new = (-(parseInt(this.initCar[0].y) + parseInt(diffranse)))
            //     // console.log(this.initCar[0].y_new + " ---- "+ this.initCar[0].y)
            //     this.changeGradient("toTop")
            //     this.moveCar("toTop")
            //
            //     // console.log("toTop")
            // }
        }
    };

    private changeGradient(dir){
       if(dir === "toBottom"){
           if(this.initRoadGradient.bottom !== 0.9){
               this.initRoadGradient.bottom =  this.initRoadGradient.bottom += 0.008

               if(this.initRoadGradient.bottom > 0.9) this.initRoadGradient.bottom = 0.9
           }
       }else{
           if(this.initRoadGradient.bottom !== 0.1){
               this.initRoadGradient.bottom =  this.initRoadGradient.bottom -= 0.008

               if(this.initRoadGradient.bottom < 0.1) this.initRoadGradient.bottom = 0.1
           }
       }

    }

    private moveCar() {
        const car = this.initCar[0]

        // console.log(car[0].y + "  --- " + car[0].y_new)

        if (car.y !== car.y_new && car.y < car.y_new ) {
            car.y += 1;
            this.engine();

            this.engineWhile = requestAnimationFrame(this.moveCar.bind(this))
            if (car.y === car.y_new) {
                cancelAnimationFrame(this.engineWhile);
            }
        } else {
            console.log("do cancel - " + this.initCar[0].y + " wanna - " + this.initCar[0].y_new);
            cancelAnimationFrame(this.engineWhile);
        }

    }

    private engine() {
        const canvas = this.initCanvas
        const ctx = canvas.getContext("2d")

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.drawRoad(canvas, ctx)
        this.drawCar(canvas, ctx)
    }

    private drawCar(canvas, ctx){
        const car = this.initCar[0]

        ctx.drawImage(car.image, car.x, car.y, 113, 157);
    }

    private drawRoad(canvas, ctx) {

        // Нарисуйте квадрат
        ctx.beginPath();
        ctx.rect(canvas.width - 190, 0, 190, canvas.height * 0.9); // Параметры: (x, y, ширина, высота)
        ctx.fillStyle = '#131313'; // Задайте цвет заливки
        ctx.fill(); // Заполните квадрат цветом
        ctx.closePath();

        // Нарисуйте квадрат
        ctx.beginPath();
        ctx.rect(0, (canvas.height * 0.9)-140, canvas.width, 140); // Параметры: (x, y, ширина, высота)
        ctx.fillStyle = '#131313'; // Задайте цвет заливки
        ctx.fill(); // Заполните квадрат цветом
        ctx.closePath();

        // Нарисуйте квадрат
        ctx.beginPath();
        ctx.rect(0, (canvas.height * 0.9)-140, 190, 230); // Параметры: (x, y, ширина, высота)
        ctx.fillStyle = '#131313'; // Задайте цвет заливки
        ctx.fill(); // Заполните квадрат цветом
        ctx.closePath();

        // Создайте градиент
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop( 1, 'rgba(255, 100, 249, 0)');
        gradient.addColorStop( this.initRoadGradient.bottom, '#FF7B7B');

        //right line
        ctx.beginPath();
        ctx.lineWidth = 13;
        ctx.moveTo(canvas.width, 0);
        ctx.lineTo(canvas.width, canvas.height * 0.9);
        ctx.lineTo(canvas.width * 0.5, canvas.height * 0.9);
        ctx.lineTo(190, canvas.height * 0.9);
        ctx.lineTo(190, canvas.height);
        ctx.setLineDash([0,0]);
        ctx.strokeStyle = gradient;
        ctx.stroke();

        //left line
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.moveTo(canvas.width -190, 0);
        ctx.lineTo(canvas.width - 190, canvas.height * 0.74);
        ctx.lineTo((canvas.width - 190) * 0.5, canvas.height * 0.74);
        ctx.lineTo(0, canvas.height * 0.74);
        ctx.lineTo(0, canvas.height);
        ctx.setLineDash([0,0]);
        ctx.strokeStyle = gradient;
        ctx.stroke();

        //center line
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.setLineDash([60, 40]);
        ctx.moveTo(canvas.width -95, 0);
        ctx.lineTo(canvas.width - 95, canvas.height * 0.82);
        ctx.lineTo((canvas.width - 95) * 0.5, canvas.height * 0.82);
        ctx.lineTo(95, canvas.height * 0.82);
        ctx.lineTo(95, canvas.height);

        ctx.strokeStyle = gradient;
        ctx.stroke();
    }
}