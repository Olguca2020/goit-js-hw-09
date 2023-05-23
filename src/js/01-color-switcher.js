const refs = {
  buttonStart: document.querySelector(`button[data-start]`),
    buttonStop: document.querySelector(`button[data-stop]`),
    body: document.querySelector(`body`),
};
let setIntervalId = null;
const defaultInterval = 1000;
refs.buttonStart.addEventListener(`click`, () => {
    setIntervalId = setInterval(changColor, defaultInterval);
    refs.buttonStart.disabled = true;
    refs.buttonStop.disabled = false;
});
function changColor() { refs.body.style.backgroundColor = getRandomHexColor() };
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
refs.buttonStop.addEventListener(`click`, () => {
    clearInterval(setIntervalId);
    refs.buttonStart.disabled = false;
    refs.buttonStop.disabled = true;
})

