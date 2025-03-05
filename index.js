let resultdiv = document.getElementById("result");
let button = document.getElementById("button");

button.addEventListener("click", () => {
    let currentCount = parseInt(resultdiv.textContent) || 0;
    currentCount++;
    resultdiv.textContent = currentCount;
});
