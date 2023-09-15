import {Validation} from "../../module/validation";
import {ObjectAddi} from "../../module/objects";
import {CarLoaded} from "../../module/CarLoaded";

export class FilterInventory {
    public static babelLoaderStatus = null
    private static MainContainer
    private static buttonReset
    private static noneFilter = {
        make: "ALL",
        model: "ALL",
        body_type: "ALL",
        color: "ALL",
        price: {min: "", max: ""},
        millage: {min: "", max: ""},
        year: {min: "", max: ""},
    }
    private static oldFilter = {...FilterInventory.noneFilter}

    constructor() {
        const getContainer = document.querySelector("#filter_container")
        if(getContainer){
            FilterInventory.MainContainer = getContainer
            getContainer.querySelectorAll("input").forEach((el) => {
                el.addEventListener("input", (e) => this.handler_inputs(e) )
            })
            FilterInventory.buttonReset = getContainer.querySelector("#resetBTN")
            FilterInventory.buttonReset.addEventListener("click", () => this.doCanelFilter())
            document.querySelector(".moreLoadingBlock").addEventListener("click", () => CarLoaded.getCars())
        }
    }

    private handler_inputs(e){
        const getParent = e.target.closest(".cnt")
        const isBackspace = event.inputType === 'deleteContentBackward';
        const dataInput = {min: getParent.querySelector("input"), max: getParent.querySelectorAll("input")[1]}
        const target = e.target
        let getExp = target.getAttribute("data-exp")
        const data_valid = e.target.getAttribute("data-valid")

        let getValidation = Validation.validationByNumbers(target.value, getExp, isBackspace)

        if(parseInt(getValidation.valueClear) > parseInt(dataInput.max.getAttribute('data-max'))){
            getValidation = [dataInput.max.getAttribute('data-max'), getExp, isBackspace]
        }else{
            getValidation = [target.value, getExp, isBackspace]
        }

        target.value = FilterInventory.setUpValidation(data_valid, getValidation)

        FilterInventory.babelLoaderSetup()
    }

    public static babelLoaderSetup(){
        clearTimeout(FilterInventory.babelLoaderStatus)
        FilterInventory.babelLoaderStatus = setTimeout(() => this.babelLoaderFunc(), 2000 )
    }

    private static babelLoaderFunc(){
        FilterInventory.checkAndChangeValue()
        const getContainer = FilterInventory.MainContainer
        const data = {}
        getContainer.querySelectorAll(".main_filter .wrapper").forEach((el) =>{
            const basic = el.querySelector(".initSelectorBasic")
            let key = basic.getAttribute("data-type")
            let val = basic.getAttribute("data-val")
            data[key] = val
        })

        getContainer.querySelectorAll(".cnt").forEach((el) => {
            const getType = el.getAttribute("data-type")
            const Min = Validation.validationByNumbers(el.querySelector("input").value).valueClear
            const Max = Validation.validationByNumbers(el.querySelectorAll("input")[1].value).valueClear
            data[getType] = {min: Min, max: Max}
        })

        if(ObjectAddi.areEqual(data, FilterInventory.oldFilter)) return
        FilterInventory.oldFilter = data

        console.log(FilterInventory.buttonReset)

        FilterInventory.buttonReset.disabled = ObjectAddi.areEqual(FilterInventory.noneFilter, data) ? true : false
        const getLoadingWrapper = document.querySelector("#car_container .loadingWrapper")
        getLoadingWrapper.style.display = "block"
        setTimeout(() => getLoadingWrapper.style.opacity = "1", 10)

        CarLoaded.filterRestore(data)
    }

    private static checkAndChangeValue(){
        let getContainer = FilterInventory.MainContainer

        getContainer.querySelectorAll(".cnt").forEach((parent) => {
            const dataInput = {InputMin: parent.querySelector("input"), InputMax: parent.querySelectorAll("input")[1]}
            const data = {
                min: dataInput.InputMin.getAttribute("data-min"),
                max: dataInput.InputMax.getAttribute("data-max"),
                val_min: Validation.validationByNumbers(dataInput.InputMin.value).valueClear,
                val_max: Validation.validationByNumbers(dataInput.InputMax.value).valueClear,
                exp: dataInput.InputMin.getAttribute("data-exp"),
                isValid: dataInput.InputMin.getAttribute("data-valid")
            }

            if(data.val_min === "" &&  data.val_max === ""){
                return
            }

            if(parseInt(data.val_min ) < parseInt(data.min)){
                dataInput.InputMin.value = FilterInventory.setUpValidation(data.isValid, [data.min, data.exp])
                data.val_min = data.min
            }


            if(data.val_max === ""){
                dataInput.InputMax.value =  FilterInventory.setUpValidation(data.isValid, [data.max, data.exp ])
                data.val_max = data.max
            }else if(data.val_max < parseInt(data.min)){
                dataInput.InputMax.value = FilterInventory.setUpValidation(data.isValid, [data.min, data.exp ])
                data.val_max = data.min
            }


            if(parseInt(data.val_min) > parseInt(data.val_max)){
                let valMin = FilterInventory.setUpValidation(data.isValid, [data.val_max, data.exp])
                let valMax = FilterInventory.setUpValidation(data.isValid, [data.val_min, data.exp])

                dataInput.InputMin.value = valMin
                dataInput.InputMax.value = valMax
            }


        })
    }

    private static setUpValidation(isValid, add=null){
        if(isValid !== "non"){
            return Validation.validationByNumbers(...add).value
        }else{
            return add[0].replace(/[^0-9]/g, '');
        }
    }

    private doCanelFilter(){
       const container = document.getElementById("filter_container")

        container.querySelectorAll(".main_filter .wrapper").forEach((el) => {
            el.querySelector(".initSelectorBasic .list").classList.add("notToShow")
            el.querySelector(".initSelectorBasic").click()
            el.querySelector(".initSelectorBasic .list li").click()
        })

        container.querySelectorAll(".addContainer input").forEach((el) => {
            el.value = ""
        })
    }


}