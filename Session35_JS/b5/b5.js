
const tbody = document.querySelector("#tbody");
const btnSubmit = document.querySelector("#btn-submit");
const btnClose = document.querySelector("#btn-close");
const inputCode = document.querySelector("#inputCode");
const inputName = document.querySelector("#inputName");
const errorCode = document.querySelector("#errorCode");
const errorName = document.querySelector("#errorName");
const category = JSON.parse(localStorage.getItem("categorys")) || [];

function render() {
    tbody.innerHTML = "";
    category.forEach((item,index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${item.code}</td>
          <td>${item.name}</td>
          <td>${item.status === 1 ? "Đang hoạt động" : "Ngừng hoạt động"}</td>
          <td><button class="btn-delete" data-index="${index}"><ion-icon name="trash-outline"></ion-icon></button><button class="btn-edit" data-index="${index}"><ion-icon name="pencil-outline"></ion-icon></button></td>
        `;
        tbody.appendChild(tr);
    });
}

btnSubmit.addEventListener('click',function () {
  event.preventDefault();
    if (!inputCode.value){
      inputCode.classList.add('input-error');
      errorCode.style.display = "block";
      return;
    } 
    if (!inputName.value){
      inputName.classList.add('input-error');
      errorName.style.display = "block";
      return;
    }
    if (inputCode.value){
      inputCode.classList.remove('input-error');
      errorCode.style.display = "none";
    }
    if (inputName.value){
      inputName.classList.remove('input-error');
      errorName.style.display = "none";
    }
    const status = document.querySelector('input[name="flexRadioDefault"]:checked').value;
    const newCategory = {
      code: inputCode.value,
      name: inputName.value,
      status: parseInt(status)
    };
    category.push(newCategory);
    localStorage.setItem('categorys',JSON.stringify(category));
    render();
    inputCode.value = "";
    inputName.value = "";
});

btnClose.addEventListener('click',function () {
  inputCode.value = "";
  inputName.value = "";
  inputCode.classList.remove('input-error');
  inputName.classList.remove('input-error');
  errorCode.style.display = "none";
  errorName.style.display = "none";
});