# Tutorist
Tutorist - платформа для комплексного ведения занятий для репетиторов в режиме онлайн
## Установка и настройка
1. Установить и настроить следующее:
    * [Node.js](https://nodejs.org/) 
    * PostgreSQL (+ создать нового пользователя): [macOS](https://900913.ru/note/b/postgresql-macos-9da176/), [Windows](https://winitpro.ru/index.php/2019/10/25/ustanovka-nastrojka-postgresql-v-windows/), [Linux](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04-ru)
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
## Полезные команды
* `npm run db:rebuild` - пересоздать базу данных со всеми миграциями и сидами. **ВНИМАНИЕ!** Все данные в БД будут удалены
## Code style
### Файлы и переменные
Во проекте мы используем следующие стили названий:
* `CamelCase`. В названиях таблиц в БД и названиях моделей
* `lowerCamelCase`. В названиях столбцов в базе данных, переменных в Javascript и, соответственно, в Node.js 
* `kebab-case`. В названиях файлов и атрибутов в HTML (классов/id) + [Методология БЭМ](https://ru.bem.info/methodology/quick-start/)
* `UPPER_CASE_SNAKE_CASE`. В названиях констант в Javascript
### База данных
* миграции. Название миграции должно отражать то, что она делает
    
    Например, создание таблицы `Users`: `xxxxxxxxxxxxxx-create-users.js`
    
    Добавление столбца `verified` в таблицу `Users`: `xxxxxxxxxxxxxx-add-verified-to-users.js`
* названия моделей - в единственном числе
* названия таблиц - во множественном числе
### Git и GitHub
* названия веток в формате `abc-xxxx-feature-description`, где:
    * `abc` - первые 3 буквы вашего имени
    * `xxxx` - номер вашей ветки (считая те, над которыми вы работали), 4 цифры
    * `feature-description` - название того, что вы делаете в этой ветке
* сообщения в коммитах - должно отражать суть изменения, которое вы внесли
## Troubleshooting
* Если при запуске проекта возникает ошибка

    `Error: Missing binding <Путь до проекта>/tutorist/node_modules/node-sass/vendor/darwin-x64-72/binding.node`:
    * Найти путь до `node` в `Preferences | Languages & Frameworks | Node.js and NPM` (например, `/usr/local/bin/node`)
    * Выполнить: `/usr/local/bin/node ./node_modules/node-sass/scripts/install.js` (вместо `/usr/local/bin/node` подставить свой путь)