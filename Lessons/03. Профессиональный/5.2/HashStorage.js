function HashStorage () {

    this.addValue = function (key,value) {
        key = prompt("Введите название коктейля:", "Маргарита");
        while (!key) {
            key = prompt("Введите корректно название коктейля!");
        }

        value = {};
        this[key] = value;

        value.alcohol = prompt("Алкогольный напиток?", "12 градусов");
        while (!value.alcohol) {
            value.alcohol = prompt("Введите корректно параметр коктейля!");
        }

        value.ingredients = [];
        for (let i = 0; i < 10; i++) {
            value.ingredients[i] = prompt("Введите необходимые ингредиенты:", "Водка Finlandia 50мл");
            if (value.ingredients[i] === null) {
                value.ingredients.pop();
                break;
            }
        }

        value.recipe = prompt("Введите рецепт приготовления:", "Наполни стакан кубиками льда доверху, затем налей кофейный ликер 25 мл, водку 50 мл и размешай коктейльной ложкой.");

        console.log(`Данные о коктейле сохранены!`);
    }

    this.getValue = function (key) {
        key = prompt("Введите название коктейля:", "Маргарита");

        if (key in this) {
            console.log(`Коктейль "${key}" (алкогольный: ${this[key].alcohol})
Необходимые ингредиенты:
${this[key].ingredients.join('\n')}
Рецепт приготовления:
${this[key].recipe}`);
        }
        else {
            console.log(`Нет информации о коктейле: "${key}"`);
        }
    }

    this.deleteValue = function (key) {
        key = prompt("Введите название коктейля:", "Маргарита");

        if (key in this) {
            delete this[key];
            console.log(`Удален рецепт коктейля: "${key}"`);
            // return true;
        }
        else {
            console.log(`Нет информации о коктейле: "${key}"`);
            // return false;
        }
    }

    this.getKeys = function () {
        if (Object.keys(this).length > 4) {
            console.log(Object.keys(this).slice(4).join('\n'));
        }
        else {
            console.log(`Коктейльная карта пуста..`);
        }
        // for (const [key] of Object.entries(this)) {
        //  if (typeof this[key] === 'object') {
        // 	  console.log(key);
        //  }
        // }
    }
}