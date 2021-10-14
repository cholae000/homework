//UI
const addbtn = document.getElementById('add');
const notecontainer = document.querySelector('.note-container');

const body = document.body;
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let activebg = 1;

function changebg(){
    body.style.background = `url(img/${activebg}.jpg)`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundRepeat = 'no-repeate';
}

prev.addEventListener('click',()=>{
    activebg--;
     
    changebg();

    if(activebg < 1){
        activebg = 7;
    }
})

next.addEventListener('click',()=>{
    activebg++;

    changebg();

    if(activebg > 7){
        activebg = 1;
    }
})


addbtn.addEventListener('click',()=>addnotes());

function addnotes(text=''){
    let note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
            <div class="tools">
                
            <div class="undo-redo">
                   
            </div>

                <div class="edit-share-delete">
                    <button class='edit'><i class='far fa-edit'></i></button>
                    <button class="share"><i class="far fa-share-square"></i></button>
                    <button class="trash"><i class="far fa-trash-alt"></i></button>
                </div>

            </div>

            <div class="">
               <input type="text" id="title" class="title" placeholder="Input Title">
            </div>

            <div class='underline'></div>

            <div class="time-date-words">
                <p class="time">time</p>
                <p class='date'>date</p>
                <p><span class='words'>0</span> words</p>
            </div>

            <div class="main ${text ? '' : 'hidden'}"></div>
            <textarea name="text" id="text" class="${text ? 'hidden' : ''}" cols="30" rows="6"></textarea>

            <div class="text-tools">
                <button class="uppercase">AA</button>
                <button class="lowercase">aa</button>
                <button class="capitalize">Aa</button>
                <button class="colortext black"></button>
                <div class='choosecolor'>
                    <button class="choosecolortext white"></button>
                    <button class="choosecolortext red"></button>
                    <button class="choosecolortext blue"></button>
                    <button class="choosecolortext crimson"></button>
                </div>
                
            </div>

            <span class='span'>change text color</span>

        `;

        notecontainer.appendChild(note);

        const edit = note.querySelector('.edit'),
            share = note.querySelector('.share'),
            trash = note.querySelector('.trash');

        const time = note.querySelector('.time'),
             date = note.querySelector('.date');

        const  words = note.querySelector('.words');

        const titles = note.querySelector('.title');

        const main = note.querySelector('.main');
        const  textarea = note.querySelector('textarea');

        const texttools = note.querySelector('.text-tools');
        
        const  texttoolbtns = note.querySelectorAll('.text-tools button');

        const uppercase = note.querySelector('.uppercase'),
                lowercase = note.querySelector('.lowercase'),
                capitalize = note.querySelector('.capitalize');
                
        const colortext = note.querySelector('.colortext');
        const choosecolor = note.querySelector('.choosecolor');


        const white = note.querySelector('.white'),
                red = note.querySelector('.red'),
                blue = note.querySelector('.blue'),
                crimson = note.querySelector('.crimson');

        const span = note.querySelector('.span');
    

  
        // for edit btn 
        edit.addEventListener('click',()=>{
            main.classList.toggle('hidden');
            textarea.classList.toggle('hidden');

            // textarea.classList.remove('uppercase');
            // textarea.classList.remove('lowercase');
            // textarea.classList.remove('capitalize');

            if(textarea.classList.contains('uppercase')){
                main.classList.add('uppercase');
            }
            else if(textarea.classList.contains('lowercase')){
                main.classList.add('lowercase');
            }
            else if(textarea.classList.contains('capitalize')){
                main.classList.add('capitalize');
            }

            texttools.classList.toggle('show');
            main.innerText = textarea.value;
            showtextfromls();
            changecolor();
            updatelocalstorage();
        });

        // for share btn 
        share.addEventListener('click',()=>{
            const sharebox = document.createElement('div');
            sharebox.classList.toggle('floating');

            sharebox.innerHTML=`
                <button class='delete'><i class='fas fa-times'></i></button>
                <ul>
                    <li><a href="#">post on <i class="fab fa-facebook-square"></i></a></li>
                    <li><a href="#">post on <i class="fab fa-instagram"></i></a></li>
                    <li><a href="#">share with <i class="fab fa-whatsapp"></i></a></li>
                    <li><a href="#">share with <i class="fab fa-skype"></i></a></li>
                    <li><a href="#">share with <i class="fab fa-viber"></i></a></li>
                    
                </ul>
            s`;

            const deletebtn = sharebox.querySelector('.delete');

            deletebtn.addEventListener('click',()=> sharebox.classList.add('removeli'));

            note.appendChild(sharebox);
        })

        // for trash btn 
        trash.addEventListener('click',()=>{
            note.remove();
            
            updatelocalstorage();
        })

        // For Texttool Buttons 
        texttoolbtns.forEach(texttoolbtn =>{
            texttoolbtn.addEventListener('click',()=>{
                texttoolbtn.classList.toggle('underlines');
            })
        })

        // for uppercase btn 
        uppercase.addEventListener('click',()=> {

            textarea.classList.toggle('uppercase');
            updatelocalstorage();

           
        });

        //for lowercase btn
        lowercase.addEventListener('click',()=> {
            textarea.classList.toggle('lowercase');

            updatelocalstorage();
        });

        // for capitalize btn 
        capitalize.addEventListener('click',()=>{
            textarea.classList.toggle('capitalize');

            updatelocalstorage();
        });

        // for span hover 
        colortext.addEventListener('mouseenter',()=> span.classList.add('hover'));
        colortext.addEventListener('mouseleave',()=> span.classList.remove('hover'));

        // for change text color 
        colortext.addEventListener('click',()=>{
           choosecolor.classList.toggle('choose');
        });

        // //for black
        // colortext.addEventListener('click',()=>{
        //     textarea.classList.add('blacktext');
        //     textarea.style.color = 'black';

        //     updatelocalstorage();
        // })

        //for white
        white.addEventListener('click',()=>{
           textarea.classList.add('whitetext');
           textarea.style.color = 'white';
           main.style.color ='white';

           updatelocalstorage();
        })

        //for red
        red.addEventListener('click',()=>{
            textarea.classList.add('redtext');
            textarea.style.color = 'red';
            main.style.color ='red';

            updatelocalstorage();
        })

        //for blue
        blue.addEventListener('click',()=>{
            textarea.classList.add('bluetext');
            textarea.style.color = 'blue';
            main.style.color = 'blue';

            updatelocalstorage();
        })

        //for crisom
        crimson.addEventListener('click',()=>{
            textarea.classList.add('crimsontext');
            textarea.style.color = 'crimson';
            main.style.color ='crimson';

            updatelocalstorage();
        })

        // for date and time 
        let hour = new Date().getHours();
        let minute = new Date().getMinutes();
        let day = new Date().getDay();
        let month = new Date().getMonth();
        let year = new Date().getFullYear();

        
        if(hour > 12){
            let hourpm = hour - 12;
            time.textContent = `${hourpm} : ${minute < 10 ? '0'+minute : minute} PM `;
        }else{
            time.textContent = `${hour} : ${minute}AM `;
        }

        date.textContent = ` ${day} / ${month} / ${year}` ;

        titles.addEventListener('keyup',(e)=>{
            const {value} = e.target;
            titles.innerText = value;

            

            updatelocalstorage();
        })

        textarea.addEventListener('keyup',(e)=>{
            const {value} = e.target;
            textarea.innerText = value;
            // main.innerText = textarea.value;

            words.innerText = textarea.value.length;

            updatelocalstorage();

        });

        if(text.titles === undefined,text.texts === undefined,text.word === undefined){
            titles.value = '';
            textarea.value = '';
            words.innerText = 0;
        }

        if(text.texttools.upper){
            showtextfromls();

            main.classList.toggle('uppercase');
            textarea.classList.toggle('uppercase');

        }
        else if(text.texttools.lower){
            showtextfromls();

            main.classList.toggle('lowercase');
            textarea.classList.toggle('lowercase');

        }
        else if(text.texttools.capital){
            showtextfromls();

            main.classList.toggle('capitalize');
            textarea.classList.toggle('capitalize');
        }
    

        function changecolor(){
            if(text.texttools.whitetext){
                main.style.color = 'white';
                textarea.style.color = 'white';
                textarea.classList.toggle('whitetext');
                main.classList.toggle('whitetext');
            }
            else if(text.texttools.redtext){
                main.style.color = 'red';
                textarea.style.color = 'red';
            }
            else if(text.texttools.bluetext){
                main.style.color = 'blue';
                textarea.style.color = 'blue';
            }
            else if(text.texttools.crimsontext){
                main.style.color = 'crimson';
                textarea.style.color = 'crimson';
            }
        }

         // show text from localStorage
        function showtextfromls(){
            titles.value = text.titles;
            textarea.value = text.texts;
            main.textContent=text.texts;
            words.innerText = text.word;
        }

        if(text.texts == ''){
            note.remove();
        }

        showtextfromls();
        changecolor();
}


function updatelocalstorage(){

    const notes = document.querySelectorAll('.note');

    let notess = [];

    notes.forEach(note=>{
        const textarea  = note.querySelector('textarea');
        
        notess.push({
        titles : note.querySelector('.title').value,
        word : textarea.value.length,
        texts : textarea.value,
        texttools : {
            upper : textarea.classList.contains('uppercase'),
            lower : textarea.classList.contains('lowercase'),
            capital : textarea.classList.contains('capitalize'),
            blacktext : textarea.classList.contains('blacktext'),
            whitetext : textarea.classList.contains('whitetext'),
            redtext : textarea.classList.contains('redtext'),
            bluetext : textarea.classList.contains('bluetext'),
            crimsontext : textarea.classList.contains('crimsontext'),
        }

    })});

    localStorage.setItem('notes',JSON.stringify(notess));
}


const getnotes = JSON.parse(localStorage.getItem('notes'));

if(getnotes){

    getnotes.forEach(getnote=> addnotes(getnote));

}







