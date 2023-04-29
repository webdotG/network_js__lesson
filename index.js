//эмитирую запрос на сервер
console.log('request data...')

//эмитирую запрос на сервер будто жду 2 сек запроса на сервер 
//и жду получения данных с сервера тоже 2 сек получаю обьект данных
//settimeout для эмитации асинхронных запросов
// setTimeout( () => { 
//   console.log('preparing data...')

//   const backendData = {
//     server: 'aws',
//     port: 2000,
//     status: 'working'
//   }

//   setTimeout(() => { 
//     backendData.modified = true;
//     console.log('data received', backendData)
//   }, 2000)

// }, 2000)
//такой подход плох тем что очень много коллбэков внутри коллбэков
//в дальнейшем если запросов больше чем 2 такой код запарюсь поддерживать

//-------------------------------------------------------------------------

//PROMISE нужны для того что бы упростить работу с асинхронными операциями

//в JS существует глобальный класс Promise это класс констурктор
//в который я должен передать функцию коллбэк 
//на пример я напишу асинхронный код через settimeout 
//данная функция принимает в себя праметрами два аргумента который тоже являются функциями:
//первый параметр называется resolve, вызывается когда асиннхпронная оперция закончена успешно
//второй параметр называется reject,

const p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log('preparing data...');
    const backendData = {//что бы получить доступ к backenddata я передаю её аргументом в resolve
      server: 'aws',
      port: 2000,
      status: 'working'
    }
    resolve(backendData)//в функцию settimeout передал коллбэк и после ее заершения вызываю resolve как бы говоря что запрос завершен успешно                                   
  }, 2000)//backenddata передана аргументом в resolve что бы потом можно было использовать её в then
})

//теперь переменная P является промисом и у промисов есть определенные методы
//THEN метод передаю функцию коллбэк
//данный метод будет вызыван когда заеончится асинхронная операция и будет вызван resolve

p.then((data) => {                       //параметром then получает в себя backenddata я назвал его просто data
  console.log('promise resolved', data);
  //=======================================================
  // const p2 = new Promise ( (resolve, reject) => {
  //   setTimeout (() => {
  //     data.modified = true;           //добавляю в полученные данные новый ключ просто модифицирую уже полученные данные
  //     resolve(data)                   //промис завершён аргументом передаю данные полученные с сервера 
  //   })
  // })
  // p2.then (modifeidData => {           //методом then обращаюсь к полученным данным с сервера
  //   console.log ('data received', modifeidData)
  // })
  //=======================================================
  return new Promise((resolve, reject) => {  //возвращаю новый промис без создания новой прееменной
    setTimeout(() => {
      data.modified = true;
      resolve(data)           //если заменить здесь resolve на reject то сработает catch в конце кода
    }, 2000)
  })
}).then(modifiedData => {                   //вызываю then так как я получил новый промис и кладу в него данные
  console.log('data recived', modifiedData) //modifiedData это данные полученные из resolve(data)
  modifiedData.addNewKey = true
  return modifiedData
}).then(doubleModifiedData => {
  console.log('doubleModifiedData', doubleModifiedData)
})
.catch( err => {console.log('ОШИБКА', err)})
//такая запись удобнее в чтении
//1-когда промис выполнится мы делаем следующую асин операцию
//2-когда промис выполнится мы делаем следующие действия
//обьект p можно передавать в другине модули и через then говорить что надо сделат,
//=====================================================================================

//фукция задержки

const delay = (timeMs) => {
  return new Promise (resolve => {
    setTimeout( () => resolve(), timeMs)
  })
}
// delay(1500).then( () => console.log('delay 1500ms'))
// delay(3000).then( () => console.log('delay 3000ms'))