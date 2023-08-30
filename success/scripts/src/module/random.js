export class randomIze{
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomElements(arr, i) {
        let arr_ = [];
        let tempArr = [...arr];
        for (let j = 0; j < i; j++) {
            if (tempArr.length === 0) break;
            let index = Math.floor(Math.random() * tempArr.length);
            let getEl = tempArr.splice(index, 1)[0];
            arr_.push(getEl);
        }
        return arr_;
    }

    static getRandomElAndChangeExp(arr, i) {
        let arr_ret = [];
        let tempArr = [...arr];
        for (let j = 0; j < i; j++) {
            if (tempArr.length === 0) break;
            let index = Math.floor(Math.random() * tempArr.length);
            let getEl = tempArr.splice(index, 1)[0];

            getEl.exposure_end = this.getRandomFloat(0.4,1.6)
            arr_ret.push(getEl);
        }

        return arr_ret;
    }

    static getRandomFloat(min, max, n = 1) {
        return parseFloat((Math.random() * (max - min) + min).toFixed(n));
    }
}