fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {

    fetch(`http://ip-api.com/json/${data.ip}`)
      .then(response => response.json())
      .then(info => {
        console.log(info);
      })
      .catch(error => console.error('Ошибка при запросе к ip-api:', error));
  })
  .catch(error => console.error('Ошибка при запросе к ipify:', error));

  if ("geolocation" in navigator) {
    // Если поддерживается геолокация
    navigator.geolocation.getCurrentPosition(function(position) {
      // Успешный ответ
      console.log("Широта: " + position.coords.latitude);
      console.log("Долгота: " + position.coords.longitude);
    }, function(error) {
      // Ошибка получения геопозиции
      console.error("Ошибка получения геопозиции: " + error.message);
    });
  } else {
    console.log("Геолокация не поддерживается этим браузером.");
  }
  
