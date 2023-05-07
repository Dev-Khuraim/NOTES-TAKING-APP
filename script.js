let bar = document.querySelector('.menu-button');
let add_btn = document.querySelector('.add-button');
let aside = document.querySelector('aside');
let add_box = document.querySelector('.add-box');
let add_container = document.querySelector('.add-container');
let close  = document.querySelector('.add-container img');
let add_note = document.querySelector('.add-note');
let notes_list = document.querySelector('ul');
let title = document.querySelector('#title');
let description = document.querySelector('.desc textarea');
let main  = document.querySelector('main');
let add_box_img = document.querySelector('.add-box img');
let tabs = document.querySelector('.tabs');
let main_content = document.querySelector('.main-content');
let delete_note = document.querySelector('.delete');
let cur_tab = add_box;
let no_tab = 0;
let t = true;
let menu = document.querySelector('.bar-btn');
let opened;
let data_index = notes_list.childElementCount;
// localStorage.setItem('notes', '[]')
// let notes= [];
document.addEventListener('click', (event)=>{
    
    console.log('menu1');
    if (!event.target.closest('.panel') && opened!=null) {
        opened.parentElement.querySelector('.more').style.display = 'none';
    }

        // opened.parentElement.querySelector('.more').style.display = 'none';
       
    

})
menu.addEventListener('click',()=>{
    console.log('menu')
    aside.style.display = 'flex';
   
    aside.style.width='100%';
    main_content.style.display= 'none';
})
bar.addEventListener('click',()=>{
    if(!t){

        aside.style.transform = `translateX(0%)`;
        bar.style.transform = `translateX(0%)`;
        bar.style.background = `url('./images/Xmark-solid.svg#blackg') no-repeat center`;
        bar.style.backgroundSize = `contain`;
        t = true;
        
    }
    else{
        aside.style.transform = `translateX(-100%)`;
        bar.style.transform = `translateX(150%)`;
        bar.style.background = `url('./images/noun-bars-3089380.svg') no-repeat`;
        bar.style.backgroundSize = `contain`;
        // aside.style.display = 'none';
        t = false;
    }
});
add_box.addEventListener('click', (event)=>{
// console.log(event.target);
add_container.style.display = 'flex';
});
close.addEventListener('click', ()=>{
    add_container.style.display = 'none';
});
add_btn.addEventListener('click',()=>{
    add_container.style.display = 'flex';
});
add_note.addEventListener('click',()=>{
note_obj = {
    title:title.value,
    text: description.value,
    key:Date.now()
}

// notes = (JSON.parse(localStorage.getItem('notes')) == null)?'[]':JSON.parse(localStorage.getItem('notes'));
// notes.push(note_obj);
localStorage.setItem('notes',JSON.stringify(note_obj));
addingInPanel(note_obj);
description.value = "";
    title.value = "";
    add_container.style.display = 'none';
})
function addingInPanel(notes){


    notes_list.innerHTML += `
    <li data-index="${data_index++}" data-id="${notes.key}">
      <span class="panel">
        <img src="./images/noun-more-5128497.svg" alt="" onclick="moreSettings(this)">
        <ul class="more">
          <li class="open">Open<img src="./images/noun-edit-5403236.svg" alt="" class="open"></li>
          <li class="delete" data-id="${notes.key}">Delete<img src="./images/noun-delete-4460244.svg" alt="" class="delete" data-id="${notes.key}"></li>
        </ul>
      </span>
      <h4 onclick="openNote(this)">${notes.title}</h4>
      <p onclick="openNote(this)">${notes.text}</p>
    </li>`;

}
function deleteNote(e){
  
}  
function moreSettings(show){
    if(opened!=null){
        opened.parentElement.querySelector('.more').style.display = 'none';
       opened = null
    }
    else{
        show.parentElement.querySelector('.more').style.display = 'block';
        opened= show;
    }
  


   
    
        // show.parentElement.querySelector('.more').style.display = (show.parentElement.querySelector('.more').style.display=='block')?'none':'block';
    
    

}
function openNote(note){
    document.querySelector('#h-btn').setAttribute("fill", "#000000");

    let note_title = note.parentElement.querySelector('h4').innerText;
    let note_text = note.parentElement.querySelector('p').innerText;
   
    tabs.innerHTML=tabs.innerHTML+`<button data-tab='tab${no_tab}' class='note-tab'> <p>${note_title}</p><img src="./images/Xmark-solid.svg" alt="" class='close'></button>`;  
    let note_file = document.createElement('div');
    note_file.classList.add('note-file');
    note_file.setAttribute('data-tab',`tab${no_tab++}`);
    main_content.appendChild(note_file);
    note_file.style.zIndex = '0';
    note_file.innerHTML = ` <h2 contenteditable="true">${note_title}</h2>
    <p contenteditable="true" style="outline: none;">${note_text}</p>`;
   switchingTabs(tabs.lastChild);
    
    
    // note_tab.addEventListener('click',switchingTabs(note_tab));
}
function switchingTabs(tab){
    document.querySelector('#h-btn').setAttribute("fill", "#000000");

    cur_tab.style.zIndex = '0';
    let data_tab = tab.getAttribute('data-tab');
  console.log('switching')
    // let note_file = document.getElementsByAttribute("data-tab",`${data_tab}`);
    let note_file = document.querySelector(`[data-tab="${data_tab}"]:not(button)`);
    
    add_box.style.zIndex = '0';
    note_file.style.zIndex = '1';

    cur_tab = note_file;
}
const goToHome = ()=>{
   
   document.querySelector('#h-btn').setAttribute("fill", "#42c3cf");
   console.log(document.querySelector('#h-btn'));
   
cur_tab.style.zIndex = '0';
add_box.style.zIndex = '1';
}

tabs.addEventListener('click', (event)=>{

   
    event.stopPropagation();
    if(event.target.tagName === "IMG"){
if(event.target.classList.value === 'close'){
   
    let data_tab = event.target.parentElement.getAttribute('data-tab');
    document.querySelector(`[data-tab="${data_tab}"]:not(button)`).remove();
    event.target.parentElement.remove();
    no_tab--;
    if(tabs.childElementCount==1){
        document.querySelector('#h-btn').setAttribute("fill", "#42c3cf");
    }
}
else if(event.target.classList.value === 'home'){
    goToHome();
}

        
}
else if(event.target.tagName === "BUTTON"){
    switchingTabs(event.target.parentElement);

}
else if(event.target.tagName === "P"){
    switchingTabs(event.target.parentElement);
}
    
})

aside.addEventListener('click',(event)=>{
    if(event.target.tagName == 'LI'){
        if(event.target.classList.value == 'open'){
            console.log(event.target)
            openNote(event.target.parentElement.parentElement);
        }
    }
    else if(event.target.tagName == 'IMG'){
        if(event.target.classList.value == 'open'){
            console.log(event.target)
            openNote(event.target.parentElement.parentElement.parentElement);
        }
    }
if(event.target.tagName == 'LI'){
    if(event.target.classList.value == 'delete'){
      let t =  confirm('do you want to delete this note');
       if(t){
        
           let data = event.target.dataset.id;
          
  notes_list.removeChild(notes_list.querySelector(`[data-id="${data}"]`));
  localStorage.removeItem(`${data}`);
       }
  
    }

}
else if(event.target.tagName == 'IMG'){
    if(event.target.classList.value == 'delete'){
        confirm('do you want to delete this note')
        if(t){
            let data = event.target.dataset.id;
          console.log(data);
         
            notes_list.removeChild(notes_list.querySelector(`[data-id="${data}"]`));
            localStorage.removeItem(`${data}`);
       }
    }
}
})

document.querySelector('#h-btn').setAttribute("fill", "#42c3cf");
addingInPanel(JSON.parse(localStorage.getItem('notes')));

