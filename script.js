document.addEventListener('DOMContentLoaded', function() {
    // Инициализация баланса
    let balance = localStorage.getItem('userBalance') || 0;
    document.getElementById('balance-value').textContent = balance;
    
    // Модальное окно
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close-modal');
    
    function showModal(content) {
        document.getElementById('modal-body').innerHTML = content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    closeModal.addEventListener('click', closeModalFunc);
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFunc();
        }
    });
    
    // Навигация по страницам
    document.querySelectorAll('.menu button').forEach(button => {
        button.addEventListener('click', () => {
            // Убираем выделение у всех
            document.querySelectorAll('.menu button').forEach(btn => btn.classList.remove('active'));
            // Выделяем текущую
            button.classList.add('active');
            
            // Определяем, что показывать
            const page = button.getAttribute('data-page');
            renderPage(page);
        });
    });
    
    // Функция рендеринга страниц
    function renderPage(page) {
        const content = document.getElementById('content');
        
        if (page === 'cases') {
            const casesData = [
                { 
                    id: 'case1', 
                    name: 'Кейс "Огонь"', 
                    description: 'Содержит крутые огненные подарки!', 
                    price: 100,
                    items: ['🔥 Огненная аватарка', '🎮 Игровой ключ', '💎 50 кристаллов']
                },
                { 
                    id: 'case2', 
                    name: 'Кейс "Лёд"', 
                    description: 'Охлаждающие и редкие призы.', 
                    price: 250,
                    items: ['❄️ Ледяной скин', '🎁 Сюрприз-бокс', '💎 100 кристаллов']
                },
                { 
                    id: 'case3', 
                    name: 'Кейс "Золото"', 
                    description: 'Премиум подарки и бонусы.', 
                    price: 500,
                    items: ['🏆 Золотой статус', '🎮 2 игровых ключа', '💎 250 кристаллов']
                }
            ];
            
            // По умолчанию первый кейс выбран
            let selectedCaseId = casesData[0].id;
            
            content.innerHTML = `
            <div class="content-wrapper">
                <div class="cases-container">
                    <div class="cases-header">Выберите кейс</div>
                    <div class="cases-main">
                        <div class="case-image" id="caseImage">
                            <div class="case-glow"></div>
                            <img src="https://via.placeholder.com/150x150/ff9800/121212?text=${casesData.find(c => c.id === selectedCaseId).name.split(' ')[1].replace(/["”]/g, '')}" 
                                 alt="${casesData.find(c => c.id === selectedCaseId).name}">
                        </div>
                        <div class="case-description" id="caseDescription">${casesData.find(c => c.id === selectedCaseId).description}</div>
                        <div class="case-price">Цена: ${casesData.find(c => c.id === selectedCaseId).price} ⭐️</div>
                        <button class="open-case-btn pulse-animation" id="openCaseBtn">Открыть кейс</button>
                    </div>
                    <div class="case-list" id="caseList">
                        ${casesData.map(c => `
                            <div class="case-item ${c.id === selectedCaseId ? 'active' : ''}" 
                                 data-id="${c.id}"
                                 data-price="${c.price}">
                                ${c.name}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            `;
            
            const caseItems = document.querySelectorAll('.case-item');
            const caseDescription = document.getElementById('caseDescription');
            const caseImage = document.getElementById('caseImage').querySelector('img');
            const casePrice = document.querySelector('.case-price');
            const openCaseBtn = document.getElementById('openCaseBtn');
            
            caseItems.forEach(item => {
                item.addEventListener('click', () => {
                    selectedCaseId = item.getAttribute('data-id');
                    const selectedCase = casesData.find(c => c.id === selectedCaseId);
                    
                    caseDescription.textContent = selectedCase.description;
                    caseImage.src = `https://via.placeholder.com/150x150/ff9800/121212?text=${selectedCase.name.split(' ')[1].replace(/["”]/g, '')}`;
                    caseImage.alt = selectedCase.name;
                    casePrice.textContent = `Цена: ${selectedCase.price} ⭐️`;
                    
                    caseItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                });
            });
            
            openCaseBtn.addEventListener('click', () => {
                const selectedCase = casesData.find(c => c.id === selectedCaseId);
                const userBalance = parseInt(document.getElementById('balance-value').textContent);
                
                if (userBalance < selectedCase.price) {
                    showModal(`
                        <div class="modal-error">
                            <h3>Недостаточно средств</h3>
                            <p>Вам не хватает ${selectedCase.price - userBalance} ⭐️ для открытия этого кейса.</p>
                            <button class="modal-btn" id="goToDeposit">Пополнить баланс</button>
                        </div>
                    `);
                    
                    document.getElementById('goToDeposit').addEventListener('click', () => {
                        closeModalFunc();
                        document.querySelector('[data-page="deposit"]').click();
                    });
                    return;
                }
                
                // Обновляем баланс
                const newBalance = userBalance - selectedCase.price;
                document.getElementById('balance-value').textContent = newBalance;
                localStorage.setItem('userBalance', newBalance);
                
                // Анимация открытия кейса
                openCaseBtn.disabled = true;
                openCaseBtn.textContent = 'Открываем...';
                openCaseBtn.classList.remove('pulse-animation');
                
                // Имитация загрузки
                setTimeout(() => {
                    // Выбираем случайный приз
                    const randomItem = selectedCase.items[Math.floor(Math.random() * selectedCase.items.length)];
                    
                    showModal(`
                        <div class="modal-success">
                            <h3>Поздравляем!</h3>
                            <div class="prize-icon">🎉</div>
                            <p>Вы открыли ${selectedCase.name} и получили:</p>
                            <div class="prize-name">${randomItem}</div>
                            <button class="modal-btn" onclick="closeModalFunc()">Отлично!</button>
                        </div>
                    `);
                    
                    openCaseBtn.disabled = false;
                    openCaseBtn.textContent = 'Открыть кейс';
                    openCaseBtn.classList.add('pulse-animation');
                }, 2000);
            });
        }
        else if (page === 'promo') {
            const activePromos = ['WELCOME2025'];
            const usedPromos = ['OLDPROMO'];
            
            content.innerHTML = `
            <div class="content-wrapper">
                <div class="promo-container">
                    <h2>Активация промокода</h2>
                    <div class="promo-input-group">
                        <input type="text" id="promoInput" placeholder="Введите промокод">
                        <button id="activatePromoBtn">Активировать</button>
                    </div>
                    <div class="promo-message" id="promoMessage"></div>
                    <div class="promo-list">
                        <h3>Ваши промокоды:</h3>
                        <div id="promoList">
                            ${activePromos.map(promo => `
                                <div class="promo-item" data-code="${promo}">
                                    ${promo} <span>Активен</span>
                                </div>
                            `).join('')}
                            ${usedPromos.map(promo => `
                                <div class="promo-item used" data-code="${promo}">
                                    ${promo} <span>Использован</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
            `;
            
            const promoInput = document.getElementById('promoInput');
            const activateBtn = document.getElementById('activatePromoBtn');
            const promoMessage = document.getElementById('promoMessage');
            const promoList = document.getElementById('promoList');
            
            activateBtn.addEventListener('click', () => {
                const code = promoInput.value.trim().toUpperCase();
                
                if (!code) {
                    promoMessage.textContent = 'Пожалуйста, введите промокод.';
                    promoMessage.style.color = 'var(--error)';
                    return;
                }
                
                // Проверяем промокоды
                if (activePromos.includes(code) || usedPromos.includes(code)) {
                    promoMessage.textContent = 'Этот промокод уже был использован.';
                    promoMessage.style.color = 'var(--error)';
                    return;
                }
                
                // Пример проверки промокода
                if (code === 'LUCKYDAY') {
                    // Добавляем в активные промокоды
                    activePromos.push(code);
                    
                    // Обновляем баланс
                    const bonus = 100;
                    const currentBalance = parseInt(document.getElementById('balance-value').textContent);
                    const newBalance = currentBalance + bonus;
                    document.getElementById('balance-value').textContent = newBalance;
                    localStorage.setItem('userBalance', newBalance);
                    
                    promoMessage.textContent = `Промокод активирован! +${bonus}⭐️`;
                    promoMessage.style.color = 'var(--success)';
                    
                    // Добавляем промокод в список
                    const newPromo = document.createElement('div');
                    newPromo.className = 'promo-item';
                    newPromo.setAttribute('data-code', code);
                    newPromo.innerHTML = `${code} <span>Активен</span>`;
                    promoList.appendChild(newPromo);
                    
                    promoInput.value = '';
                    
                    // Показываем анимацию
                    promoMessage.classList.add('animate__animated', 'animate__tada');
                    setTimeout(() => {
                        promoMessage.classList.remove('animate__animated', 'animate__tada');
                    }, 1000);
                } 
                else if (code === 'BONUS50') {
                    // Добавляем в активные промокоды
                    activePromos.push(code);
                    
                    // Обновляем баланс
                    const bonus = 50;
                    const currentBalance = parseInt(document.getElementById('balance-value').textContent);
                    const newBalance = currentBalance + bonus;
                    document.getElementById('balance-value').textContent = newBalance;
                    localStorage.setItem('userBalance', newBalance);
                    
                    promoMessage.textContent = `Промокод активирован! +${bonus}⭐️`;
                    promoMessage.style.color = 'var(--success)';
                    
                    // Добавляем промокод в список
                    const newPromo = document.createElement('div');
                    newPromo.className = 'promo-item';
                    newPromo.setAttribute('data-code', code);
                    newPromo.innerHTML = `${code} <span>Активен</span>`;
                    promoList.appendChild(newPromo);
                    
                    promoInput.value = '';
                    
                    // Показываем анимацию
                    promoMessage.classList.add('animate__animated', 'animate__tada');
                    setTimeout(() => {
                        promoMessage.classList.remove('animate__animated', 'animate__tada');
                    }, 1000);
                }
                else {
                    promoMessage.textContent = 'Промокод недействителен.';
                    promoMessage.style.color = 'var(--error)';
                    
                    // Анимация ошибки
                    promoInput.classList.add('animate__animated', 'animate__shakeX');
                    setTimeout(() => {
                        promoInput.classList.remove('animate__animated', 'animate__shakeX');
                    }, 1000);
                }
            });
        } 
        else if (page === 'profile') {
            const userStats = {
                casesOpened: 23,
                wins: 8,
                level: 5
            };
            
            content.innerHTML = `
            <div class="content-wrapper">
                <div class="profile-container">
                    <div class="profile-avatar">U</div>
                    <div class="profile-username">User123</div>
                    <div class="profile-status">${userStats.level > 10 ? 'VIP Пользователь' : 'Пользователь'}</div>
                    
                    <div class="profile-balance">
                        <span class="profile-balance-icon">⭐️</span> 
                        <span id="profileBalance">${document.getElementById('balance-value').textContent}</span>
                    </div>
                    
                    <div class="profile-actions">
                        <button id="editProfileBtn">Редактировать</button>
                        <button id="logoutBtn">Выйти</button>
                    </div>
                    
                    <div class="profile-stats">
                        <div class="profile-stat-item">
                            <div class="profile-stat-number">${userStats.casesOpened}</div>
                            <div>Кейсы</div>
                        </div>
                        <div class="profile-stat-item">
                            <div class="profile-stat-number">${userStats.wins}</div>
                            <div>Выигрыши</div>
                        </div>
                        <div class="profile-stat-item">
                            <div class="profile-stat-number">${userStats.level}</div>
                            <div>Уровень</div>
                        </div>
                    </div>
                    
                    <div class="profile-motto">Удача — твой лучший друг!</div>
                </div>
            </div>
            `;
            
            document.getElementById('editProfileBtn').addEventListener('click', () => {
                showModal(`
                    <div class="modal-edit">
                        <h3>Редактирование профиля</h3>
                        <div class="form-group">
                            <label for="editUsername">Имя пользователя</label>
                            <input type="text" id="editUsername" value="User123">
                        </div>
                        <div class="form-group">
                            <label for="editMotto">Девиз</label>
                            <input type="text" id="editMotto" value="Удача — твой лучший друг!">
                        </div>
                        <div class="form-group">
                            <label for="editAvatar">Аватар (эмодзи)</label>
                            <input type="text" id="editAvatar" value="U" maxlength="2">
                        </div>
                        <button class="modal-btn" id="saveProfileBtn">Сохранить</button>
                    </div>
                `);
                
                document.getElementById('saveProfileBtn').addEventListener('click', () => {
                    const newUsername = document.getElementById('editUsername').value;
                    const newMotto = document.getElementById('editMotto').value;
                    const newAvatar = document.getElementById('editAvatar').value;
                    
                    if (newUsername && newAvatar) {
                        document.querySelector('.profile-username').textContent = newUsername;
                        document.querySelector('.profile-motto').textContent = newMotto;
                        document.querySelector('.profile-avatar').textContent = newAvatar;
                        closeModalFunc();
                    } else {
                        alert('Пожалуйста, заполните все поля');
                    }
                });
            });
            
            document.getElementById('logoutBtn').addEventListener('click', () => {
                showModal(`
                    <div class="modal-confirm">
                        <h3>Выход из аккаунта</h3>
                        <p>Вы уверены, что хотите выйти?</p>
                        <div class="modal-buttons">
                            <button class="modal-btn cancel-btn" onclick="closeModalFunc()">Отмена</button>
                            <button class="modal-btn confirm-btn" id="confirmLogout">Выйти</button>
                        </div>
                    </div>
                `);
                
                document.getElementById('confirmLogout').addEventListener('click', () => {
                    alert('Вы вышли из системы (здесь была бы реальная логика выхода)');
                    closeModalFunc();
                });
            });
        }
        else if (page === 'deposit') {
            content.innerHTML = `
            <div class="content-wrapper">
                <div class="deposit-wrapper">
                    <div class="side-decor left-decor">💎</div>
                    <div class="deposit-container">
                        <h2>💰 Пополнение баланса</h2>
                        <p class="deposit-description">Выберите готовую сумму или введите свою</p>
                        
                        <div class="deposit-buttons">
                            <button class="deposit-btn" data-amount="100">100 ⭐️</button>
                            <button class="deposit-btn" data-amount="250">250 ⭐️</button>
                            <button class="deposit-btn" data-amount="500">500 ⭐️</button>
                            <button class="deposit-btn" data-amount="1000">1000 ⭐️</button>
                            <button class="deposit-btn" data-amount="5000">5000 ⭐️</button>
                            <button class="deposit-btn special" data-amount="9999">MAX ⭐️</button>
                        </div>
                        
                        <div class="custom-deposit">
                            <input type="number" id="custom-amount" placeholder="Введите свою сумму" min="10" max="10000">
                            <button id="custom-deposit-btn">Пополнить</button>
                        </div>
                        
                        <div class="deposit-footer">
                            <p>⚡ Средства зачисляются мгновенно</p>
                            <p>❗ Если в течении 5 минут средства не поступили на счет, обратитесь в поддержку</p>
                        </div>
                    </div>
                    <div class="side-decor right-decor">💎</div>
                </div>
            </div>
            `;
            
            let selectedAmount = 0;
            
            // При клике на кнопку суммы — вставляем значение в input
            document.querySelectorAll('.deposit-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    selectedAmount = parseInt(btn.getAttribute('data-amount'));
                    document.getElementById('custom-amount').value = selectedAmount;
                    
                    // Анимация выбора
                    btn.classList.add('animate__animated', 'animate__pulse');
                    setTimeout(() => {
                        btn.classList.remove('animate__animated', 'animate__pulse');
                    }, 1000);
                });
            });
            
            // Кнопка пополнения — обновляем баланс
            document.getElementById('custom-deposit-btn').addEventListener('click', () => {
                let current = parseInt(document.getElementById('balance-value').textContent) || 0;
                let add = parseInt(document.getElementById('custom-amount').value);
                
                if (isNaN(add) || add <= 0) {
                    showModal(`
                        <div class="modal-error">
                            <h3>Ошибка</h3>
                            <p>Введите корректную сумму (от 10 до 10000 ⭐️)</p>
                            <button class="modal-btn" onclick="closeModalFunc()">Понятно</button>
                        </div>
                    `);
                    return;
                }
                
                if (add > 10000) {
                    showModal(`
                        <div class="modal-error">
                            <h3>Превышен лимит</h3>
                            <p>Максимальная сумма пополнения за раз - 10000 ⭐️</p>
                            <button class="modal-btn" onclick="closeModalFunc()">Понятно</button>
                        </div>
                    `);
                    return;
                }
                
                const newBalance = current + add;
                document.getElementById('balance-value').textContent = newBalance;
                localStorage.setItem('userBalance', newBalance);
                
                // Обновляем баланс в профиле, если он открыт
                const profileBalance = document.getElementById('profileBalance');
                if (profileBalance) {
                    profileBalance.textContent = newBalance;
                }
                
                // Показываем уведомление
                showModal(`
                    <div class="modal-success">
                        <h3>Успешно!</h3>
                        <div class="prize-icon">💰</div>
                        <p>Ваш баланс пополнен на ${add} ⭐️</p>
                        <p>Текущий баланс: ${newBalance} ⭐️</p>
                        <button class="modal-btn" onclick="closeModalFunc()">Отлично!</button>
                    </div>
                `);
                
                document.getElementById('custom-amount').value = "";
            });
        }
    }
    
    // Загружаем первую страницу
    renderPage('cases');
    
    // Обновляем баланс при загрузке
    function updateBalance() {
        const savedBalance = localStorage.getItem('userBalance');
        if (savedBalance) {
            document.getElementById('balance-value').textContent = savedBalance;
        }
    }
    
    updateBalance();
    
    // Добавляем анимацию при наведении на кейсы
    document.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('case-item')) {
            e.target.classList.add('animate__animated', 'animate__pulse');
            setTimeout(() => {
                e.target.classList.remove('animate__animated', 'animate__pulse');
            }, 1000);
        }
    });
});

// Глобальная функция для закрытия модального окна
window.closeModalFunc = function() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
};