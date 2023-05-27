const refs = {
  form: document.querySelector(`.form`),
  delay: document.querySelector(`input[name="delay"]`),
  step: document.querySelector(`input[name="step"]`),
  amount: document.querySelector(`input[name="amount"]`),
};

refs.form.addEventListener(`submit`, (e) => {
  e.preventDefault;  
  const delay = Number(refs.delay.value);
  const step = Number(refs.step.value);
  const amount = Number(refs.amount.value);

  for (let position = 1; position <= amount; position += 1){
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);    
  })
  
}
