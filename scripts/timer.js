export default function timerCountdown() {
  const startBtn = document.querySelector(".pomodoro__controls-start");
  const timerDisplay = document.querySelector(".pomodoro__timer-display");
  let tempoDecorrido = 5;
  let count = 0;
  let timerCount = null;

  function showTimer() {
    const time = new Date(tempoDecorrido * 1000);
    const formatTime = time.toLocaleTimeString("pt-Br", {
      minute: "2-digit",
      second: "2-digit",
    });
    timerDisplay.innerHTML = `${formatTime}`;
  }

  showTimer();

  function countdown() {
    timerCount = setInterval(() => {
      --tempoDecorrido;
      console.log(tempoDecorrido);
      showTimer();

      if (tempoDecorrido == 0) {
        clearInterval(timerCount);

        setTimeout(() => {
          tempoDecorrido = 300;
          showTimer();
        }, 1000);
        count++;
      }
      console.log(count);
    }, 1000);
  }



  startBtn.addEventListener("click", countdown);
}
