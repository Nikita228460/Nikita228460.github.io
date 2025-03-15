document.getElementById('spin-btn').addEventListener('click', function() {
    // Генерируем случайный угол от 0 до 360 градусов (с эффектом многократного вращения)
    const randomDeg = Math.floor(Math.random() * 360) + 3600; 
    // Получаем элементы
    const roulette = document.querySelector('.roulette');
    const result = document.querySelector('.result');

    // Включаем анимацию вращения
    roulette.style.transition = 'transform 4s ease-out';
    roulette.style.transform = `rotate(${randomDeg}deg)`;



    // Добавляем обработчик завершения анимации
    roulette.addEventListener('transitionend', function() {
        if ((randomDeg - 3600) <= 225 && (randomDeg - 3600) >= 135) {
            result.textContent = "Победа";
        } else {
            result.textContent = "Нужен додеп";
            setTimeout(function() {
                location.reload();
            }, 3000); 
        }
    });

    setTimeout(() => {
        roulette.style.transition = 'none';
    }, 4000);
});
