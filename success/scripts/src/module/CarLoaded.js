import {Validation} from "./validation";

export class CarLoaded {
    private page = 0

    public static getCars(){
        const getContainer = document.querySelector("#car_container")
        const data = {page: this.page, filter: null}
        let responseData = this.doSendAjaxAndGetData(data)
        CarLoaded.appendToContainer(responseData)
        this.page++
    }

    public static filterRestore(data){
        const getContainer = document.querySelector("#car_container")

        const dataForRequest = {action: "getCar", page: 0, filter: data}
        let responseData = CarLoaded.doSendAjaxAndGetData(data)
        CarLoaded.reloadingCars(responseData)

        this.page = 0
    }

    private static doSendAjaxAndGetData(data){
        //serverSendData

        //getResponseByJson
        //return fake data
        return {
            "isDone": true,
            "LoadedCard": [
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "Audi A3 2018",
                    "Millage": "52000 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "BMW X5 2020",
                    "Millage": "34500 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "Mercedes-Benz C-Class 2017",
                    "Millage": "78900 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "Toyota Camry 2019",
                    "Millage": "42000 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "Honda Civic 2021",
                    "Millage": "6500 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "Audi A3 2015",
                    "Millage": "95000 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "BMW X5 2018",
                    "Millage": "62000 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "Mercedes-Benz C-Class 2019",
                    "Millage": "45000 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "Toyota Camry 2020",
                    "Millage": "39000 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "Honda Civic 2017",
                    "Millage": "72000 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "Audi A3 2019",
                    "Millage": "38000 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "BMW X5 2021",
                    "Millage": "8900 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "Mercedes-Benz C-Class 2016",
                    "Millage": "96000 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "Toyota Camry 2017",
                    "Millage": "78000 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "Honda Civic 2022",
                    "Millage": "2400 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "Audi A3 2016",
                    "Millage": "89000 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "BMW X5 2019",
                    "Millage": "51000 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "Mercedes-Benz C-Class 2018",
                    "Millage": "67000 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "Toyota Camry 2016",
                    "Millage": "85000 miles",
                    "link": "localhost:4000"
                },
                {
                    "img": "./success/resourse/resourse/car1.png",
                    "Name": "Honda Civic 2020",
                    "Millage": "12000 miles",
                    "link": "localhost:4000"
                }
            ]
        }
    }

    private static appendToContainer(data){
        CarLoaded.appendCar(data)
    }

    private static reloadingCars(data) {
        CarLoaded.appendCar(data, true)
    }

    private static appendCar(data, isClear = false){
        const GetContainer = document.getElementById("car_container")
        const getCarContainer = GetContainer.querySelector(".cars_wrapper")
        const loadingWrapper = GetContainer.querySelector(".loadingWrapper")
        const isDone = data.isDone
        data = data.LoadedCard
        //empty car
        getCarContainer.style.opacity = 0
        setTimeout(() => {
            if(isClear) getCarContainer.innerHTML = ""
            data.forEach((el) => {

                const tempContainer = document.createElement('div');
                tempContainer.classList.add("wrapper_car")
                tempContainer.innerHTML = `
                    <div class="header"><p>12 000$</p></div>
                    <img src="${el.img}" alt="car1" />
                    <h3>${el.Name}</h3>
                    <p>mileage: ${Validation.validationByNumbers(el.Millage, "mi").value}</p>
                    <div class="line"></div>
                    <button class="btn-ui-view_details" data-link="${el.link}" >view details</button>
        `;

                getCarContainer.append(tempContainer)
            })

            getCarContainer.style.opacity = 1
            loadingWrapper.style.opacity = 0
            setTimeout(()=> loadingWrapper.style.display = "none", 300)

            if(isDone){
                document.querySelector(".moreLoadingBlock").disabled = true
            }else{
                document.querySelector(".moreLoadingBlock").disabled = false
            }
        },300)
    }

}