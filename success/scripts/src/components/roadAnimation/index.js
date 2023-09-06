export class RoadAnimation {
    private road
    private cars
    private settingCars = []

    constructor(road, cars) {

        if (road && cars.length > 0 && cars[0]){
            this.road = road
            this.cars = cars

            cars.forEach(el => {
                el.style.left = "1290px"
                el.style.top = "-120px"

                this.settingCars.push({
                    x: el.style.left.substr(0, el.style.left.length - 2),
                    y: el.style.top.substr(0, el.style.top.length - 2),
                    z: 0
                })
            })
        }
    }

    public getAndCalcData = (data) => {
        console.log(Math.abs(data.oldPosition - data.newPosition))
        if(data.oldPosition < data.newPosition){
            let dataPosition = {x: this.settingCars[0].x, y: this.settingCars[0].y, z: this.settingCars[0].z}

            if(dataPosition.y < 700 && dataPosition.x > 900){
                let dataScroll = Math.abs(data.oldPosition - data.newPosition)
                if(dataScroll > 300) return

                dataPosition.y = parseInt(dataPosition.y) + Math.abs(data.oldPosition - data.newPosition)
                //goToDown
            }

            // else if y > 800 & x === right amd getRotate != left
            // addRotate
            // else if y > 800 & x === right and getRotate == left
            // add some Xpx for car
            // else if y > 800 & x === left and getRotate == left
            // remove rotate
            // else
            // add Ypx
            //

            this.settingCars[0] = dataPosition
        }else{
            console.log("to top")
        }

        this.moveCar()

    }

    private moveCar(){
        const data = this.settingCars[0]

        this.cars[0].style.left = `${data.x}px`
        this.cars[0].style.top = `${data.y}px`
        this.cars[0].style.transform = `rotate(${data.z}deg)`
    }
}