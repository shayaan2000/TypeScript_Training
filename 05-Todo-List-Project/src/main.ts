// Selecting elements
const navIncomplete = document.querySelector(
  "#nav-incomplete"
) as HTMLLIElement;
const navComplete = document.querySelector("#nav-complete") as HTMLLIElement;
const taskListContainer = document.querySelector(
  "#task-list"
) as HTMLUListElement;
const dateEl = document.querySelector(".date") as HTMLElement;
const numberOfActiveEl = document.querySelector(".num-active") as HTMLElement;
const addTaskForm = document.querySelector(".add-task-form") as HTMLFormElement;
const mainContainer = document.querySelector(
  ".main-container"
) as HTMLDivElement;
const deleteIcons = document.getElementsByClassName(
  "task-delete"
) as HTMLCollection;
const finishIcons = document.getElementsByClassName(
  "task-finish"
) as HTMLCollection;
const revertIcons = document.getElementsByClassName(
  "task-revert"
) as HTMLCollection;

// Date settings
const dateOptions: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  weekday: "long", //or long or narrow
};

interface ITask {
  id: number;
  title: string;
  date: Date;
  completed: boolean;
}

interface ITab {
  id: number;
  title: string;
}

// Data
let listOfTasks: ITask[] = [];
let idCount: number = 0;

// Set predefined tabs, this approach will help in react
const tabs: ITab[] = [
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
const generateTaskMarkup = ({ title, completed, id }: ITask): string => `
  <li class="task" data-id="${id}">
    <div class="task-container">
      <p class="task-title"><i class="icon-${
        completed ? "undo" : "check"
      } icon-large task-${completed ? "revert" : "finish"}"></i>
        <span class="${completed ? "complete" : "incomplete"}">${title}</span>
      </p>
      <i class="icon-trash icon-large task-delete"></i>
    </div>
    <div class="divider"></div>
  </li>
`;

// Use a tab based approach incase you want to add more tabs down the line
const selectTab = (tab: ITab) => {
  [navComplete, navIncomplete].forEach((navItem) =>
    navItem.classList.remove("active")
  );
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
const renderCompletedTasks = (): void => {
  const taskListHTML = listOfTasks
    .filter(({ completed }) => completed)
    .map(generateTaskMarkup)
    .join("");
  taskListContainer.innerHTML = taskListHTML;
};

const renderIncompleteTasks = (): void => {
  const taskListHTML = listOfTasks
    .filter(({ completed }) => !completed)
    .map(generateTaskMarkup)
    .join("");
  taskListContainer.innerHTML = taskListHTML;
};

// attach event listeners on new elements
const attachEventListeners = (): void => {
  for (let i = 0; i < deleteIcons.length; i++) {
    let icon = deleteIcons[i] as HTMLElement;
    icon.addEventListener("click", handleDelete);
  }
  for (let i = 0; i < finishIcons.length; i++) {
    let icon = finishIcons[i] as HTMLElement;
    icon.addEventListener("click", handleChangeInStatus);
  }
  for (let i = 0; i < revertIcons.length; i++) {
    let icon = revertIcons[i] as HTMLElement;
    icon.addEventListener("click", handleChangeInStatus);
  }
};

const handleDelete = (e: Event): void => {
  const target = e.target as HTMLElement;
  const elementToBeRemoved = target.closest(".task") as HTMLElement;

  if (!elementToBeRemoved) return;

  const taskId: number = +elementToBeRemoved.dataset.id!;
  const taskPos: number = listOfTasks.map(({ id }) => id).indexOf(+taskId);

  listOfTasks.splice(taskPos, 1);
  elementToBeRemoved.remove();

  updateActiveTaskHeading();
  persistTasks();
};

// finishing a task
const handleChangeInStatus = (e: Event): void => {
  const target = e.target as HTMLElement;
  const elementToBeShifted = target.closest(".task") as HTMLElement;

  if (!elementToBeShifted) return;
  const taskId = +elementToBeShifted.dataset.id!;
  const taskPos = listOfTasks.map(({ id }) => id).indexOf(+taskId);
  listOfTasks[taskPos].completed = !listOfTasks[taskPos].completed;
  elementToBeShifted.remove();

  updateActiveTaskHeading();
  persistTasks();
};

const handleAddFormSubmit = (e: Event): void => {
  e.preventDefault();
  const taskTitleInput = document.querySelector(
    "#task-title-input"
  ) as HTMLInputElement;
  const taskTitle = taskTitleInput.value;
  taskTitleInput.value = "";
  const newTask: ITask = {
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

const persistTasks = (): void => {
  localStorage.setItem("tasks", JSON.stringify(listOfTasks));
  localStorage.setItem("id-count", idCount.toString());
};

// // // Event Listeners
navIncomplete.addEventListener("click", (e) => selectTab(tabs[0]));
navComplete.addEventListener("click", (e) => selectTab(tabs[1]));
addTaskForm.addEventListener("submit", handleAddFormSubmit);

// setting "x Active Tasks"
const updateActiveTaskHeading = (): void => {
  const incompleteTasks: number = listOfTasks.filter(
    ({ completed }) => !completed
  ).length;
  numberOfActiveEl.textContent = `${incompleteTasks} active tasks`;
};

// initialization
const init = function () {
  // retrieving from local storage
  const storageTasks = localStorage.getItem("tasks");
  listOfTasks = storageTasks ? JSON.parse(storageTasks) : [];

  const storageID = localStorage.getItem("id-count");
  idCount = storageID ? JSON.parse(storageID) : 0;

  // setting data
  dateEl.textContent = new Intl.DateTimeFormat("en-us", dateOptions).format(
    new Date()
  );
  selectTab(tabs[0]);
  updateActiveTaskHeading();
};

init();
