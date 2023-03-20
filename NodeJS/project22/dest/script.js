"use strict";
//Задание 1
function capuchino(size, milk = "коровье", vkus) {
    let itogSum = 0;
    switch (size) {
        case ("маленький"):
            itogSum += 150;
            break;
        case ("средний"):
            itogSum += 180;
            break;
        case ("большой"):
            itogSum += 200;
            break;
    }
    switch (milk) {
        case ("коровье"):
            itogSum += 0;
            break;
        case ("банановое"):
            itogSum += 100;
            break;
        case ("кокосовое"):
            itogSum += 110;
            break;
        case ("соевое"):
            itogSum += 130;
            break;
    }
    switch (vkus) {
        case ("ягодный"):
            itogSum += 10;
            break;
        case ("ванильный"):
            itogSum += 20;
            break;
        case ("шоколадный"):
            itogSum += 40;
            break;
        case ("карамельный"):
            itogSum += 30;
            break;
    }
    return itogSum;
}
console.log(capuchino("маленький", "банановое", "ванильный"));
console.log(capuchino("большой", "банановое"));
console.log(capuchino("большой", null, "ванильный"));
//Задание 2
function arrReturn(arr) {
    let res = [];
    if (typeof arr === 'string') {
        return [] = arr.split(' ');
    }
    else if (typeof arr === 'number') {
        for (let i = 1; i <= arr; i++) {
            res.push(i);
        }
        return res;
    }
    else if (arr === null) {
        return new Array;
    }
    else {
        return arr;
    }
}
console.log(arrReturn("Hello world"));
console.log(arrReturn(5));
console.log(arrReturn(null));
console.log(arrReturn([1, 2, 3]));
//Задание 3
class Student {
    constructor(surname, name, secondname) {
        this.surname = surname;
        this.name = name;
        this.secondname = secondname;
    }
}
class Group {
    constructor(title, nameOfCourse, listStudent) {
        this.title = title;
        this.nameOfCourse = nameOfCourse;
        this.listStudent = listStudent;
    }
}
class Teacher {
    constructor(surname, name, secondname, listGroup, degree) {
        this.surname = surname;
        this.name = name;
        this.listGroup = listGroup;
        this.degree = degree;
    }
}
function getName(o) {
    if (o instanceof Student) {
        if (o.secondname == null)
            return o.surname + " " + o.name;
        else
            return o.surname + " " + o.name + " " + o.secondname;
    }
    if (o instanceof Group) {
        return o.title;
    }
    if (o instanceof Teacher) {
        if (o.secondname == null)
            return o.surname + " " + o.name;
        else
            return o.surname + " " + o.name + " " + o.secondname;
    }
}
function isMyStudent(s, t) {
    if (t.listGroup) {
        for (let i = 0; i < t.listGroup.length; i++) {
            for (let j = 0; j < t.listGroup[i].listStudent.length; j++) {
                if (t.listGroup[i].listStudent[j] == s)
                    return true;
            }
        }
    }
    else {
        return false;
    }
    return false;
}
function studentCount(o) {
    let count = 0;
    if (o instanceof Teacher) {
        if (o.listGroup) {
            for (let i = 0; i < o.listGroup.length; i++)
                count += o.listGroup[i].listStudent.length;
        }
        return count;
    }
    if (o instanceof Group) {
        return o.listStudent.length;
    }
}
function selectGroup(g1, g2, st) {
    if (g1.listStudent.length < g2.listStudent.length)
        g1.listStudent.push(st);
    else
        g2.listStudent.push(st);
}
const st1 = new Student("Guzeeva", "Dasha", "Vladimirovna");
const st2 = new Student("Alinka", "Kosheleva", "Denser");
const st3 = new Student("Sonik", "Kolitchenko");
const st4 = new Student("Anastasia", "Topor", "Andreevna");
const gr1 = new Group("Group1", "Course1", [st1, st2]);
const gr2 = new Group("Group2", "Course2", [st3]);
const tch1 = new Teacher("Parria", "Lana", "Marss", [gr1, gr2], "magic");
const tch2 = new Teacher("Kate", "Blanshet", "Goodys", [gr2], "magic");
console.log(gr1, gr2);
selectGroup(gr1, gr2, st4);
console.log(isMyStudent(st1, tch1));
console.log(isMyStudent(st1, tch2));
console.log(getName(st1));
console.log(isMyStudent(st2, tch1));
console.log(getName(gr1));
console.log(studentCount(gr1));
console.log(studentCount(tch1));
//Задание 4
//args: [string-название атрибута, string-згачение][] - картежи массив, атрибуты 
function createElementWithArgs(tag, args, inner) {
    let elem = document.createElement(tag);
    for (let item of args)
        elem.setAttribute(item[0], item[1]); //item[0]-название, item[1]-значение
    if (inner)
        elem.innerHTML = inner;
    return elem;
}
