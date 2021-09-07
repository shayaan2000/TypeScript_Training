//=====Narrowing=====
// basic
const getSquare = (num: string | number): string | number => {
  if (typeof num === "number") {
    return num ** 2;
  }

  return `${parseInt(num) ** 2}`;
};

console.log("As string, ", typeof getSquare("2"), getSquare("2"));
console.log("As number, ", typeof getSquare(4), getSquare(4));

// truthiness
const isSomeoneHere = (numPeople: number): string => {
  if (numPeople) {
    return `There are ${numPeople} here`;
  }
  return `There's nobody here`;
};

console.log(isSomeoneHere(3));
console.log(isSomeoneHere(0));

// equality narrowing
const equalityNarrow = (x: string | boolean, y: string | number): string => {
  if (x === y) {
    // means both are string
    return `x and y are stirngs and equal: ${x.toUpperCase()}`;
  }

  return "not equal";
};

console.log(equalityNarrow("Hello", "Hello"));

// in operator narrowing
type Car = { drive: () => void };
type Bike = { ride: () => void };

function move(vehical: Car | Bike) {
  if ("drive" in vehical) {
    return vehical.drive();
  }

  return vehical.ride();
}

let myCar: Car = {
  drive() {
    return "Driving car";
  },
};
let myBike: Bike = {
  ride() {
    return "Riding bike";
  },
};

console.log(move(myCar));
console.log(move(myBike));

// instance of narrowing
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}

logValue(new Date());
logValue("monday morning");

// assignment
let someVariable = Math.random() > 0.5 ? "twenty one" : 21; // infers string | number
someVariable = 23;
console.log(someVariable);
someVariable = "john mayer is og";
console.log(someVariable.toUpperCase());

// Type predicates
const isCar = (vehical: Car | Bike): vehical is Car => {
  return (vehical as Car).drive !== undefined;
};

console.log(isCar(myCar));
console.log(isCar(myBike));

// discriminating unions
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

const getArea = (shape: Shape): number => {
  if (shape.kind === "circle") {
    return shape.radius ** 2 * Math.PI;
  }
  return shape.sideLength ** 2;
};

let myCircle: Shape = { kind: "circle", radius: 5 };
console.log(getArea(myCircle));

//=======Classes=========

interface Running {
  run(): void;
}

class Person implements Running {
  // static property
  private static numberOfPeople: number = 0;

  // protected so child class can also access
  protected firstName: string;
  protected lastName: string;
  protected dateOfBirth: Date;

  constructor(fname: string, lname: string, dob: Date) {
    this.firstName = fname;
    this.lastName = lname;
    this.dateOfBirth = dob;
    Person.numberOfPeople += 1;
  }

  // from Running interface
  run(): void {
    console.log("Running!");
  }

  jump(): void {
    console.log("Jumping like a normal human");
  }

  getFulname(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // static mehtod
  static getNumberOfPeople(): number {
    return Person.numberOfPeople;
  }
}

class FootballPlayer extends Person {
  private kitNumber: number;
  private position: string;
  constructor(
    fname: string,
    lname: string,
    dob: Date,
    kit: number,
    pos: string
  ) {
    super(fname, lname, dob);
    this.kitNumber = kit;
    this.position = pos;
  }

  displayPlayer(): void {
    console.log(`${this.getFulname()}, ${this.dateOfBirth}, ${this.position}`);
  }

  //overriding
  jump() {
    console.log("Jumping higher than the average person");
  }
}

const ronaldo = new FootballPlayer(
  "Cristiano",
  "Ronaldo",
  new Date(1986, 1, 5),
  7,
  "forward"
);
ronaldo.displayPlayer(); // method in parent
ronaldo.run(); // implements Running interface
ronaldo.jump(); // overridden called

console.log(Person.getNumberOfPeople());

//------Generic Classes--------

class Box<T> {
  private numOfItems: number;
  public item: T;

  constructor(item: T, numItem: number) {
    this.numOfItems = numItem;
    this.item = item;
    console.log("Item: ", item, "Number of items: ", numItem);
  }

  getBoxContents(): string {
    return `Box has ${this.numOfItems} items`;
  }
}

interface Apple {
  color: string;
  origin: string;
}
interface Orange {
  origin: string;
}

let myApple: Apple = { color: "red", origin: "baltistan" };
let myOrange: Orange = { origin: "swat" };
let boxOfApples = new Box<Apple>(myApple, 5);
console.log(boxOfApples.getBoxContents());

let boxOfOranges = new Box<Orange>(myOrange, 12);
console.log(boxOfOranges.getBoxContents());

//=======Index Signature===========
// index signature
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = ["hello", "true", "yes", "okay"];
const secondItem = myArray[2];
console.log(secondItem);

//===Generic Function===
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
console.log(parsed);

function toHex(this: Number) {
  return this.toString(16);
}

function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}

let x = numberToString(5);
