# Tutorist
Tutorist - платформа для комплексного ведения занятий для репетиторов в режиме онлайн
## Установка и настройка
1. Установить и настроить следующее:
    * [Node.js (+npm)](https://nodejs.org/) 
    * [PostgreSQL](https://www.postgresql.org/)
    * [Intellij IDEA](https://www.jetbrains.com/ru-ru/idea/) (предпочтительно)
2. В корне проекта создать файл `.env`, прописать в него следующее (вместо `<VARIABLE>` вставить свои значения):
    ```
    # GLOBAL
    NODE_ENV=<NODE_ENV>
    PORT=<PORT>
    
    # POSTGRES DEVELOPMENT
    DB_USERNAME_DEV=<DB_USERNAME_DEV>
    DB_PASSWORD_DEV=<DB_PASSWORD_DEV>
    DB_DATABASE_DEV=<DB_DATABASE_DEV>
    DB_HOST_DEV=<DB_HOST_DEV>
    
    # POSTGRES TEST
    DB_USERNAME_TEST=<DB_USERNAME_TEST>
    DB_PASSWORD_TEST=<DB_PASSWORD_TEST>
    DB_DATABASE_TEST=<DB_DATABASE_TEST>
    DB_HOST_TEST=<DB_HOST_TEST>
    
    # POSTGRES PRODUCTION
    DB_USERNAME_PROD=<DB_USERNAME_PROD>
    DB_PASSWORD_PROD=<DB_PASSWORD_PROD>
    DB_DATABASE_PROD=<DB_DATABASE_PROD>
    DB_HOST_PROD=<DB_HOST_PROD>
    ```
## Запуск сервера
* Из корня проекта установить зависимости: `npm install`
* Создать базу данных: `npx sequelize-cli db:create`
* и сделать миграцию: `npx sequelize-cli db:migrate`
* Запустить сервер: `node bin/www`

Теперь вы можете перейти на [`localhost:3000`](http://localhost:3000) (по умолчанию) в браузере