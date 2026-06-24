# Dostavista CORS Proxy для Vercel

Этот прокси решает проблему CORS при обращении к API Достависты с сайта на uCoz.

## Развертывание на Vercel

### Способ 1: Через Vercel CLI (рекомендуется)

1. Установите Vercel CLI:
```bash
npm install -g vercel
```

2. Перейдите в папку с прокси:
```bash
cd vercel-proxy
```

3. Выполните развертывание:
```bash
vercel --prod
```

4. Следуйте инструкциям в терминале:
   - Войдите в аккаунт Vercel (или зарегистрируйтесь)
   - Выберите проект или создайте новый
   - Подтвердите развертывание

После развертывания вы получите URL вида: `https://your-project.vercel.app`

### Способ 2: Через GitHub

1. Создайте новый репозиторий на GitHub
2. Загрузите файлы из папки `vercel-proxy` в репозиторий
3. Зайдите на [vercel.com](https://vercel.com)
4. Нажмите "Import Project"
5. Выберите ваш GitHub репозиторий
6. Нажмите "Deploy"

## Настройка

После развертывания у вас будет URL прокси, например:
- `https://dostavista-proxy.vercel.app`

## Обновление script.js

Замените URLs в основном файле `script.js`:

**Было:**
```javascript
const DOSTAVISTA_CALC_URL = 'https://apitest.dostavista.ru/api/business/1.1/calculate-order';
const DOSTAVISTA_CREATE_URL = 'https://apitest.dostavista.ru/api/business/1.1/create-order';
```

**Стало:**
```javascript
const DOSTAVISTA_CALC_URL = 'https://your-project.vercel.app/calculate';
const DOSTAVISTA_CREATE_URL = 'https://your-project.vercel.app/create-order';
```

Где `your-project.vercel.app` - ваш реальный URL после развертывания.

## API ключ

API ключ Достависты уже встроен в прокси (в vercel.json). Вы можете заменить его на свой, если нужно:
1. В панели управления Vercel откройте ваш проект
2. Settings → Environment Variables
3. Добавьте переменную `DOSTAVISTA_API_KEY` со значением вашего ключа

## Проверка работы

После развертывания проверьте работу прокси:
```bash
curl -X POST https://your-project.vercel.app/calculate \
  -H "Content-Type: application/json" \
  -H "X-DV-Auth-Token: E032154FE89743FDB0403CD4E1E5D46312418DDC" \
  -d '{"vehicle_type":1,"total_weight":15,"matter":"Пакеты","points":[{"address":"Тестовый адрес","contact_person":{"phone":"+79999999999","name":"Тест"},"is_payment_here":true,"taking_amount":"300.00"}]}'
```

Должен вернуться JSON с расчетом стоимости.