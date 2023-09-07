export class InputPrice {
    private priceDom = []

    constructor(inputs){
        if(inputs){
            this.priceDom = inputs
            this.initPriceInput()
        }
    }

    private initPriceInput(){
        this.priceDom.forEach((el) => {
          el.addEventListener("input", this.initEventListener.bind(this))
          let getCheck = el.getAttribute("data-plates")
          getCheck = document.getElementById(getCheck)
          if(getCheck) getCheck.addEventListener("change", this.output_data.bind(this, el) )
        })
    }

    private output_data(el){

        let value = el.value.replace(/[^0-9]/g, '');
        if(value.length >= 4){
            value = parseInt(value)
            let getChekbox = el.getAttribute("data-plates")
            let getContainer = el.getAttribute("data-output")
            const globalPrice = document.querySelector(".totalToPay")
            const isPlates = document.getElementById(getChekbox).checked
            const getContainerView = document.getElementById(getContainer)


            //car price = 7000
            const plates = isPlates ? 25 : 151

            const data = {
                carPrice: value,
                carTax: (value * 0.07).toFixed(0),
                title: 165,
                plates: plates,
                docs: 250,
            }

            const totalRegistration = parseInt(parseInt(data.carTax) + parseInt(data.title) + parseInt(data.plates) + parseInt(data.docs)).toFixed(0)
            let totalToPay = parseInt(parseInt(data.carPrice) + parseInt(data.carTax) + parseInt(data.title) + parseInt(data.plates) + parseInt(data.docs)).toFixed(0)
            totalToPay = this.formatedPrice(totalToPay)
            //remove wait
            getContainerView.querySelector(".tax__input").innerHTML = data.carTax + "$"
            getContainerView.querySelector(".title__input").innerHTML = data.title+ "$"
            getContainerView.querySelector(".plates__input").innerHTML = data.plates+ "$"
            getContainerView.querySelector(".docs__input").innerHTML = data.docs+ "$"
            getContainerView.querySelector(".reg__total").innerHTML = totalRegistration + "$"
            if(globalPrice) globalPrice.innerHTML = totalToPay

            getContainerView.querySelector(".holder").style.opacity = 0
            //put data
        }else{
            let getContainer = el.getAttribute("data-output")
            const getContainerView = document.getElementById(getContainer)
            getContainerView.querySelector(".holder").style.opacity = 1
            const globalPrice = document.querySelector(".totalToPay")
            if(globalPrice) globalPrice.innerHTML = 0
        }
    }

    private formatedPrice(value){

        if(value.length === 4){
            let firstPart = value.slice(0, 1);
            let secondPart = value.slice(1);

            value = firstPart + " " + secondPart;
        }

        if(value.length === 5){
            let firstPart = value.slice(0, 2);
            let secondPart = value.slice(2);

            value = firstPart + " " + secondPart;
        }

        if(value.length === 6){
            let firstPart = value.slice(0, 3);
            let secondPart = value.slice(3);

            value = firstPart + " " + secondPart;
        }

        return value
    }

    private initEventListener(e){

        const input = e.target;
        let value = input.value;

        // Удаляем символ доллара, если он есть
        value = value.replace(/[^0-9]/g, '');

        // Проверяем, была ли нажата клавиша Backspace
        const isBackspace = event.inputType === 'deleteContentBackward';

        if (isBackspace) {
            // Если была нажата Backspace, удаляем последний символ перед долларом
            if(value.length > 1){
                value = value.substr(0, value.length-1)
            }else{
                value = 0
            }
        }

        if(parseInt(value[0]) === 0){
            value = value.substr(1, value.length)
        }

        value = this.formatedPrice(value)


        value = value + '$';

        input.value = value;

        this.output_data(e.target)
    }
}