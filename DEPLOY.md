# Быстрая инструкция по развертыванию

## Шаг 1: Развертывание на Vercel

### Вариант A: Через GitHub (самый простой)

1. Создайте аккаунт на [github.com](https://github.com) (если нет)
2. Создайте новый репозиторий (например, `dostavista-proxy`)
3. Загрузите ВСЕ файлы из папки `vercel-proxy` в репозиторий:
   - api/calculate.js
   - api/create-order.js
   - package.json
   - vercel.json
4. Зайдите на [vercel.com](https://vercel.com)
5. Нажмите "Add New..." → "Project"
6. Выберите "Import Git Repository"
7. Выберите ваш репозиторий `dostavista-proxy`
8. Нажмите "Deploy"

Через 1-2 минуты получите URL вида: `https://dostavista-proxy.vercel.app`

### Вариант B: Через Vercel CLI

1. Установите Node.js с [nodejs.org](https://nodejs.org/)
2. Откройте командную строку (cmd) и выполните:
```bash
npm install -g vercel
cd vercel-proxy
vercel --prod
```
3. Следуйте инструкциям в терминале

## Шаг 2: Обновите script.js

После развертывания замените URL в файле `script.js`:

Найдите строки:
```javascript
const DOSTAVISTA_CALC_URL = 'https://your-project.vercel.app/calculate';
const DOSTAVISTA_CREATE_URL = 'https://your-project.vercel.app/create-order';
```

Замените `your-project.vercel.app` на ваш реальный URL.

**Пример:**
```javascript
const DOSTAVISTA_CALC_URL = 'https://dostavista-proxy.vercel.app/calculate';
const DOSTAVISTA_CREATE_URL = 'https://dostavista-proxy.vercel.app/create-order';
```

## Шаг 3: Загрузите обновленный script.js на uCoz

Загрузите измененный `script.js` на ваш сайт mycop.do.am через:
- Файловый менеджер в панели управления uCoz, или
- FTP-клиент

## Шаг 4: Проверка

1. Откройте https://mycop.do.am/index/0-3
2. Заполните форму тестовыми данными
3. Нажмите "Заказать доставку"
4. Должен появиться лоадер, а затем трекинг ссылка

## Если не работает

1. Откройте консоль браузера (F12 → Console)
2. Ищите ошибки - скопируйте их и отправьте мне
3. Проверьте, что URL прокси правильный (без опечаток)

## Важно

- API ключ Достависты уже встроен в прокси
- Прокси работает 24/7 бесплатно на бесплатном тарифе Vercel
- Не нужно ничего платить