import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const button = document.querySelector("[data-start]");
const daysDate = document.querySelector('[data-days]');
const hoursDate = document.querySelector('[data-hours]');
const minutesDate = document.querySelector('[data-minutes]');
const secondsDate = document.querySelector('[data-seconds]');

let countInterval;

// Selectarea datei
const datePicker = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] > new Date()) {
      button.disabled = false;
    } else {
      window.alert("Please choose a date in the future");
      button.disabled = true;
    }
  },
});

// Numărătoarea inversă
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

function updateCountdown(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysDate.innerText = addLeadingZero(days);
  hoursDate.innerText = addLeadingZero(hours);
  minutesDate.innerText = addLeadingZero(minutes);
  secondsDate.innerText = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

button.addEventListener('click', () => {
  const endDate = datePicker.selectedDates[0].getTime();
  let interval;

  function update() {
    const currentDate = new Date().getTime();
    const difference = endDate - currentDate;

    if (difference <= 0) {
      clearInterval(interval);
      updateCountdown(0);
      window.alert('Countdown has ended!');
    } else {
      updateCountdown(difference);
    }
  }

  update(); // Call once to update immediately

  interval = setInterval(update, 1000); // Update every second
});
