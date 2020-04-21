# Tutorist
Tutorist - платформа для комплексного ведения занятий для репетиторов в режиме онлайн
## Установка и настройка
1. Установить и настроить следующее:
    * [Node.js](https://nodejs.org/) 
    * [PostgreSQL](https://www.postgresql.org/)
    * [IntelliJ IDEA](https://www.jetbrains.com/ru-ru/idea/) (предпочтительно)
2. В корне проекта создать файл `.env`, прописать в него следующее (вместо `<VARIABLE>` вставить свои значения):
    ```
    # GLOBAL
    NODE_ENV=development
    PORT=3000
    SESSION_SECRET=<SESSION_SECRET>

    # GOOGLE AUTH
    GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>
    GOOGLE_CLIENT_SECRET=<GOOGLE_CLIENT_SECRET>
    GOOGLE_REDIRECT_URL=http://localhost:3000/auth/google/callback
    
    # VKONTAKTE AUTH
    VKONTAKTE_APP_ID=<VKONTAKTE_APP_ID>
    VKONTAKTE_APP_SECRET=<VKONTAKTE_APP_SECRET>
    VKONTAKTE_CALLBACK_URL=http://localhost:3000/auth/vkontakte/callback
    
    # YANDEX AUTH
    YANDEX_CLIENT_ID=<YANDEX_CLIENT_ID>
    YANDEX_CLIENT_SECRET=<YANDEX_CLIENT_SECRET>
    YANDEX_CALLBACK_URL=http://localhost:3000/auth/yandex/callback
    
    # POSTGRES DEVELOPMENT
    DB_USERNAME_DEV=<DB_USERNAME_DEV>
    DB_PASSWORD_DEV=<DB_PASSWORD_DEV>
    DB_DATABASE_DEV=tutorist_dev
    DB_HOST_DEV=localhost
    
    # POSTGRES TEST
    DB_USERNAME_TEST=<DB_USERNAME_TEST>
    DB_PASSWORD_TEST=<DB_PASSWORD_TEST>
    DB_DATABASE_TEST=tutorist_test
    DB_HOST_TEST=localhost
    
    # POSTGRES PRODUCTION
    DB_USERNAME_PROD=<DB_USERNAME_PROD>
    DB_PASSWORD_PROD=<DB_PASSWORD_PROD>
    DB_DATABASE_PROD=tutorist_prod
    DB_HOST_PROD=localhost
    ```
    Данные по этому файлу можно получить у @RakhimovSE
## Запуск сервера
* Из корня проекта установить зависимости: `npm install`
* Создать базу данных: `npx sequelize-cli db:create`
* Сделать миграцию: `npx sequelize-cli db:migrate`
* Запустить сервер: `node bin/www`

Теперь вы можете перейти на [`localhost:3000`](http://localhost:3000) в браузере