"use strict";
$.get('js/auto_edit.js',function(a){
    $('#auto-js').text(a);
},'text');


/**
 * Создает экземпляр Машины
 * @this {Car}
 * @param {string} manufacturer Производитель
 * @param {string} model Модель
 * @param {number} year Год производство
 */
function Car(manufacturer, model, year) {
    this.manufacturer = manufacturer;
    this.model = model;
    this.year = year||new Date().getFullYear();
    this.name = 'qwerty';

    this.getInfo=function(){
        return [this.manufacturer,this.model,this.year].join(' ');
    };
    this.getDetailedInfo =function() {
        return [
          ['Производитель',this.manufacturer].join(': '),
          ['Модель',this.model].join(': '),
          ['Год',this.year].join(': '),
        ].join('. ')
    };
}

var bmw = new Car("BMW", "X5", 2010),
    audi = new Car("Audi", "Q5", 2012),
    toyota = new Car("Toyota", "Camry");

console.log('Car: ' + bmw); // Car: BMW X5 2010
// Но как?? О_о
console.log(bmw.getInfo()); // BMW X5 2010
console.log(bmw.getDetailedInfo()); // Производитель: BMW. Модель: X5. Год: 2010
/**
 * Создает экземпляр Автосалона
 * @this {CarDealer}
 * @param {string} name Название автосалона
 */

function CarDealer(name) {
    this.name = name;
    this.cars = [];
    this.prices = [];
    // дополнительный массив, ведь могут быть разные цены на одни и теже автомобили?

    this.add=function() {
        var car = arguments;
        for (var i=0, ln=car.length; i<ln; i++)
            this.cars.push(car[i]);
        return this;
    };
    this.findCarByName=function(name) {
        for (var i=this.cars.length;i--;) {
            if (name==this.cars[i].getInfo())
                return this.cars[i];
        };
        return false;
    };
    this.setPrice=function(car,price) {
        var car=this.findCarByName(car);
        if (!car) return this;
        this.prices.push({
            car:car,
            price:price.replace(/[^\d]/g,'')*1,
            value:price.replace(/\d+/,'')
        });
        return this;
    };
    this.list=function() {
        var txt=[];
        for (var i=0, ln=this.prices.length; i<ln; i++) {
            txt.push(this.prices[i].car.getInfo());
        };
        return txt.join(', ');
    };
    this.listByCountry=function(country) {
        var txt=[];
        for (var i=0, ln=this.prices.length; i<ln; i++) {
            if (getCountry.apply(this.prices[i].car) == country)
            txt.push(this.prices[i].car.getInfo());
        };
        return txt.join(', ');
    };
    this.listRubles=function() {
        var txt=[],
            rubles={
                '¥':.41,
                '€':40.7
            };
        for (var i=0, ln=this.prices.length; i<ln; i++) {
            txt.push([
                this.prices[i].car.getInfo(),
                this.prices[i].price
                  *rubles[this.prices[i].value] + ' руб.'
            ].join(': '));
        };
        return txt.join(', ');        
    };
}

var yandex = new CarDealer('Яндекс.Авто');

// реализовать метод добавления машин в автосалон. 
// Предусмотреть возможность добавления одной машины, нескольких машин.
yandex
    .add(toyota)
    .add(bmw, audi);

// @TODO: реализовать метод установки цены на машину
/**
 * Установить цену на машину
 * @param {string} car идентификатор машины
 * @param {string} price стоимость
 */
// идентификатор машины составляется следующим образом "производитель модель год"
// стоимость машины может быть задана в двух валютах: йена и евро.
yandex
    .setPrice('BMW X5 2010', '€2000')
    .setPrice('Audi Q5 2012', '€3000')
    .setPrice('Toyota Camry 2012', '¥3000');

// @TODO: реализовать вывод списка автомобилей в продаже, 
// с фильтрацией по стране производителю, используя метод getCountry:
function getCountry() {
    switch (this.manufacturer.toLowerCase()) {
        case 'bmw':
    case 'audi':
            return 'Germany';

        case 'toyota':
            return 'Japan';
    }
}

yandex.list(); //BMW X5 2010, Audi Q5 2012, Toyota Camry 2012
yandex.listByCountry('Germany'); //BMW X5 2010, Audi Q5 2012

// @TODO: бонус! выводить список машин с ценой в рублях.

console.log(yandex.listRubles());