const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"));

list.forEach(task =>{
    toDoList(task);
});

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    toDoList();
});

function toDoList(task) {
    let newTask = inputEl.value;

    if(task){
        newTask = task.name;
    }


    const liEl = document.createElement("li");

    if(task && task.checked){
        liEl.classList.add("checked");
    }
    liEl.innerText = newTask;
    ulEl.appendChild(liEl);

    inputEl.value = "";

    const checkBtn = document.createElement("div");
    checkBtn.innerHTML = `<img src="./images/check-square-svgrepo-com (1).svg" alt="image" class="icon">`;
    liEl.appendChild(checkBtn);

    const trashBtn = document.createElement("div");
    trashBtn.innerHTML = `<img src="./images/trash-bin-trash-svgrepo-com.svg" alt="image" class="icons">`;
    liEl.appendChild(trashBtn);

    checkBtn.addEventListener("click", ()=>{
        liEl.classList.toggle("checked");
        updateLocalStorage();
    });

    trashBtn.addEventListener("click", ()=>{
        liEl.remove("checked");

        updateLocalStorage();
    });
    updateLocalStorage();
}

function updateLocalStorage(){
    const liEls = document.querySelectorAll("li");

    list = [];

    liEls.forEach(liEl =>{
        list.push({
            name: liEl.innerText,
            checked : liEl.classList.contains("checked")
        })
    })

    localStorage.setItem("list", JSON.stringify(list))
}