export default function timerCountdown() {
  const startBtn = document.querySelector(".pomodoro__controls-start");
  const displayBtns = document.querySelector(".pomodoro__controls-painel");
  const playBtn = document.querySelector(".btnPlay");
  const pauseBtn = document.querySelector(".btnPause");
  const stopBtn = document.querySelector(".btnStop");
  const soundOnBtn = document.querySelector(".btnSoundOn");
  const soundOffBtn = document.querySelector(".btnSoundOff");

  const soundClick = new Audio("../assets/sounds/click.mp3");
  const soundStart = new Audio("../assets/sounds/start.mp3");
  const soundMusic = new Audio("../assets/sounds/lofi.mp3");
  soundMusic.loop = true;

  const timerDisplay = document.querySelector(".pomodoro__timer-display");
  const modeTime = document.querySelectorAll(".pomodoro__mode-title");
  const modePomodoro = document.querySelector(".modePomodoro");
  const modeShort = document.querySelector(".modeShort");
  const modeLong = document.querySelector(".modeLong");

  let tempoDecorrido = 1500;
  let countShort = 1;
  let countLong = 1;
  let timerCount = null;
  let pomodoroOn = true;
  let shortOn = null;
  let longOn = null;

  // functions

  function showTimer() {
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
    tempoDecorrido = 1;
  }

  function countdown() {
    timerCount = setInterval(() => {
      --tempoDecorrido;
      showTimer();

      if (tempoDecorrido == 0) {
        clearInterval(timerCount);
        setTimeout(() => {
          changeDisplayButtons();
          resetDisplay(pauseBtn, playBtn);
        }, 1000);

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
        pomodoroOn = true;
        shortOn = false;
        longOn = false;
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
        pomodoroOn = false;
        shortOn = true;
        longOn = false;
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
        pomodoroOn = false;
        shortOn = false;
        longOn = true;
      }, 1000);
    }
  }

  function resetDisplay(element1, element2) {
    element1.classList.remove("hidden");
    element2.classList.add("hidden");
  }

  function changeDisplayButtons() {
    displayBtns.classList.toggle("hidden");
    startBtn.classList.toggle("hidden");
  }

  function showAndHiddenBtn(element1, element2) {
    element1.classList.toggle("hidden");
    element2.classList.toggle("hidden");
  }

  // eventos

  startBtn.addEventListener("click", () => {
    changeDisplayButtons();
    countdown();
    soundStart.play();
    soundMusic.play();
  });

  playBtn.addEventListener("click", () => {
    showAndHiddenBtn(pauseBtn, playBtn);
    countdown();
    soundClick.play();
  });

  pauseBtn.addEventListener("click", () => {
    showAndHiddenBtn(pauseBtn, playBtn);
    clearInterval(timerCount);
    soundClick.play();
  });

  stopBtn.addEventListener("click", () => {
    soundClick.play();
    clearInterval(timerCount);
   
    if (pomodoroOn) {
      pomodoroTime();
    } else if (shortOn) {
      shortTime();
    } else if (longOn) {
      longTime();
    }
    showTimer();

    soundMusic.currentTime = 0;
    soundMusic.pause();
    
    resetDisplay(pauseBtn, playBtn);
    changeDisplayButtons();
  });

  soundOnBtn.addEventListener("click", () => {
    showAndHiddenBtn(soundOnBtn, soundOffBtn);
    soundMusic.pause();
  });

  soundOffBtn.addEventListener("click", () => {
    showAndHiddenBtn(soundOnBtn, soundOffBtn);
    soundMusic.play();
  });
}
