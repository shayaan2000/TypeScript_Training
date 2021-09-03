//======Variables=======
console.log("\n=====Variables======");
// varnam:type = value;
const hello = "world"; //hello: world

// Hover to see in vs code
let a = 5; //automatically a:number

// Better approach
let firstName: string = "Shayaan";
let myFlag: boolean= true;


//=======Arrays========
console.log("\n=====Arrays======");
const hobbies=["Sports", "Cooking"] // :string[]
let hobbiesStrArr: string[];

for(const hobby of hobbies){
  console.log(hobby.toUpperCase()); //ts knows its a string arr
}

const matrix= [[1,2],[3,2]]
let matrixNumArr:number[][];

//=======Tuples========
console.log("\n=====Tuples======");

let role: [number, string] //declaring tuple
role= [2, "author"];
console.log(role);
//======Functions=======
console.log("\n=====Function======");
// const <name-function> = (<varname>:<datatype>): <return datatype> => {};
const getFullName = (fName: string, lName: string): string => {
  return `${fName} ${lName}`;
};

// can only send string args now as specified above
console.log(getFullName(firstName, "Farooq"));

//============INTERFACE===========
console.log("\n=====Interface======");
//objs
const user: { name: string; age: number } = {
  name: "Mondstar",
  age: 3,
};

/* 
// Error, age is declared
const user2: {name:string; age:number}= {
    name: 'Mondstar',
} */

// interface
interface UserInterface {
  name: string;
  age: number;
  phone?: string;

  //function():return type
  getGreeting(): string;
}

// obj of type user
const user2: UserInterface = {
  name: "Jack",
  age: 5,
  phone: "5",
  getGreeting() {
    return "Hello from " + this.name;
  },
};

console.log(user2);
console.log(user2.name);
console.log(user2.getGreeting());

//=======TYPES & UNIONS============
console.log("\n=====Types & Unions======");
// | union operator
let pageName: string | number = "1";

// using for null
let errorMessage: string | null = null;

let user3: UserInterface | null = null; // null while not populated

// type aliases
type ID = string; // both can be used just the same now
let myId = "123";
console.log(typeof myId);

type PopularTag = string;
const popularTags: PopularTag[] = ["dragon", "coffee"];

// combining type alias with union so we dont have to write | null everywhere
type MaybePopularTag = PopularTag | null;

// can return string or number based on third arg input
// the third argument can only accept const "as-text" or "as-number"
type Result = "as-number" | "as-text"
const sumFunction = (num1:number, num2:number, resultConversion:Result): (string | number) =>{  
  return resultConversion === "as-number" ? num1+num2 : (num1+num2).toString();
}
console.log(sumFunction(2,3, "as-text"));


//=======FUNCTION TYPES============
console.log("\n=====Function Types======");

// declaring a function that takes in 2 numbers and returns a number 
let combineValues: (a:number, b:number) => number

// defining a function that takes in 2 numbers, and also a callback function and returns a number 
function addAndHandle(a:number, b:number, cb:(n1:number)=>void):void{
  const res= a+b;
  cb(res);
}

//callback function prints the results inside
addAndHandle(2,3, (res)=>{console.log(res);})

//========ANY/VOID/NEVER/UNKNOWN==========
console.log("\n=====Any/Voind/Never/Unknown======");
// Void
const doSomething = (): void => {
  console.log("do something");
};

// Any
let foo: any = "Worst type";
foo = 5; //works in vanilla js and with 'any'
console.log(foo);

let x; // implicitly any 

// Never
// never is a function that'll never end
const doSomethign = (): never => {
  throw "never";
};

// Unknown
let anyVar: any = 10;
let unknownVar: unknown = 10;

let s1: string = anyVar; //works
// let s2: string = unknownVar; // error unknown not assignable to string
unknownVar = "hey"; //still can change it

// type assertion
let s3: string = unknownVar as string;
console.log(s3);
console.log(typeof unknownVar);
let pageNum: string = "1";
let numericPageNum: number = pageNum as unknown as number;
console.log(typeof pageNum);

//===========WORKING WITH DOM=================
console.log("\n=====Working with dom======");
const someElement = document.querySelector(".foo");
// console.log("Some Element", (someElement as any).value); //NOT the right approach

// correct approach
const someElement2 = document.querySelector(".foo") as HTMLInputElement; // if we know it's an HTML Input
console.log("Some Element", someElement2.value);

// Adding a listener
someElement.addEventListener("click", (event) => {
  const target = event.target as HTMLInputElement; // .value doesnt work without type assertion
  console.log("event", event);
  console.log("event target value", target.value);
});


//=======CLASSES=========
console.log("\n=====Classes======");
interface IUser {
  //another naming convention: IUser
  getFullName(): string;
  getSmart?(): string;
}

class User implements IUser {
  private firstName: string;
  private lastName: string;

  //read only
  readonly unchangeableName: string; //good for creating constants

  // static
  static readonly maxAge = 50;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;

    this.unchangeableName = firstName; //this can only be set once
  }

  getFullName(): string {
    return this.firstName + " " + this.lastName;
  }
}

const userObj = new User("Monster", "Lessons");
console.log(userObj.getFullName());

// inheritance
class Admin extends User {
  private editor: string;

  setEditor(editor: string): void {
    this.editor = editor;
  }

  getEditor(): string {
    return this.editor;
  }
}

const admin = new Admin("Shayaan", "Farooq");
console.log(admin.getFullName());
admin.setEditor("Nice");
console.log(admin.getEditor());

//====GENERICSS====
const addId = <T extends object>(obj: T) => {
  const id = Math.random().toString(16); //generates random id

  // adds id in obj
  return {
    ...obj,
    id,
  };
};

const user4: UserInterface = {
  name: "Jonas",
  age: 22,
  getGreeting() {
    return "hello";
  },
};

// *hover on addId*
const result = addId<UserInterface>(user4);
console.log(result);
// addId<string>("Hey"); //gives error as T extends object

// Generics in Interface
interface UserInterface2<T, V> {
  name: string;
  data: T;
  meta: V;
}

// we specified a type inside the <>
const user5: UserInterface2<{ meta: string }, string> = {
  name: "Jack",
  data: {
    meta: "foo",
  },
  meta: "foo",
};


//======ENUMERABLES=======
console.log("\n=====Enums======");
/* const statuses = {
    notStarted:0,
    inProgress: 1,
    done: 2,
}
console.log(statuses.inProgress); */

// with enum
enum Status{
    NotStarted, //0
    InProgress, //1
    Done, //2
}

enum StatusButWithStrings{
  NotStarted= "Task not started", 
  InProgress= "Task started", 
  Done="Task completed",  
}

let taskOneStatus:Status= Status.NotStarted;
taskOneStatus= Status.InProgress;
taskOneStatus= Status.Done;
console.log(taskOneStatus); //2
console.log(StatusButWithStrings.Done);