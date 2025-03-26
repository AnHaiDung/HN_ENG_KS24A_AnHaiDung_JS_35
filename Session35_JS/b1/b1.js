const formElement = document.querySelector("#form"); 
const contentInputElement = document.querySelector("#content");
const taskContainer = document.querySelector("#taskList");
const btnSubmit = document.querySelector("#btnSubmit");
const taskLisstLocal = JSON.parse(localStorage.getItem("tasks")) || [];

let typeFrom = "add";
let idEdit = null;

formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    const contentValue = contentInputElement.value.trim();
    
    if (!contentValue) {
        alert("Nhập thông tin");
        return;
    }

    if (typeFrom === "add") {
        const task = {
            id: Math.ceil(Math.random() * 100000),
            content: contentValue,
        };
    
        taskLisstLocal.push(task);
    
        localStorage.setItem("tasks", JSON.stringify(taskLisstLocal));
    
    } else {
        taskLisstLocal[idEdit].content = contentInputElement.value;
        localStorage.setItem("tasks", JSON.stringify(taskLisstLocal));

        typeFrom = "add";
        btnSubmit.textContent = "Thêm";
        idEdit = null;
    }

    handleResetForm();
    renderTask();
});

function renderTask() {
    const taskHtmls = taskLisstLocal.map((task, index) => {
        return `
        <li>
            ${task.content}
            <div class = "btnContent">
            <button onclick="handleEdit(${index})">Sửa</button>
            <button onclick="handleDelete(${index})">Xóa</button>
            </div>
        </li>
        `;
    });

    taskContainer.innerHTML = taskHtmls.join("");
}

function handleEdit(index) {
    typeFrom = "edit";
    btnSubmit.textContent = "Save";
    idEdit = index;
    contentInputElement.value = taskLisstLocal[index].content;
}

function handleResetForm() {
    contentInputElement.value = "";
}

function handleDelete(index) {
    const confirmDelete = confirm("Bạn có muốn xóa công việc này?");
    if (confirmDelete) {
        taskLisstLocal.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(taskLisstLocal));
        renderTask();
    }
}

renderTask();
