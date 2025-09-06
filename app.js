const list = document.getElementById("task-list");
const taskChecker = document.getElementById("task-checker");
console.log(taskChecker,);
let id_num = -1;
let allTasks = {
  name: "TaskNames",
  progress: {},
};
let newTasks = {};
function addTask() {
  const task = prompt("add task");
  if (task == "") {
    alert("task can not be empty");
  } else {
    id_num += 1;
    allTasks.progress[`task${id_num}`] = task;
    newTasks.taskName = task;

    // list.innerHTML += `<input class='checkBox'id="check${id_num}" type="checkbox"><label id="task-${id_num}" class="task-name">${task}</label><br>`;
    console.log(newTasks, allTasks);
    sendData(5);
  }
}
function sendData(typee) {
  if (Object.keys(newTasks).length == 0 || newTasks.taskName == null) {
    alert("empty data cannot be sent");
    return;
  } else {
    fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(typee == 5 ? newTasks : allTasks),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("message: ", data);
      })
      .catch((err) => console.log(err));
    location.reload();
  }
}
async function getData() {
  let Data;
  let res = await fetch("http://localhost:3000/receive/tasks/names");
  Data = await res.json();
  return Data;
}
getData().then((d) => {
  let keyes = Object.keys(d);
  keyes.forEach((element) => {
    let el1 = document.createElement("label");
    el1.textContent = d[element];
    let el2 = document.createElement("br");
    let el3 = document.createElement("input");
    el3.type = "checkbox";
    list.appendChild(el3);
    list.appendChild(el1);
    list.appendChild(el2);
    console.log(d[element]);
taskCheckerButton(element,d);
  });
});

function taskCheckerButton(element, d) {
  const bt = document.createElement("button");
  bt.id = element
  bt.className = "task-checker-btn"
  bt.textContent = d[element];
  taskChecker.appendChild(bt);
  bt.addEventListener("click",(event)=>{
    bt.classList.toggle("clicked")
    btnID = event.target.id;
  })
}

