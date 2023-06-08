function selectTag(tag: string)
            {
                let arr : (HTMLInputElement)[] = <HTMLInputElement[]>Array.from(document.body.querySelectorAll('div > input')).map(item=>item.parentElement).filter(item=>item!=null);
                arr.forEach((element : HTMLElement) => {
                    element.hidden = true;
                });
                switch(tag)
                {
                    case 'div':
                        arr.filter(item=>(<HTMLInputElement>(<HTMLInputElement>item.querySelector('input'))).name=="inner")[0].hidden = false;
                        break;
                    case 'input':
                        arr.filter(item=>(<HTMLInputElement>(<HTMLInputElement>item.querySelector('input'))).name=="value")[0].hidden = false;
                        arr.filter(item=>(<HTMLInputElement>(<HTMLInputElement>item.querySelector('input'))).name=="type")[0].hidden = false;
                        arr.filter(item=>(<HTMLInputElement>item.querySelector('input')).name=="name")[0].hidden = false;
                        break;
                    case 'form':
                        arr.filter(item=>(<HTMLInputElement>item.querySelector('input')).name=="method")[0].hidden = false;
                        arr.filter(item=>(<HTMLInputElement>item.querySelector('input')).name=="action")[0].hidden = false;
                        arr.filter(item=>(<HTMLInputElement>item.querySelector('input')).name=="inner")[0].hidden = false;
                        break;
                    case 'a':
                        arr.filter(item=>(<HTMLInputElement>item.querySelector('input')).name=="href")[0].hidden = false;
                        arr.filter(item=>(<HTMLInputElement>item.querySelector('input')).name=="target")[0].hidden = false;
                        arr.filter(item=>(<HTMLInputElement>item.querySelector('input')).name=="inner")[0].hidden = false;
                        break;
                    case 'h1':
                        arr.filter(item=>(<HTMLInputElement>item.querySelector('input')).name=="inner")[0].hidden = false;
                }
            }

            function createE(){
                let inner : HTMLInputElement = <HTMLInputElement>document.getElementsByName('inner')[0];
                let arr : [string,string][] = Array.from(document.getElementsByTagName('input'))
                .filter(item=>!item.parentElement?.hidden&&item.name!='inner') //сначала фильтрация по атрибутам(иннер)
                .map(item=>[item.name, item.value]);//мы превращаем к кортежи, название атрибута и значение
                document.body.append(createElementWithArgs((<HTMLInputElement>document.getElementById('tagSelect')).value, arr, (!inner.hidden)?inner.value:undefined)); //после сортировки происходит добавление
            }

            window.onload = ()=>selectTag('div')