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


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date().getTime();
    chooseData = selectedDates[0].getTime();
    if (chooseData - currentDate < 0) {
      alert('Please choose a date in the future');
      refs.startButton.disabled = true;
    } else {
      refs.startButton.disabled = false;
      refs.startButton.addEventListener(`click`, onStartButtonClick)
    };
      function onStartButtonClick() {
        ms = chooseData - currentDate;
        convertMs(ms);
        const intervalId = setInterval(updateTimer, 1000);
      }
      function updateTimer() {
        refs.days.textContent = convertMs(ms).days;
        refs.hours.textContent = String(convertMs(ms).hours).padStart(2, 0);
        refs.minutes.textContent = String(convertMs(ms).minutes).padStart(2, 0);
        refs.seconds.textContent = String(convertMs(ms).seconds).padStart(2, 0);
      }
    
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
  },
};

flatpickr(refs.inputData, options);
