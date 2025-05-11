# RestAPI.js

RestAPI.js — это лёгкий JavaScript-интерфейс для работы с HTTP-запросами (`GET`, `POST`, `PUT`, `DELETE`) и отправки `FormData`. Поддерживает CSRF-токен и интеграцию с jQuery.

## 📦 Установка

Подключите файл в вашем проекте:

```html
<script src="dist/restapi.js"></script>
```

## 🚀 Быстрый старт

```js
RestAPI.Get('/api/user', function(err, res) {
	if(!err) console.log(res);
});
```

```js
RestAPI.Post('/api/user', { name: 'Ruslan' }, function(err, res) {
	if(!err) console.log('User created', res);
});
```

```js
RestAPI.Send('/api/form', {
	this: document.querySelector('form'),
	additionalField: 'value'
}, function(status, res) {
	console.log('Response:', status, res);
});
```

## 🧪 Пример

В папке `example/` есть базовый `index.html` с формой и примерами использования.

## 🔐 CSRF поддержка

Если на странице есть элемент с ID `#csrf_token`, он будет автоматически добавлен в запросы.

## 📄 Лицензия

[MIT](LICENSE)
