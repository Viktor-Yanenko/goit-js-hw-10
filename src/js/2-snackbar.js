import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
// const inputState = document.querySelector('input[name="state"]');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const delay = inputDelay.value;
    const inputState = form.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (inputState === 'fulfilled') {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay)
    })
    form.reset();

    promise
        .then(value => {
            iziToast.success({
                icon: '',
                position: 'topRight',
                message: value,
            });
        })
        .catch(error => {
            iziToast.error({
                icon: '',
                position: 'topRight',
                message: error,
            })
        });
}

