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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
//======Variables=======
console.log("\n=====Variables======");
// varnam:type = value;
var hello = "world"; //hello: world
// Hover to see in vs code
var a = 5; //automatically a:number
// Better approach
var firstName = "Shayaan";
var myFlag = true;
//=======Arrays========
console.log("\n=====Arrays======");
var hobbies = ["Sports", "Cooking"]; // :string[]
var hobbiesStrArr;
for (var _i = 0, hobbies_1 = hobbies; _i < hobbies_1.length; _i++) {
    var hobby = hobbies_1[_i];
    console.log(hobby.toUpperCase()); //ts knows its a string arr
}
var matrix = [[1, 2], [3, 2]];
var matrixNumArr;
//=======Tuples========
console.log("\n=====Tuples======");
var role; //declaring tuple
role = [2, "author"];
console.log(role);
//======Functions=======
console.log("\n=====Function======");
// const <name-function> = (<varname>:<datatype>): <return datatype> => {};
var getFullName = function (fName, lName) {
    return fName + " " + lName;
};
// can only send string args now as specified above
console.log(getFullName(firstName, "Farooq"));
//============INTERFACE===========
console.log("\n=====Interface======");
//objs
var user = {
    name: "Mondstar",
    age: 3
};
// obj of type user
var user2 = {
    name: "Jack",
    age: 5,
    phone: "5",
    getGreeting: function () {
        return "Hello from " + this.name;
    }
};
console.log(user2);
console.log(user2.name);
console.log(user2.getGreeting());
//=======TYPES & UNIONS============
console.log("\n=====Types & Unions======");
// | union operator
var pageName = "1";
// using for null
var errorMessage = null;
var user3 = null; // null while not populated
var myId = "123";
console.log(typeof myId);
var popularTags = ["dragon", "coffee"];
var sumFunction = function (num1, num2, resultConversion) {
    return resultConversion === "as-number" ? num1 + num2 : (num1 + num2).toString();
};
console.log(sumFunction(2, 3, "as-text"));
//=======FUNCTION TYPES============
console.log("\n=====Function Types======");
// declaring a function that takes in 2 numbers and returns a number 
var combineValues;
// defining a function that takes in 2 numbers, and also a callback function and returns a number 
function addAndHandle(a, b, cb) {
    var res = a + b;
    cb(res);
}
//callback function prints the results inside
addAndHandle(2, 3, function (res) { console.log(res); });
//========ANY/VOID/NEVER/UNKNOWN==========
console.log("\n=====Any/Voind/Never/Unknown======");
// Void
var doSomething = function () {
    console.log("do something");
};
// Any
var foo = "Worst type";
foo = 5; //works in vanilla js and with 'any'
console.log(foo);
var x; // implicitly any 
// Never
// never is a function that'll never end
var doSomethign = function () {
    throw "never";
};
// Unknown
var anyVar = 10;
var unknownVar = 10;
var s1 = anyVar; //works
// let s2: string = unknownVar; // error unknown not assignable to string
unknownVar = "hey"; //still can change it
// type assertion
var s3 = unknownVar;
console.log(s3);
console.log(typeof unknownVar);
var pageNum = "1";
var numericPageNum = pageNum;
console.log(typeof pageNum);
//===========WORKING WITH DOM=================
console.log("\n=====Working with dom======");
var someElement = document.querySelector(".foo");
// console.log("Some Element", (someElement as any).value); //NOT the right approach
// correct approach
var someElement2 = document.querySelector(".foo"); // if we know it's an HTML Input
console.log("Some Element", someElement2.value);
// Adding a listener
someElement.addEventListener("click", function (event) {
    var target = event.target; // .value doesnt work without type assertion
    console.log("event", event);
    console.log("event target value", target.value);
});
//=======CLASSES=========
console.log("\n=====Classes======");
var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.unchangeableName = firstName; //this can only be set once
    }
    User.prototype.getFullName = function () {
        return this.firstName + " " + this.lastName;
    };
    // static
    User.maxAge = 50;
    return User;
}());
var userObj = new User("Monster", "Lessons");
console.log(userObj.getFullName());
// inheritance
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Admin.prototype.setEditor = function (editor) {
        this.editor = editor;
    };
    Admin.prototype.getEditor = function () {
        return this.editor;
    };
    return Admin;
}(User));
var admin = new Admin("Shayaan", "Farooq");
console.log(admin.getFullName());
admin.setEditor("Nice");
console.log(admin.getEditor());
//====GENERICSS====
var addId = function (obj) {
    var id = Math.random().toString(16); //generates random id
    // adds id in obj
    return __assign(__assign({}, obj), { id: id });
};
var user4 = {
    name: "Jonas",
    age: 22,
    getGreeting: function () {
        return "hello";
    }
};
// *hover on addId*
var result = addId(user4);
console.log(result);
// we specified a type inside the <>
var user5 = {
    name: "Jack",
    data: {
        meta: "foo"
    },
    meta: "foo"
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
var Status;
(function (Status) {
    Status[Status["NotStarted"] = 0] = "NotStarted";
    Status[Status["InProgress"] = 1] = "InProgress";
    Status[Status["Done"] = 2] = "Done";
})(Status || (Status = {}));
var StatusButWithStrings;
(function (StatusButWithStrings) {
    StatusButWithStrings["NotStarted"] = "Task not started";
    StatusButWithStrings["InProgress"] = "Task started";
    StatusButWithStrings["Done"] = "Task completed";
})(StatusButWithStrings || (StatusButWithStrings = {}));
var taskOneStatus = Status.NotStarted;
taskOneStatus = Status.InProgress;
taskOneStatus = Status.Done;
console.log(taskOneStatus); //2
console.log(StatusButWithStrings.Done);
