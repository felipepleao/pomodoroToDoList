export default function timerCountdown() {
  const startBtn = document.querySelector(".pomodoro__controls-start");
  const timerDisplay = document.querySelector(".pomodoro__timer-display");
  const modeTime = document.querySelectorAll(".pomodoro__mode-title");
  const modePomodoro = document.querySelector(".modePomodoro");
  const modeShort = document.querySelector(".modeShort");
  const modeLong = document.querySelector(".modeLong");

  let tempoDecorrido = 1500;
  let countShort = 1;
  let countLong = 1;
  let timerCount = null;

  function showTimer(timeMode) {
    const time = new Date(tempoDecorrido * 1000);
    const formatTime = time.toLocaleTimeString("pt-Br", {
      minute: "2-digit",
      second: "2-digit",
    });
    timerDisplay.innerHTML = `${formatTime}`;
  }

  function modeChange(modeSelect) {
    modeTime.forEach((mode) => {
      mode.classList.add("disabled");
    });
    modeSelect.classList.remove("disabled");
  }

  showTimer();

  function pomodoroTime() {
    tempoDecorrido = 1500;
  }

  function shortTime() {
    tempoDecorrido = 300;
  }

  function longTime() {
    tempoDecorrido = 900;
  }

  function countdown() {
    timerCount = setInterval(() => {
      --tempoDecorrido;
      showTimer();

      if (tempoDecorrido == 0) {
        clearInterval(timerCount);
        isPomodoro();
        isShort();
        isLong();
      }
    }, 1000);
  }

  function isPomodoro() {
    if (countShort == 0) {
      setTimeout(() => {
        pomodoroTime();
        modeChange(modePomodoro);
        countLong++;
        countShort++;
        showTimer();
      }, 1000);
    }
  }

  function isShort() {
    if (countShort == 1) {
      setTimeout(() => {
        shortTime();
        modeChange(modeShort);
        countShort = 0;
        showTimer();
      }, 1000);
    }
  }

  function isLong() {
    if (countLong == 3) {
      setTimeout(() => {
        longTime();
        modeChange(modeLong);
        countLong = 0;
        showTimer();
      }, 1000);
    }
  }

  startBtn.addEventListener("click", countdown);
}
