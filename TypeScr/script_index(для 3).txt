
console.log("hi world");

function deleteFilm(id:number){
    console.log('deleted');
    console.log(id);
    let tmpArr = Film.films.filter((film) => {
        console.log(film.id == id);
        return film.id != id
    });
    
    document.querySelector(".content")!.innerHTML = "";
    Film.films = tmpArr;

    //Метод JSON.stringify() возвращает JavaScript-значение, преобразованное в JSON-строку
    console.log(tmpArr);
    localStorage.setItem("films", JSON.stringify(tmpArr));
    
}

function addFilms(...films:Film[]){
    for (let i = 0; i<films.length; i++){
        let {name, country, genre, directors, scenarist, producer, composer, earnings, rating, hrs, mins, sec, releasedate, poster, id} = films[i];
        let direcorsString = "";

        //в зависимости сколько пользователь выбирает "добавть режиссера", столько и появится строк, чтобы потом туда ввести имя режиссера
             for (let i = 0; i<directors.length; i++){
                if (i == directors.length - 1){
                       direcorsString+= directors[i]
                        break;
                  }
             direcorsString+= directors[i] + ", ";
        }

        let addFilmBlock = '<div class="moviecard">' +
        '<div class="movieName">'+ name +'</div>' +
        '<div class=>'+
        '    <img src="'+ poster +'" class = "imgsource" alt="постер '+ name +'">'+
        '</div>'+
        '<div class = "desc">Страна: '+ country +'</div>'+
        '<div class = "desc">Жанр: '+ genre +'</div>'+
        '<div class = "desc">Режиссеры: '+direcorsString+' </div>'+
        '<div class = "desc">Сценарист: '+ scenarist +'</div>'+
        '<div class = "desc">Продюсер: '+producer+'</div>'+
        '<div class = "desc">Композитор: '+composer+'</div>'+
        '<div class = "desc">Мировые сборы: '+earnings.toString()+'</div>'+
        '<div class = "desc">Рейтниг возраста: '+rating+'</div>'+
        '<div class="desc">Длительность: '+ hrs!.toString() +':' + mins!.toString() +':'+ sec!.toString() +'</div>'+
        '<div class = "desc" style="margin-bottom: 10pt;">Дата выхода: '+ releasedate!.getDate().toString()+ '.' + (releasedate!.getMonth()+1).toString() + '.'+ releasedate!.getFullYear().toString()+  '</div>'+
        '<div class="deleteBtn" id = "deleteBtn_'+ id +'" onclick="">'+
            '<div>Удалить</div>'+
        '</div>'+
        '<div class="deleteBtn" id = "revealInfo_'+ id +'">'+
            '<div>Информация</div>' +
        
        '</div>'+
        '</div>'
    document.querySelector(".content")!.innerHTML += addFilmBlock;
   
    }
    updateEventListeners(films);
}

class Commentt{

    name:string;
    busytype:string|number|boolean;
    rating:string|number;
    textItself:string;
    constructor(name:string, busytype:string|number|boolean, rating:string|number, textItself:string){
        this.name = name;
        this.busytype = busytype;
        this.rating = rating;
        this.textItself = textItself;
    }
    
}


class Film{ // классы
    static films : Film[] = [];
    
    name:string;
    country:string;
    genre:string;
    directors:string[] = [];
    scenarist:string;
    producer:string;
    composer:string;
    earnings:number;
    comments: Commentt[] = [];
    rating:number;
    hrs?:number|string;
    mins?:number|string;
    sec?:number|string;
    releasedate?:Date;
    poster?:string;
    id:number;
    

    constructor(name:string, country:string, genre:string, directors:string[], scenarist:string, producer:string, composer:string, earnings:number, rating:number, hrs?:number|string, mins?:number|string, sec?:number|string, releasedate?:Date, poster?:string, id?:number){
        this.name = name;
        this.country = country;
        this.genre = genre;
        this.directors = directors;
        this.scenarist = scenarist;
        this.producer = producer;
        this.composer = composer;
        this.earnings = earnings;
        this.rating = rating;
        this.hrs = hrs;
        this.mins = mins;
        this.sec = sec;
        this.releasedate = releasedate;
        this.poster = poster;


        //Отвечат за выдачу id, проверка на последовательность добавления фильма, 
        //в зависимости какой фильм по счёту мы добавили, ставим его в конец очкреди
        if (Film.films.length == 0){
            this.id = 0;
        } else {
        
            let tmpArray : Film[] = [];
            Object.assign(tmpArray, Film.films);
            tmpArray.sort((a:Film, b:Film) => (a.id> b.id ? 1 : -1));
            let maxId = tmpArray[tmpArray.length-1];
            let flag = true;
            for(let i = 0; i<Film.films.length; i++){
                let j = 0;
                for (; j<= maxId.id; j++){
                    if (Film.films[i].id == j){
                        flag = true;
                        break
                    }
                }
                if (flag)
                    continue;
                this.id = j;
                Film.films.push(this);
                return;
            }
            //кладём фильм
            this.id = maxId.id +1;
            Film.films.push(this);
            return;
        }
        Film.films.push(this);
    }
}





//LocalStorage это свойство объекта window, предназначенное для хранения пар ключ/значение в браузере

if (localStorage.getItem("films") != null){
    
    //если есть значение (проверка !null), то мы через JSON.parse() берём объект фильма, который нам приходит, 
    //создаём объект и делаем добавление, есть функция по добавлению
    
    let tmp = JSON.parse(<string>localStorage.getItem("films"));
    for (let i = 0; i<tmp.length; i++){
        let {name, country, genre, directors, scenarist, producer, composer, earnings, rating, hrs, mins, sec, releasedate, poster} = tmp[i];
        releasedate = new Date(releasedate);
        
       
        new Film(name, country, genre, directors, scenarist, producer, composer, earnings, rating, hrs, mins, sec, releasedate, poster)
        
        console.log(poster);

    }
    addFilms(...Film.films);


}

let afdivrevealer = {
    directorsCount: 1,
    revealed: false,

    initialize: function(){
        afdivrevealer.directorsCount = 1;
        afdivrevealer.revealed = false;
        console.log(this.directorsCount)
    },

    afdivreveal: function(){
        console.log(this.revealed);
        let afdiv = <HTMLElement>document.querySelector(".addFilm")
        if (afdivrevealer.revealed){
            afdiv.style.display = "none";
            afdivrevealer.directorsCount = 1;
            let directors = document.querySelector(".directors");
            directors!.innerHTML = '<label for="directorsName_'+ this.directorsCount +'">Имя режиссера</label>' +
                                  '<input required type="text" id="directorsName_'+ this.directorsCount +'">'
            afdivrevealer.revealed = false;
        } else {
            afdivrevealer.directorsCount = 1;
            afdiv!.style.display = "block";
            afdivrevealer.revealed = true;
        }
    },

    addDirector: function(){
        afdivrevealer.directorsCount++;
        let directors = document.querySelector(".directors");
        directors!.innerHTML += '<label for="direcorsName_'+ afdivrevealer.directorsCount +'">Имя режиссера</label>' +
                               '<input type="text" id="directorsName_'+ afdivrevealer.directorsCount +'">'
        
        console.log(afdivrevealer.directorsCount)
    }
}

afdivrevealer.initialize();

function addFilm(){
    console.log("функция отработала")
    let name = (<HTMLInputElement>document.querySelector("#filmName")).value;
    let country = (<HTMLInputElement>document.querySelector("#country")).value;
    let genre = (<HTMLInputElement>document.querySelector("#genreSel")).value;
    let directors:string[] = [];
    console.log(afdivrevealer.directorsCount)
    for (let i = 1; i<=afdivrevealer.directorsCount; i++){
        console.log("#directorsName_" + i + "");
        directors.push((<HTMLInputElement>document.querySelector("#directorsName_" + i + "")).value);
        console.log(document.querySelector("#directorsName_" + i + ""));
    }
    let scenarist = (<HTMLInputElement>document.querySelector("#scenarist")).value;
    let producer = (<HTMLInputElement>document.querySelector("#producer")).value;
    let composer = (<HTMLInputElement>document.querySelector("#composer")).value;
    let earnings = (<HTMLInputElement>document.querySelector("#earnings")).value;
    let ratingAge = (<HTMLInputElement>document.querySelector("#ratingAge")).value;
    let hrs = parseInt((<HTMLInputElement>document.querySelector("#hrs")).value);
    hrs = isFinite(hrs) ? hrs : 0;
    let mins = parseInt((<HTMLInputElement>document.querySelector("#mins")).value);
    mins = isFinite(mins) ? mins : 0;
    let sec = parseInt((<HTMLInputElement>document.querySelector("#sec")).value);
    sec = isFinite(sec) ? sec : 0;
    let dateOfRelease = new Date((<HTMLInputElement>document.querySelector("#dateOfRelease")).value);
    let imageLink = (<HTMLInputElement>document.querySelector("#imageLink")).value;
    let film = new Film(name, country, genre, directors, scenarist, producer, composer, new Number(earnings).valueOf(), new Number(ratingAge).valueOf(),  hrs, mins, sec, dateOfRelease, imageLink);
    localStorage.setItem("films", JSON.stringify(Film.films))
    console.log(dateOfRelease);

    let direcorsString = "";
    for (let i = 0; i<directors.length; i++){
        if (i == directors.length - 1){
            direcorsString+= directors[i]
            break;
        }
        direcorsString+= directors[i] + ", ";
    }
    console.log(direcorsString);
   
    let id = film.id;
    console.log(id);
    let addFilmBlock = '<div class="moviecard">' +
   '<div class="movieName">'+ name +'</div>' +
   '<div class=>'+
   '    <img src="'+ imageLink +'" class = "imgsource" alt="постер '+ name +'">'+
   '</div>'+
   '<div class = "desc">Страна: '+ country +'</div>'+
   '<div class = "desc">Жанр: '+ genre +'</div>'+
   '<div class = "desc">Режиссеры: '+direcorsString+' </div>'+
   '<div class = "desc">Сценарист: '+ scenarist +'</div>'+
   '<div class = "desc">Продюсер: '+producer+'</div>'+
   '<div class = "desc">Композитор: '+composer+'</div>'+
   '<div class = "desc">Мировые сборы: '+earnings.toString()+'</div>'+
   '<div class = "desc">Рейтниг возраста: '+ratingAge+'</div>'+
   '<div class="desc">Длительность: '+ hrs.toString() +':' + mins.toString() +':'+ sec.toString() +'</div>'+
   '<div class = "desc" style="margin-bottom: 10pt;">Дата выхода: '+ dateOfRelease.getDate().toString()+ '.' + (dateOfRelease.getMonth()+1).toString() + '.'+ dateOfRelease.getFullYear().toString()+  '</div>'+
   '<div class="deleteBtn" id = "deleteBtn_'+id+'">'+
         '<div>Удалить</div>'+
    '</div>' +
    '<div class="deleteBtn" id = "revealInfo_'+ id +'">'+
         '<div>Информация</div>' +
    
  '</div>'+
  '</div>'+
  '</div>'
 
  afdivrevealer.afdivreveal();
  document.querySelector(".content")!.innerHTML += addFilmBlock;
  console.log(".deleteBtn" + id);
  updateEventListeners(Film.films);
  
    

}


//нужно отсортировать фильмы и этот метод нам помогает в этом, проверка но то есть ли такой фильм
let sortRevealer = {
    revealed: false,
    element: document.querySelector(".sortElement"),

    initialize: function(){
        sortRevealer.revealed = false;
        sortRevealer.element = document.querySelector(".sortElement");
    },

    reveal: function(){
        if (sortRevealer.revealed){
            ((<HTMLElement> sortRevealer.element!).style).display = "none";
            sortRevealer.revealed = false;
        } else {
            (<HTMLElement>sortRevealer.element!).style.display = "block";
            sortRevealer.revealed = true;
        }
        console.log(sortRevealer.revealed);
    }
}

sortRevealer.initialize();

//сброс сортровки
function sortReset(){
    (<HTMLInputElement>document.querySelector(".content")).innerHTML = "";
    addFilms(...Film.films);
    console.log('sort reset');
}


function isValidDate(d:any) {
    return d instanceof Date;
 }

//выполнение сортировки
function executeSort(){
    let nameSort = (<HTMLInputElement>document.querySelector("#filmNameSort")).value;
    let country = (<HTMLInputElement>document.querySelector("#countrySort")).value;
    let genre = (<HTMLInputElement>document.querySelector("#genreSelSort")).value;
    let dor = new Date((<HTMLInputElement>document.querySelector("#dateOfReleaseStart")).value);
    let resArray = []
    resArray = Film.films.filter((film) => {
        console.log(!(nameSort != "" &&  nameSort != film.name))
        console.log(!(country != "Не выбрано" && country != film.country))
        console.log(!(genre != "Не выбрано" && genre != film.genre))
        
        if (nameSort != "" &&  nameSort != film.name){
            return false;
        }   
        if (country != "Не выбрано" && country != film.country){
            return false;
        }    
        if (genre != "Не выбрано" && genre != film.genre){
            return false;
        }
        if (!isValidDate(dor)){
            return false;
        }
            
        return true;
    })
    document.querySelector(".content")!.innerHTML = "";
    addFilms(...resArray);;
    sortRevealer.reveal();
}

//в зависимости куда пользователь нажимает, то и работает
document.querySelector(".addfilmbtn")!.addEventListener('click', afdivrevealer.afdivreveal);
document.querySelector(".addDirectorBtn")!.addEventListener('click', afdivrevealer.addDirector);
document.querySelector(".addFilmFormForm")!.addEventListener('submit', addFilm)
document.querySelector(".sortBtnElement")!.addEventListener('click', sortRevealer.reveal)
document.querySelector(".sortReset")!.addEventListener('click', function(){sortReset(); sortRevealer.reveal()})

//метод по прослушке добавлений
function updateEventListeners(arr:Film[]){
    console.log("Event Listeners updated")
    console.log(arr);
    for (let i = 0; i<arr.length; i++){
        console.log(document.getElementById(`revealInfo_${arr[i].id}`));
        document.getElementById(`revealInfo_${arr[i].id}`)!.addEventListener('click', function() {revealInfo(arr[i].id)}, false)
        document.getElementById(`deleteBtn_${arr[i].id}`)!.addEventListener('click', function() {deleteFilm(arr[i].id)}, false)
    }
    
}

//deleteFilm(0);
console.log(Film.films);
console.log(document.getElementById("#deleteBtn_0"));

//функция для просмотра подробной информации о кино, просмотр, к примеру, кто режиссер, сценарист и тд
//также, если нужно посмотреть комментарий
function revealInfo(id:number){
    document.querySelector(".filmDescCloseBtn")!.addEventListener('click', function (){closeInfo(id)}) 
    document.querySelector(".commentsBlock")!.innerHTML = "";
    (<HTMLElement>document.querySelector(".filmInfo")!).style.display = "block";
    let film : Film | Film[] = Film.films.filter(film => film.id == id);
    film = film[0];
    (<HTMLElement>document.querySelector(".descFilmInfo")!).innerHTML = film.name;
    (<HTMLImageElement>document.querySelector(".imgsource")).src = <string>film.poster;
    document.querySelector(".desc1")!.innerHTML = "Страна: " + film.country;
    document.querySelector(".desc2")!.innerHTML = "Жанр: "+ film.genre;
    let direcorsString = "";
    
        for (let i = 0; i<film.directors.length; i++){
                if (i == film.directors.length - 1){
                       direcorsString+= film.directors[i]
                        break;
                  }
             direcorsString+= film.directors[i] + ", ";
        }
    document.querySelector(".desc3")!.innerHTML = "Режиссеры: " + direcorsString;
    document.querySelector(".desc4")!.innerHTML = "Сценарист: " + film.scenarist;
    document.querySelector(".desc5")!.innerHTML = "Продюсер: " + film.producer;
    document.querySelector(".desc6")!.innerHTML = "Композитор: " + film.composer;
    document.querySelector(".desc7")!.innerHTML = "Мировые сборы: " + film.earnings;
    document.querySelector(".desc8")!.innerHTML = "Рейтинг: " + film.rating;
    document.querySelector(".desc9")!.innerHTML = "Длительность: " + film.hrs!.toString() +':' + film.mins!.toString() +':'+ film.sec!.toString()
    document.querySelector(".desc10")!.innerHTML = "Дата выхода: " + film.releasedate!.getDate().toString() + "." + (film.releasedate!.getMonth() + 1).toString() + "." + film.releasedate!.getFullYear().toString();
    document.querySelector(".addCommentFormForm")!.addEventListener('submit', function(){addCommentToFilm(Film.films[id])})
    console.log(film.comments);
    for (let i = 0; i<film.comments.length; i++){
        let name = film.comments[i].name;
        let busytype = film.comments[i].busytype;
        let rate = film.comments[i].rating;
        let text = film.comments[i].textItself;
        document.querySelector(".commentsBlock")!.innerHTML += `<div class="comment">
        <div class="cName">Имя: ${name}</div>
        <div class="cBusy">Род занятий: ${busytype}</div>
        <div сlass="cRate">Оценка фильму: ${rate}</div>
        <div class="cItself">Комментарий: ${text}</div>
        </div>`
    }
 }

function closeInfo(id:number){
    document.querySelector(".filmDescCloseBtn")!.removeEventListener('click', function (){closeInfo(id)}) 
    document.querySelector(".addCommentFormForm")!.removeEventListener('submit', function(){addCommentToFilm(Film.films[id])});
    (<HTMLElement> document.querySelector(".filmInfo")!).style.display = "none";
    
}

function openComment(){
    (<HTMLElement> document.querySelector(".addCommentFormHolder")!).style.display = "block";
}

function closeComment(){
    (<HTMLElement> document.querySelector(".addCommentFormHolder")!).style.display = "none";
}

function addCommentToFilm(film:Film){
    let name = (<HTMLInputElement>document.getElementById("commentatorName")).value;
    let busytype = (<HTMLInputElement>document.getElementById("busytype")).value;
    let rating = (<HTMLInputElement>document.getElementById("rateFilm")).value;
    let textItself = (<HTMLInputElement>document.getElementById("comItself")).value;
    film.comments.push(new Commentt(name, busytype, rating, textItself));
    console.log(film.comments);
    closeComment();
    document.querySelector(".commentsBlock")!.innerHTML = "";
    for (let i = 0; i<film.comments.length; i++){
        let name = film.comments[i].name;
        let busytype = film.comments[i].busytype;
        let rate = film.comments[i].rating;
        let text = film.comments[i].textItself;
        document.querySelector(".commentsBlock")!.innerHTML += `<div class="comment">
        <div class="cName">Имя: ${name}</div>
        <div class="cBusy">Род занятий: ${busytype}</div>
        <div сlass="cRate">Оценка фильму: ${rate}</div>
        <div class="cItself">Комментарий: ${text}</div>
        </div>`
    }
}



document.querySelector(".addCommentBack")!.addEventListener('click', closeComment)
document.querySelector(".addComment")!.addEventListener('click', openComment)
document.querySelector(".sortBack")!.addEventListener('click', sortRevealer.reveal)
document.querySelector(".sortFormForm")!.addEventListener('submit', executeSort);
