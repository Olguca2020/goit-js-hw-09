import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputData: document.getElementById('datetime-picker'),
  startButton: document.querySelector(`button[data-start]`),
  days: document.querySelectorAll('.value[data-hours]'),
  hours: document.querySelectorAll('.value[data-minutes]'),
  minutes: document.querySelectorAll('.value[data-seconds]'),
};
const currentDate = new Date().getTime();
let chooseData;
let ms;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chooseData = selectedDates[0].getTime();
    
    if (chooseData - currentDate < 0) {
      alert('Please choose a date in the future');
      refs.startButton.disabled = true;
    } else {
      refs.startButton.disabled = false;
      refs.startButton.addEventListener(`click`, () => {
          ms = chooseData - currentDate;
          convertMs(ms);         
          
      });        
      function convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Remaining days
        const days = Math.floor(ms / day);
        // Remaining hours
        const hours = Math.floor((ms % day) / hour);
        // Remaining minutes
        const minutes = Math.floor(((ms % day) % hour) / minute);
        // Remaining seconds
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        { days, hours, minutes, seconds };
        }
        
        
    //   setInterval(() => {
    //       refs.days.textContent = convertMs(ms).days,
    //       refs.hours.textContent = convertMs(ms).hours;
    //   }, 1000);
    }
  },
};

flatpickr(refs.inputData, options);
