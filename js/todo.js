const clear=document.querySelector(".clear");
const dates=document.getElementById("dates");
const time=document.getElementById("time");
const list=document.getElementById("list");
const input=document.getElementById("input");
const filterby=document.querySelector(".filter-todo");


const check="fa-check-circle";
const uncheck= "fa-circle-thin";
const LINE_THROUGH="lineThrough";

let List,id;

let data=localStorage.getItem("TODO");

if(data){
    List=JSON.parse(data);
    id=List.length;
    loadList(List);
}
else{
    List=[];
    id=0;
}

function loadList(array){
    array.forEach(function(item){
        addtodo(item.name,item.id ,item.done ,item.trash);
    });
}

function clearup(){
    localStorage.clear();
    location.reload;
    List=[];
    id=0;
}

const options={weekday:"long",month:"short",day:"numeric"};
const today=new Date();
dates.innerHTML=today.toLocaleDateString("en-US",options);
time.innerHTML=today.toLocaleTimeString();
function addtodo(toDo, id,done,trash){
    if(trash){
        return;
    }
    const Done=done? check:uncheck;
    const LINE=done? LINE_THROUGH :"";

    const item=`<li id="wod" class="item">
                    <i class="fa ${Done} co" job="complete" id=${id}></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete"  id=${id}></i>
                </li>
               `;
    const position="beforeend";

    list.insertAdjacentHTML(position,item);
}

document.addEventListener("keyup" ,function(event){
    if(event.keycode==13){
        const toDo=input.value;

        if(toDo){
            addtodo(toDo ,id ,false ,false);
            List.push({
                name:todo,
                id:id,
                done:false,
                trash:false
            });
            localStorage.setItem("TODO",JSON.stringify(List));
            id++;
        }
        input.value="";
    }
});
function buttonpress(){
    const toDo=input.value;

        if(toDo){
            addtodo(toDo ,id ,false ,false);
            List.push({
                name:toDo,
                id:id,
                done:false,
                trash:false
            });
            localStorage.setItem("TODO",JSON.stringify(List));
            id++;
        }
        input.value="";
}
function completetodo(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    List[element.id].done=List[element.id].done ? false : true;
    localStorage.setItem("TODO",JSON.stringify(List));
}

function removetodo(element){
    
    element.parentNode.parentNode.removeChild(element.parentNode);
    List[element.id].trash=true;
    
    let TODO=JSON.parse(localStorage.getItem('TODO'));
    let todoindex=TODO[element.id];
    TODO.splice(TODO.indexOf(todoindex), 1);
    localStorage.setItem("TODO", JSON.stringify(TODO));
  
}

list.addEventListener("click", function(event){
    const element=event.target;
    const elementJob=element.attributes.job.value;

    if(elementJob=="complete"){
       completetodo(element);
    }else if(elementJob =="delete"){
        removetodo(element);
    }
    
});

filterby.addEventListener("click",filtertodo);

function filtertodo(e){
let tod=List;
let c=list.children;
tod.forEach(function(){
    for(let i=0;i<c.length;i++){
        switch(e.target.value){
            case "all":
                break;
            case "completed":
                if(tod[i].done!=true){
                    c[i].style.display="none";
                }
                break;
            case "incompleted":
                if(tod[i].done!=false){
                    c[i].style.display="none";
                }
                break;
        }
    }
})
}