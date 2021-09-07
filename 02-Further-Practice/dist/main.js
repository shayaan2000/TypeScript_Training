var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function map(arr, func) {
    return arr.map(func);
}
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
var parsed = map(["1", "2", "3"], function (n) { return parseInt(n); });
console.log(parsed);
function toHex() {
    return this.toString(16);
}
function numberToString(n) {
    return toHex.apply(n);
}
var x = numberToString(5);
//=====Narrowing=====
// basic
var getSquare = function (num) {
    if (typeof num === "number") {
        return Math.pow(num, 2);
    }
    return "" + Math.pow(parseInt(num), 2);
};
console.log("As string, ", typeof getSquare("2"), getSquare("2"));
console.log("As number, ", typeof getSquare(4), getSquare(4));
// truthiness
var isSomeoneHere = function (numPeople) {
    if (numPeople) {
        return "There are " + numPeople + " here";
    }
    return "There's nobody here";
};
console.log(isSomeoneHere(3));
console.log(isSomeoneHere(0));
// equality narrowing
var equalityNarrow = function (x, y) {
    if (x === y) {
        // means both are string
        return "x and y are stirngs and equal: " + x.toUpperCase();
    }
    return "not equal";
};
console.log(equalityNarrow("Hello", "Hello"));
function move(vehical) {
    if ("drive" in vehical) {
        return vehical.drive();
    }
    return vehical.ride();
}
var myCar = {
    drive: function () {
        return "Driving car";
    }
};
var myBike = {
    ride: function () {
        return "Riding bike";
    }
};
console.log(move(myCar));
console.log(move(myBike));
// instance of narrowing
function logValue(x) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    }
    else {
        console.log(x.toUpperCase());
    }
}
logValue(new Date());
logValue("monday morning");
// assignment
var someVariable = Math.random() > 0.5 ? "twenty one" : 21; // infers string | number
someVariable = 23;
console.log(someVariable);
someVariable = "john mayer is og";
console.log(someVariable.toUpperCase());
// Type predicates
var isCar = function (vehical) {
    return vehical.drive !== undefined;
};
console.log(isCar(myCar));
console.log(isCar(myBike));
var getArea = function (shape) {
    if (shape.kind === "circle") {
        return Math.pow(shape.radius, 2) * Math.PI;
    }
    return Math.pow(shape.sideLength, 2);
};
var myCircle = { kind: "circle", radius: 5 };
console.log(getArea(myCircle));
var Person = /** @class */ (function () {
    function Person(fname, lname, dob) {
        this.firstName = fname;
        this.lastName = lname;
        this.dateOfBirth = dob;
        Person.numberOfPeople += 1;
    }
    // from Running interface
    Person.prototype.run = function () {
        console.log("Running!");
    };
    Person.prototype.jump = function () {
        console.log("Jumping like a normal human");
    };
    Person.prototype.getFulname = function () {
        return this.firstName + " " + this.lastName;
    };
    // static mehtod
    Person.getNumberOfPeople = function () {
        return Person.numberOfPeople;
    };
    // static property
    Person.numberOfPeople = 0;
    return Person;
}());
var FootballPlayer = /** @class */ (function (_super) {
    __extends(FootballPlayer, _super);
    function FootballPlayer(fname, lname, dob, kit, pos) {
        var _this = _super.call(this, fname, lname, dob) || this;
        _this.kitNumber = kit;
        _this.position = pos;
        return _this;
    }
    FootballPlayer.prototype.displayPlayer = function () {
        console.log(this.getFulname() + ", " + this.dateOfBirth + ", " + this.position);
    };
    //overriding
    FootballPlayer.prototype.jump = function () {
        console.log("Jumping higher than the average person");
    };
    return FootballPlayer;
}(Person));
var ronaldo = new FootballPlayer("Cristiano", "Ronaldo", new Date(1986, 1, 5), 7, "forward");
ronaldo.displayPlayer(); // method in parent
ronaldo.run(); // implements Running interface
ronaldo.jump(); // overridden called
console.log(Person.getNumberOfPeople());
//------Generic Classes--------
var Box = /** @class */ (function () {
    function Box(item, numItem) {
        this.numOfItems = numItem;
        this.item = item;
        console.log("Item: ", item, "Number of items: ", numItem);
    }
    Box.prototype.getBoxContents = function () {
        return "Box has " + this.numOfItems + " items";
    };
    return Box;
}());
var myApple = { color: "red", origin: "baltistan" };
var myOrange = { origin: "swat" };
var boxOfApples = new Box(myApple, 5);
console.log(boxOfApples.getBoxContents());
var boxOfOranges = new Box(myOrange, 12);
console.log(boxOfOranges.getBoxContents());
