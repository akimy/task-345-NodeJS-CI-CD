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
* docker-compose - version 1.19.0
#### Инструкция по установке приложения

~~1. С помощью docker
```docker-compose build```
```docker-compose up```
Если в терминал выходит ошибка  
```Couldn't connect to Docker daemon - you might need to run 'docker-machine start default'``` наберите команду в шелле ```eval $(docker-machine env default)```~~ я что-то поменял и все сломал возникли ошибки


2. С помощью Node - сервера:
  
а)
```npm install```  

б) ```git clone https://github.com/mrmlnc/micromatch.git repository``` - может быть любой репозиторий (для приложения который будет отображаться в интерфейсе)
  

в)
Баш-скрипт для автотрекинга всех веток в репозитории (получаем их локально)
```bash
for branch in  `git --git-dir ./repository/.git branch -r | grep -v 'HEAD\|master'`; do git --git-dir ./repository/.git branch --track ${branch##*/} $branch; done
```    

г) ```npm run buid```Собираем клиенсткий JS и CSS  

д)
```npm run start``` Поднимаем сервер (по умолчанию слушает http://127.0.0.1:3000)

#### Инфраструктура.
В задании было необходимо настроить сборщик файлов (webpack). Несколько режимов сборки (dev/prod), pipeline на хероку со стендом при пулл-реквесте, staging и production - стендом при пуше в репозиторий с аннотированным тегом.

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

