export class Validation {
    public static validationByNumbers(value, exp = null, isBackSpace = null){
        //cleare
        value = value.replace(/[^0-9]/g, '');
        //dublicate
        let value_clear = value

        if (isBackSpace) {
            if(value.length > 1){
                value = value.substr(0, value.length-1)
            }else{
                value = 0
            }
        }

        if(value.length >= 2 && value[0] === "0"){
            value = value.substr(1, value.length)
        }

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

        if(exp !== null)  return {value: value + exp, valueClear: value_clear}

        return {value: value, valueClear: value_clear}
    }
}