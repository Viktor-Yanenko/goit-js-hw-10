import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysFld = document.querySelector('[data-days]');
const hoursFld = document.querySelector('[data-hours]');
const minutesFld = document.querySelector('[data-minutes]');
const secondsFld = document.querySelector('[data-seconds]');

let userSelectedDate;
startBtn.addEventListener('click', handleTimer);
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message: 'Please choose a date in the future',
        messageColor: '#ffffff',
        messageSize: '16px',
        backgroundColor: '#ef4040',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDates[0] - Date.now();
    }
  },
};

flatpickr(inputDate, options)

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

  return { days, hours, minutes, seconds };
}

function handleTimer() {
  startBtn.disabled = true;
  inputDate.disabled = true;

  const timerInterval = setInterval(() => {
    if (userSelectedDate > 1000) {
      userSelectedDate -= 1000;
      const { days, hours, minutes, seconds } = convertMs(userSelectedDate);
      daysFld.textContent = addLeadingZero(days);
      hoursFld.textContent = addLeadingZero(hours);
      minutesFld.textContent = addLeadingZero(minutes);
      secondsFld.textContent = addLeadingZero(seconds);
    } else {
      clearInterval(timerInterval);
      inputDate.disabled = false;
    }
  }, 1000)
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}