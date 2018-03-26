### task-345-NodeJS-CI-CD
NodeJS Непрерывная интеграция, Деплой, Тесты

[![Build Status](https://travis-ci.org/akimy/task-345-NodeJS-CI-CD.svg?branch=master)](https://travis-ci.org/akimy/task-345-NodeJS-CI-CD)

> Привет! Этот репозиторий хранит в себе исходный код, который является домашкой для трех заданий в ШРИ
для удобства проверки я разделил README.md на секции заголовки.

Окружение в котором разрабатывалось приложение:
* ОС - MAC OSX
* Node - v.9
* Java - v.1.8.0_162
* Docker - version 18.02.0-ce
#### Инструкция по установке приложения

###### С помощью docker
  1. ```docker build -t akimy .```  
  2. ```docker run -p 4000:3000 akimy```  
  3. ```docker-machine ip``` - узнаем IP   
  4. приложение доступно по указанному IP на 4000 порту
  5. удалить приложение ```docker container ls``` ```docker container stop ${Container ID}```

###### С помощью Node - сервера:
  1. ```npm install```  
  2. ```git clone https://github.com/mrmlnc/micromatch.git repository``` - может быть любой репозиторий (для приложения который будет отображаться в интерфейсе)
  3. ```sh getbranches.sh``` Баш-скрипт для автотрекинга всех веток в репозитории (получаем их локально
  4. ```npm run build``` Собираем клиенсткий JS и CSS  
  5. ```npm run start``` Поднимаем сервер Express (по умолчанию слушает http://0.0.0.0:3000 || http://127.0.0.1:3000)

#### Инфраструктура.
В задании было необходимо настроить сборщик файлов (webpack). Несколько режимов сборки (dev/prod), pipeline на хероку со стендом при пулл-реквесте, staging и production - стендом при пуше в репозиторий с аннотированным тегом.

![imgur](https://i.imgur.com/cdWAJNt.png)

Ссылки:
* https://dashboard.heroku.com/pipelines/542e27b0-8bc5-4b7c-afad-ef7e1e2ff5b8 - pipeline
* https://travis-ci.org/akimy/task-345-NodeJS-CI-CD/branches - билды в Travis.
* https://yandex-shri-task-456-pr-4.herokuapp.com/ - staging с пулл-реквеста с русскими заголовками.
* https://yandex-shri-task-456.herokuapp.com/ - staging для development сборок (без тега).
* https://yandex-shri-task-456-prod.herokuapp.com/ - приложение в продакшене.

Какие еще технологии были использованы:
* Docker - контейниризация
* husky - для GIT хуков 
* postcss - autoprefix
* uglifyjsplugin - минификация клиентского JS
* линтеры - eslint, stylelint
* nodemon - для перезагрузки Express в dev режиме при изменении серверного кода.

Какие возникли сложности:
https://github.com/mrmlnc/les-reponses-sur-devoirs - как пример репозитория содержит много ошибок
"Ответы для домашнего задания" :3

####  Приложение на Node.js + Express
Необходимо было реализовать приложение которое предоставляет web-интерфейс для просмотра git-репозитория.

Для создания основы приложения я использовал express-generator http://expressjs.com/ru/starter/generator.html

Роутинг находится в папке routes/index.js;
Переменные окружения находятся в Dockerfile, т.к приложение контейнерезировано. Если запустить приложение локально по дефолту установлен `PORT 3000` порт и путь до репозитория в `repository`

Вызовы в роутинге обрабатываются в app/controllers.
Работа с git-cli осуществляется через exec, к которому в параметр cwd передается путь к репозиторию, вывод из командной строки (stdout парсится и рендерится на сервере), View лежат в resources/views. (использовался pug).  

Какие возникли сложности:
Пришлось увеличить размер буфера exec команды до 5мб для загрузки крупных репозиториев (вроде lodash)

#### Модульное и интеграционное тестирование
```npm run test``` - скрипт для запуска модульных тестов.
Проверяются следующие сценарии:
* git helper class
  * все чистые функции возвращают ожидаемый результат
  * используются стабы для проверки методов работающих с git-cli, проверяется парсинг команд в git-cli
* controllers 
  * проверяется, что в функцию рендер уходит необходимый заголовок и данные

Всего был написан 21 юнит-тест, отчет о покрытии в coverage/index.html