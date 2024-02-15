export default function todoCrud() {
  const formAddTask = document.querySelector(".todolist__title-create");
  const ulTodolistTask = document.querySelector(".todolist__paper-task");
  const inputText = document.querySelector(".todolist__title-create-input");
  let tasks = JSON.parse(localStorage.getItem("todoTask")) || [];
  //se a pág ja tiver um dado salvo no array ele irá carrega-lo
  //caso nao tenha ele irá criar um array tasks vazio
  const removeTaskComplete = document.querySelector(
    ".todolist__title-menu-drop-remove-taskComplete"
  );
  const removeAllTasks = document.querySelector(
    ".todolist__title-menu-drop-remove-allTasks"
  );

  function attTasks() {
    localStorage.setItem("todoTask", JSON.stringify(tasks));
  }

  function createTaskElement(task) {
    const li = document.createElement("li");
    li.classList.add("todolist__paper-task-post");

    const input = document.createElement("input");
    input.classList.add("todolist__paper-checked");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", "checkbox");
    input.setAttribute("name", "taskChecked");

    input.addEventListener("change", function (event) {
      const isChecked = event.target.checked;
      if (event.target.checked) {
        li.classList.add("active");
        task.completed = isChecked;

        attTasks();
      } else {
        li.classList.remove("active");
        task.completed = isChecked;
        attTasks();
      }
    });

    if (task.completed) {
      li.classList.add("active");
      input.checked = true;
    } else {
      li.classList.remove("active");
      input.checked = false;
    }

    const paragraph = document.createElement("p");
    paragraph.classList.add("todolist__paper-item-description");
    paragraph.textContent = task.description;

    const editButton = document.createElement("button");
    editButton.classList.add("todolist__paper-button-edit");
    const imageButton = document.createElement("img");
    imageButton.setAttribute("src", "assets/pen.svg");
    editButton.append(imageButton);

    editButton.onclick = () => {
      const newDescription = prompt("Qual é o novo nome da tarefa?");
      if (newDescription) {
        paragraph.textContent = newDescription;
        task.description = newDescription;
        attTasks();
      }
    };

    li.append(input);
    li.append(paragraph);
    li.append(editButton);

    return li;
  }

  formAddTask.addEventListener("submit", (event) => {
    event.preventDefault();
    const task = {
      description: inputText.value,
      completed: false,
    };

    if (task.description) {
      tasks.push(task);
      const elementTask = createTaskElement(task);
      ulTodolistTask.append(elementTask);
      attTasks();
      inputText.value = "";
    }
  });

  tasks.forEach((task) => {
    const elementTask = createTaskElement(task);
    ulTodolistTask.append(elementTask);
  });

  function removeTasks(taskComplete) {
    const seletor = taskComplete
      ? ".todolist__paper-task-post.active"
      : ".todolist__paper-task-post";

    document.querySelectorAll(seletor).forEach((task) => {
      task.remove();
    });
    tasks = taskComplete ? tasks.filter((task) => !task.completed) : [];
    attTasks();
  }

  removeTaskComplete.addEventListener("click", () => {
    removeTasks(true);
  });
  removeAllTasks.addEventListener("click", () => {
    removeTasks(false);
  });

  // removeTaskComplete.addEventListener("click", () => {
  //   const seletor = document.querySelectorAll(
  //     ".todolist__paper-task-post.active"
  //   );
  //   seletor.forEach((task) => {
  //     task.remove();
  //   });
  //   tasks = tasks.filter((task) => !task.completed);
  //   attTasks();
  // });

  // removeAllTasks.addEventListener("click", () => {
  //   const seletor = document.querySelectorAll(".todolist__paper-task-post");
  //   seletor.forEach((task) => {
  //     task.remove();
  //   });
  //   tasks = [];
  //   attTasks();
  // });
}
