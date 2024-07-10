let elForm = document.querySelector(".form");
let elList = document.querySelector(".list");

let allCount = document.querySelector(".all-count");
let compCount = document.querySelector(".comp-count");
let uncompCount = document.querySelector(".uncomp-count");

let modalWrapper = document.querySelector(".wrapper");
let elModal = document.querySelector(".modal");

let allBtn = document.querySelector(".all-btn");
let compBtn = document.querySelector(".comp-btn");
let uncompBtn = document.querySelector(".uncomp-btn");

let elChooseInput = document.querySelector(".choose-input");
let elChooseImg = document.querySelector(".choose-img");

let todos = JSON.parse(window.localStorage.getItem("todos")) || [];
let choosenImg = null;

// submit todos
elForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = {
    id: todos.length + 1,
    value: e.target[0].value,
    imgUrl: choosenImg,
    isCompleted: false,
  };
  todos.push(data);
  window.localStorage.setItem("todos", JSON.stringify(todos));
  elChooseImg.src = "./images/choose.png";
  renderTodos(todos, elList);
  e.target.reset();
});
// main function
function renderTodos(arr, list) {
  list.innerHTML = "";
  arr.forEach((item, index) => {
    let elItem = document.createElement("li");
    elItem.className = `flex items-center relative justify-between g-5  ${
      item.isCompleted ? "before: w-[100%]   before: absolute  opacity-30" : ""
    } `;
    elItem.innerHTML = `
         <div>
            <span class="font-bold text-[20px] text-slate-500">${
              index + 1
            }</span>
            <span class="font-bold text-[22px]">${item.value}</span>
            </div>
            <div class="flex items-center mt-3 gap-5">
            <img src=${item.imgUrl} width="90" height="40"/>
            <input onclick={changeCheckbox(${
              item.id
            })} type="checkbox" class="form-checkbox scale-150">
            <button onclick={updateBtnClick(${
              item.id
            })} class="bg-green-500 hover:opacity-50 duration-300 text-white font-semibold p-2.5 rounded-lg">Update</button>
            <button onclick={deleteBtnClick(${
              item.id
            })} class=" bg-red-500 hover:opacity-50 duration-300 text-white font-semibold p-2.5 rounded-lg">Delete</button>
        </div>`;
    list.appendChild(elItem);
  });
  allCount.textContent = todos.length;
  compCount.textContent = todos.filter(
    (item) => item.isCompleted == true
  ).length;
  uncompCount.textContent = todos.filter(
    (item) => item.isCompleted == false
  ).length;
}
renderTodos(todos, elList);
// adding image section
elChooseInput.addEventListener("change", function (e) {
  elChooseImg.setAttribute("src", URL.createObjectURL(e.target.files[0]));
  choosenImg = URL.createObjectURL(e.target.files[0]);
});
// delete btn
function deleteBtnClick(id) {
  const findedIndex = todos.findIndex((item) => item.id == id);
  todos.splice(findedIndex, 1);
  window.localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(todos, elList);
}
// checkbox sectiom
function changeCheckbox(id) {
  const findedObj = todos.find((item) => item.id == id);
  findedObj.isCompleted = !findedObj.isCompleted;
  window.localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(todos, elList);
}
// update section
function updateBtnClick(id) {
  modalWrapper.classList.add("!top-0");
  elModal.classList.add("!scale-100");
  const updateObj = todos.find((item) => item.id == id);
  elModal.innerHTML = `
     <div  class="mt-3 ml-3 mr-3 flex items-center justify-between">
      <input
        type="text"
        value="${updateObj.value}"
        class="py-3 update-value w-[70%]  border-slate-500 border-[1.5px] rounded-lg outline-none focus:shadow-lg text-[18px] focus:shadow-green-500"
        placeholder="Change your activity"
        name="update-todo"
      />
      <button onclick={secondUpdate(${id})}
            class="bg-green-500 w-[20%] p-2.5 font-semibold hover:opacity-50 duration-300 text-white rounded-lg text-[18px]"
          > Update
          </button>
    </div>`;
}
// update in modal
function secondUpdate(id) {
  const updateObj = todos.find((item) => item.id == id);
  let newValue = document.querySelector(".update-value").value;
  updateObj.value = newValue;
  modalWrapper.classList.remove("!top-0");
  elModal.classList.remove("!scale-100");
  window.localStorage.setItem("todos", JSON.stringify(todos));

  renderTodos(todos, elList);
}
// modal wrapper
modalWrapper.addEventListener("click", function (e) {
  if (e.target.id == "wrapper") {
    modalWrapper.classList.remove("!top-0");
    elModal.classList.remove("!scale-100");
  }
});
// buttons all,com,uncomp
allBtn.addEventListener("click", function () {
  renderTodos(todos, elList);
});
compBtn.addEventListener("click", function () {
  const completedList = todos.filter((item) => item.isCompleted == true);
  renderTodos(completedList, elList);
});
uncompBtn.addEventListener("click", function () {
  const uncompletedList = todos.filter((item) => item.isCompleted == false);
  renderTodos(uncompletedList, elList);
});
// finished
