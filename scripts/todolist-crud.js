export default function todoCrud() {
  const formAddTask = document.querySelector(".todolist__title-create");
  const inputText = document.querySelector(".todolist__title-create-input");
  const tasks = [];

  formAddTask.addEventListener("submit", (event) => {
    event.preventDefault();
    const task = {
      description: inputText.value,
    };

    tasks.push(task)
    localStorage.setItem('todoTask', tasks)
    console.log(tasks);
  });
}
