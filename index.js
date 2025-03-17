// Получение IP-адреса через ipify API
fetch('https://api.ipify.org?format=json')
.then(response => response.json())
.then(data => {
    document.getElementById('ip').textContent = data.ip;

    // Дополнительная информация через ip-api
    fetch(`http://ip-api.com/json/${data.ip}`)
        .then(response => response.json())
        .then(locationData => {
            document.getElementById('location').textContent = `${locationData.city}, ${locationData.country}`;
        })
        .catch(error => console.error('Ошибка получения информации о местоположении:', error));
})
.catch(error => console.error('Ошибка получения IP-адреса:', error));

// Информация о браузере и устройстве
document.getElementById('browser').textContent = navigator.userAgent;
document.getElementById('device').textContent = navigator.platform;

// Геолокация (широта и долгота)
if ("geolocation" in navigator) {
navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    document.getElementById('geo').textContent = `${latitude}, ${longitude}`;
}, error => {
    console.error('Ошибка геолокации:', error);
});
} else {
console.log("Геолокация не поддерживается этим браузером.");
}