### Книжный интернет-магазин на API Google Books ([ссылка на макет](https://www.figma.com/design/8XxPADjILtnlah4yWI0CLb/bookshop?node-id=0-1&p=f&t=rMiPE83D9JkWAAnA-0)).

#### Подготовка проекта
Для работы проекта необходим ключ от `google API`. Ключ нужно добавить в настройки проекта в файл `src/components/mainContent/_displayBook.js` в параметр `this.API_KEY`. Без этого параметра компонент с книгами работать не будет.

#### Сборка проекта

###### Склонировать репозиторий:
`gh repo clone tkhaidarov/BookShop`

###### Установить зависимости:
`nmp i`
###### Скомпилировать js/scss:
`npm run build`
###### Запуск dev-сервера:
`npm run devserver`