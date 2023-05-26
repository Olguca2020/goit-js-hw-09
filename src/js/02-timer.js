import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputData: document.getElementById('datetime-picker'),
  startButton: document.querySelector(`button[data-start]`),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};

let chooseData;
let ms;
let intervalId;
const currentDate = new Date().getTime();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {    
    chooseData = selectedDates[0].getTime();
    if (chooseData - currentDate <= 0) {
      alert('Please choose a date in the future');
      refs.startButton.disabled = true;
    } else {
      refs.startButton.disabled = false;
      refs.startButton.addEventListener(`click`, onStartButtonClick);
    }
  },
};
function onStartButtonClick() {
  ms = chooseData - currentDate;
  convertMs(ms);
  const intervalId = setInterval(updateTimer, 1000);
  if (ms <= 0) {
    clearInterval(intervalId);
  };
};
function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
function updateTimer() {
  const { days, hours, minutes, seconds } = convertMs(ms);
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
  
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr(refs.inputData, options);

