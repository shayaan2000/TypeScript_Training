"use strict";
// Selecting elements
var navIncomplete = document.querySelector("#nav-incomplete");
var navComplete = document.querySelector("#nav-complete");
var taskListContainer = document.querySelector("#task-list");
var dateEl = document.querySelector(".date");
var numberOfActiveEl = document.querySelector(".num-active");
var addTaskForm = document.querySelector(".add-task-form");
var mainContainer = document.querySelector(".main-container");
var deleteIcons = document.getElementsByClassName("task-delete");
var finishIcons = document.getElementsByClassName("task-finish");
var revertIcons = document.getElementsByClassName("task-revert");
// Date settings
var dateOptions = {
    day: "numeric",
    month: "long",
    weekday: "long", //or long or narrow
};
// Data
var listOfTasks = [];
var idCount = 0;
// Set predefined tabs, this approach will help in react
var tabs = [
    {
        id: 0,
        title: "Complete Tasks",
    },
    {
        id: 1,
        title: "Incomplete Tasks",
    },
];
// Creates the HTML for a given task
var generateTaskMarkup = function (_a) {
    var title = _a.title, completed = _a.completed, id = _a.id;
    return "\n  <li class=\"task\" data-id=\"" + id + "\">\n    <div class=\"task-container\">\n      <p class=\"task-title\"><i class=\"icon-" + (completed ? "undo" : "check") + " icon-large task-" + (completed ? "revert" : "finish") + "\"></i>\n        <span class=\"" + (completed ? "complete" : "incomplete") + "\">" + title + "</span>\n      </p>\n      <i class=\"icon-trash icon-large task-delete\"></i>\n    </div>\n    <div class=\"divider\"></div>\n  </li>\n";
};
// Use a tab based approach incase you want to add more tabs down the line
var selectTab = function (tab) {
    [navComplete, navIncomplete].forEach(function (navItem) {
        return navItem.classList.remove("active");
    });
    switch (tab.id) {
        case 0:
            renderIncompleteTasks();
            navIncomplete.classList.add("active");
            break;
        case 1:
            renderCompletedTasks();
            navComplete.classList.add("active");
            break;
    }
    attachEventListeners();
};
// seperate render functions for each tab ensure clarity
var renderCompletedTasks = function () {
    var taskListHTML = listOfTasks
        .filter(function (_a) {
        var completed = _a.completed;
        return completed;
    })
        .map(generateTaskMarkup)
        .join("");
    taskListContainer.innerHTML = taskListHTML;
};
var renderIncompleteTasks = function () {
    var taskListHTML = listOfTasks
        .filter(function (_a) {
        var completed = _a.completed;
        return !completed;
    })
        .map(generateTaskMarkup)
        .join("");
    taskListContainer.innerHTML = taskListHTML;
};
// attach event listeners on new elements
var attachEventListeners = function () {
    for (var i = 0; i < deleteIcons.length; i++) {
        var icon = deleteIcons[i];
        icon.addEventListener("click", handleDelete);
    }
    for (var i = 0; i < finishIcons.length; i++) {
        var icon = finishIcons[i];
        icon.addEventListener("click", handleChangeInStatus);
    }
    for (var i = 0; i < revertIcons.length; i++) {
        var icon = revertIcons[i];
        icon.addEventListener("click", handleChangeInStatus);
    }
};
var handleDelete = function (e) {
    var target = e.target;
    var elementToBeRemoved = target.closest(".task");
    if (!elementToBeRemoved)
        return;
    var taskId = +elementToBeRemoved.dataset.id;
    var taskPos = listOfTasks.map(function (_a) {
        var id = _a.id;
        return id;
    }).indexOf(+taskId);
    listOfTasks.splice(taskPos, 1);
    elementToBeRemoved.remove();
    updateActiveTaskHeading();
    persistTasks();
};
// finishing a task
var handleChangeInStatus = function (e) {
    var target = e.target;
    var elementToBeShifted = target.closest(".task");
    if (!elementToBeShifted)
        return;
    var taskId = +elementToBeShifted.dataset.id;
    var taskPos = listOfTasks.map(function (_a) {
        var id = _a.id;
        return id;
    }).indexOf(+taskId);
    listOfTasks[taskPos].completed = !listOfTasks[taskPos].completed;
    elementToBeShifted.remove();
    updateActiveTaskHeading();
    persistTasks();
};
var handleAddFormSubmit = function (e) {
    e.preventDefault();
    var taskTitleInput = document.querySelector("#task-title-input");
    var taskTitle = taskTitleInput.value;
    taskTitleInput.value = "";
    var newTask = {
        id: idCount,
        title: taskTitle,
        date: new Date(),
        completed: false,
    };
    idCount++;
    listOfTasks.push(newTask);
    selectTab(tabs[0]);
    updateActiveTaskHeading();
    persistTasks();
};
var persistTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(listOfTasks));
    localStorage.setItem("id-count", idCount.toString());
};
// // // Event Listeners
navIncomplete.addEventListener("click", function (e) { return selectTab(tabs[0]); });
navComplete.addEventListener("click", function (e) { return selectTab(tabs[1]); });
addTaskForm.addEventListener("submit", handleAddFormSubmit);
// setting "x Active Tasks"
var updateActiveTaskHeading = function () {
    var incompleteTasks = listOfTasks.filter(function (_a) {
        var completed = _a.completed;
        return !completed;
    }).length;
    numberOfActiveEl.textContent = incompleteTasks + " active tasks";
};
// initialization
var init = function () {
    // retrieving from local storage
    var storageTasks = localStorage.getItem("tasks");
    listOfTasks = storageTasks ? JSON.parse(storageTasks) : [];
    var storageID = localStorage.getItem("id-count");
    idCount = storageID ? JSON.parse(storageID) : 0;
    // setting data
    dateEl.textContent = new Intl.DateTimeFormat("en-us", dateOptions).format(new Date());
    selectTab(tabs[0]);
    updateActiveTaskHeading();
};
init();
