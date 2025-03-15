document.getElementById('spin-btn').addEventListener('click', function() {
    // Генерируем случайный угол от 0 до 360 градусов (с эффектом многократного вращения)
    const randomDeg = Math.floor(Math.random() * 360) + 3600; 
    // Получаем элементы
    const roulette = document.querySelector('.roulette');

    // Включаем анимацию вращения
    roulette.style.transition = 'transform 4s ease-out';
    roulette.style.transform = `rotate(${randomDeg}deg)`;

    console.log(randomDeg);

    // Добавляем обработчик завершения анимации
    roulette.addEventListener('transitionend', function() {
        if ((randomDeg - 3600) <= 225 && (randomDeg - 3600) >= 135) {
            alert("Победа");
        } else {
            alert("Нужен додеп");
        }
    });

    setTimeout(() => {
        roulette.style.transition = 'none';
    }, 4000);
});
