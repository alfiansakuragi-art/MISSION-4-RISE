const $ = (id) => {
    return (document.getElementById(id));
}

// FUNCTION => $ SHORCUT DOCUMENT.GETELEMENTBYID
const task = $("task");
const desk = $("desk");
const level = $("level");
const author = $("author");
const due = $("due");
const form = $("form");
const deleteAll = $("deleteAll");
const total = $("total");
const currentTask = $("currentTask");
const doneTask = $("doneTask");
const position = $("position");

// CONTAINER ID
const container = $("container");
const completeTask = $("completeTask");

let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
let taskComplete = JSON.parse(localStorage.getItem("taskComplete")) || [];

const switchToggle = () => {
    doneTask.addEventListener("click", () => {
        container.style.display = "none";
        completeTask.style.display = "block";
    })
    
    currentTask.addEventListener("click", () => {
        completeTask.style.display = "none";
        container.style.display = "block";
    })
    total.textContent = `${taskList.length}`
}
const addTask = () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault(); //RESET HTML BEHAVIOR TO REFRESH PAGE

        const newTask = {
            task: task.value,
            desk: desk.value,
            level: level.value,
            author: author.value,
            due: due.value,
            position: position.value,
        };

        taskList.push(newTask);
        localStorage.setItem("taskList", JSON.stringify(taskList));
        total.textContent = `${taskList.length}`
        render();
        renderComplete();
    });
}
const deleteAllTask = () => {
    deleteAll.addEventListener("click", () => {
        const pilihan = prompt("YAKIN MAU HAPUS SEMUA?? KETIK YA UNTUK MELANJUTKAN");
        if (pilihan && pilihan.toUpperCase() === "YA") {
            localStorage.removeItem("taskList");
            localStorage.removeItem("taskComplete");
            taskComplete = [];
            taskList = [];
            render();
            renderComplete();
        } else {
            console.log("gagal");
        }
    })
}
const deleteHistory = () => {
    const clear = document.querySelectorAll(".clear");
    clear.forEach((button) => {
        button.addEventListener("click", (e) => {
            const indexTarget = e.currentTarget.getAttribute("data-index");
            taskComplete.splice(indexTarget, 1);
            localStorage.setItem("taskComplete", JSON.stringify(taskComplete));
            renderComplete();
        })
    })

}
const deleteTask = () => {
    const del = document.querySelectorAll(".delete");
    console.log(del)
    del.forEach((button) => {
        button.addEventListener("click", (e) => {
            const indexTarget = e.currentTarget.getAttribute("data-index");
            taskList.splice(indexTarget, 1);
            localStorage.setItem("taskList", JSON.stringify(taskList));
            total.textContent = `${taskList.length}`
            render();
            renderComplete();
        })
    })
}
const switchTask = () => {
    const done = document.querySelectorAll(".done");
    done.forEach((button) => {
        button.addEventListener("click", (e) => {
            const card = e.currentTarget.closest(".task-card");
            const checkbox = card.querySelector('input[type="checkbox"]');
            const index = Number(e.currentTarget.dataset.index);
            if (checkbox.checked) {
                const taskDone = taskList[index];
                taskList.splice(index, 1);
                taskComplete.push(taskDone);
                localStorage.setItem("taskList", JSON.stringify(taskList));
                localStorage.setItem("taskComplete", JSON.stringify(taskComplete));
                total.textContent = `${taskList.length}`
                render();
                renderComplete();
            } else {
                alert("Centang terlebih dahulu");
            }
        });
    })

}
const renderComplete = () => {
    completeTask.innerHTML = "";
    taskComplete.forEach((item, index) => {
        const completePage = `
            <div class="task-card low task">
                <div class="task-list">
                    <div class="head-card">
                        <h3 style="text-decoration: line-through; font-size: 1.7rem">${item.task}</h3>
                        <div class="level ${item.level}">
                            <p>${item.level}</p>
                        </div>
                    </div>
                    <h2 style="color: red" class="desk" >Telah di selesaikan</h2>
                    <p>tugas dari: ${item.position}</p>
                    <div class="detail">
                        <p><span class="icon"><ion-icon name="person-outline"></ion-icon></span>Author: ${item.author}</p>
                        <p><span class="icon"><ion-icon name="man"></ion-icon></span>Position:${item.position}</p>
                        <p><span class="icon"><ion-icon name="calendar-clear-outline"></ion-icon></span>Due: ${item.due}</p>
                    </div>
                    <div class="action">
                        <button class="clear" data-index="${index}"><span><ion-icon name="trash-outline"></ion-icon></span> Delete history</button>
                    </div>
                </div>
            </div>
        `
        completeTask.innerHTML += completePage;
        deleteHistory();

    })

}
const render = () => {
    container.innerHTML = "";
    taskList.forEach((item, index) => {
        const card = `
            <div class="task-card ${item.level} task">
                <div class="check">
                    <input type="checkbox">
                    <span class="check-icon"><ion-icon name="checkmark-outline"></ion-icon></span>
                </div>
                <div class="task-list">
                    <div class="head-card">
                        <h3>${item.task}</h3>
                        <div class="level ${item.level}">
                            <p>${item.level}</p>
                        </div>
                    </div>
                    <p class="desk" >${item.desk}</p>
                    <div class="detail">
                        <p><span class="icon"><ion-icon name="person-outline"></ion-icon></span>Author: ${item.author}</p>
                        <p><span class="icon"><ion-icon name="man"></ion-icon></span>Position:${item.position}</p>
                        <p><span class="icon"><ion-icon name="calendar-clear-outline"></ion-icon></span>Due:${item.due}</p>
                    </div>
                    <div class="action">
                        <button class="done" data-index="${index}"><span><ion-icon name="checkmark-circle"></ion-icon></span> Task Complete</button>
                        <button class="delete" data-index="${index}"><span><ion-icon name="trash-outline"></ion-icon></span> Delete Task</button>
                    </div>
                </div>
            </div>
        `
        container.innerHTML += card;
        deleteTask();
        switchTask();
    });
}

switchToggle();
addTask();
deleteAllTask();
renderComplete();
render();



