export default function todoCrud() {
  const formAddTask = document.querySelector(".todolist__title-create");
  const ulTodolistTask = document.querySelector(".todolist__paper-task");
  const inputText = document.querySelector(".todolist__title-create-input");
  const tasks = JSON.parse(localStorage.getItem("todoTask")) || [];
  //se a pág ja tiver um dado salvo no array ele irá carrega-lo
  //caso nao tenha ele irá criar um array tasks vazio

  function createTaskElement(task) {
    const li = document.createElement("li");
    li.classList.add("todolist__paper-task-post");

    const input = document.createElement("input");
    input.classList.add("todolist__paper-checked");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", "checkbox");
    input.setAttribute("name", "taskChecked");

    const paragraph = document.createElement("p");
    paragraph.classList.add("todolist__paper-item-description");
    paragraph.textContent = task.description;

    const editButton = document.createElement("button");
    editButton.classList.add("todolist__paper-button-edit");
    const imageButton = document.createElement("img");
    imageButton.setAttribute("src", "assets/pen.svg");
    editButton.append(imageButton);

    li.append(input);
    li.append(paragraph);
    li.append(editButton);

    return li;
  }

  formAddTask.addEventListener("submit", (event) => {
    event.preventDefault();
    const task = {
      description: inputText.value,
    };

    tasks.push(task);
    const elementTask = createTaskElement(task);
    ulTodolistTask.append(elementTask);
    localStorage.setItem("todoTask", JSON.stringify(tasks));
    inputText.value = ''
    console.log(tasks);
  });

  tasks.forEach((task) => {
    const elementTask = createTaskElement(task);
    ulTodolistTask.append(elementTask);
  });
}
