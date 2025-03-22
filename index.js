async function getUserInfo() {
  let userInfo = {
    ip: null,
    ipLocation: null,
    geoLocation: null,
    browserInfo: {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      online: navigator.onLine,
      screen: {
        width: screen.width,
        height: screen.height,
      },
    },
  };

  try {
    // Получаем IP
    let ipResponse = await fetch('https://api.ipify.org?format=json');
    let ipData = await ipResponse.json();
    userInfo.ip = ipData.ip;

    // Получаем геолокацию по IP
    let ipInfoResponse = await fetch(`http://ip-api.com/json/${userInfo.ip}`);
    let ipInfoData = await ipInfoResponse.json();
    userInfo.ipLocation = ipInfoData;
  } catch (error) {
    console.error('Ошибка при получении IP/геолокации:', error);
  }

  // Получаем геолокацию через браузер
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userInfo.geoLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };
        printUserInfo(userInfo);
      },
      (error) => {
        console.error("Ошибка получения геолокации:", error.message);
        printUserInfo(userInfo);
      }
    );
  } else {
    console.log("Геолокация не поддерживается этим браузером.");
    printUserInfo(userInfo);
  }
}

function printUserInfo(userInfo) {
  let output = `🖥️ **Информация о пользователе**\n`;

  output += `\n🌐 **IP-адрес (ipify API)**\n`;
  output += `IP: ${userInfo.ip || "Не удалось получить"}\n`;

  if (userInfo.ipLocation) {
    output += `\n📍 **Геолокация по IP (ip-api API)**\n`;
    output += `Страна: ${userInfo.ipLocation.country || "Неизвестно"}\n`;
    output += `Город: ${userInfo.ipLocation.city || "Неизвестно"}\n`;
    output += `Провайдер: ${userInfo.ipLocation.isp || "Неизвестно"}\n`;
    output += `Широта: ${userInfo.ipLocation.lat || "Неизвестно"}\n`;
    output += `Долгота: ${userInfo.ipLocation.lon || "Неизвестно"}\n`;
  } else {
    output += `\n📍 Геолокация по IP: Не удалось получить\n`;
  }

  if (userInfo.geoLocation) {
    output += `\n📡 **Геолокация браузера (navigator.geolocation)**\n`;
    output += `Широта: ${userInfo.geoLocation.latitude}\n`;
    output += `Долгота: ${userInfo.geoLocation.longitude}\n`;
    output += `Точность: ±${userInfo.geoLocation.accuracy} м\n`;
  } else {
    output += `\n📡 Геолокация браузера: Не удалось получить\n`;
  }

  output += `\n🛠️ **Информация о браузере**\n`;
  output += `User-Agent: ${userInfo.browserInfo.userAgent}\n`;
  output += `Платформа: ${userInfo.browserInfo.platform}\n`;
  output += `Язык: ${userInfo.browserInfo.language}\n`;
  output += `Онлайн: ${userInfo.browserInfo.online ? "Да" : "Нет"}\n`;
  output += `Экран: ${userInfo.browserInfo.screen.width}x${userInfo.browserInfo.screen.height}\n`;

  console.log(output);
}

getUserInfo();
