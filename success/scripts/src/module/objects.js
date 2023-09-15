export class ObjectAddi extends Object {
    public static areEqual(obj1, obj2) {
        // Сначала проверим, что оба объекта имеют одинаковое количество свойств
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        // Затем проверим каждое свойство
        for (const key of keys1) {
            const val1 = obj1[key];
            const val2 = obj2[key];

            if (typeof val1 === "object" && typeof val2 === "object") {
                // Если значение является объектом, рекурсивно вызываем функцию для сравнения
                if (!this.areEqual(val1, val2)) {
                    return false;
                }
            } else if (val1 !== val2) {
                // Если значения не равны, объекты не одинаковы
                return false;
            }
        }

        // Если все свойства совпали, объекты считаются одинаковыми
        return true;
    }
}