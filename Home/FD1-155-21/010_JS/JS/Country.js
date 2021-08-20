var countries = {'Germany':'Berlin', 'Russia':'Moscow'};

function addCountry(country, capital) {
    country = prompt("Введите страну:", "Belarus");
    capital = prompt("Введите столицу:", "Minsk");
    countries[country] = capital;
    alert ('Страна успешно добавлена!');
}

function getInfoCountry(country) {
    country = prompt("Введите название страны:", "Belarus");
    if (country in countries) {
        alert ('Столица страны: ' + countries[country]);
    }
    else {
        alert('нет информации о стране: ' + country);
    }
}

function showListCountry() {
    for (var key in countries) {
        console.log('Название страны: ' + key + '  Название столицы: ' + countries[key]);
    }
}

function deleteCountry(country) {
    country = prompt("Введите название страны:", "Belarus");
    delete countries[country];
    console.log (delete countries[country])
    alert ('Страна успешно удалена!');
}