var TaskList = [];
var itemInfo = {};
var itemID = '';

function LoadList(){
// carregamento dos dados do localstorage na tela

  TaskList = JSON.parse(localStorage.getItem('lista'))||[];

  if (TaskList===null||TaskList.length==0){
    alert('Bem vindo!\nCrie sua lista agora! :)');
    createInitialELement();
  }else{
    let countListLeft = 0;
    for(var i=0; i<=TaskList.length-1; i++){
      countListLeft += TaskList[i].taskDone;

      createListElements(TaskList[i].id, 
                         TaskList[i].description, 
                         TaskList[i].taskDone);
    };
    CreateControlElements(TaskList.length, countListLeft);
  };
  
};

function AddItem(){
// adiconar 1 item na lista
  TaskList = JSON.parse(localStorage.getItem('lista'))||[];

  const idTaskList = TaskList!==null?TaskList.length:0;
  console.log(idTaskList)
  const task = document.getElementById('itemInput').value;
  const Input = document.getElementById('itemInput');

  if(task.length!=0){
    TaskList.push(idTaskList, task);
    
    itemInfo = {
      id: idTaskList,
      description: task,
      taskDone: false,
      dateCreation: GetAtualDate(),
      dateUpdate: GetAtualDate()
    };
 
    setLocalData(itemInfo);
    createListElements(idTaskList, task, false);

    Input.value = '';
    Input.focus();

    TaskList = JSON.parse(localStorage.getItem('lista'))||[];

    if(TaskList.length==1){
      CreateControlElements(1,0);
    }else{
      UpdateController(TaskList, true);
    }
  }else{  
    alert('Iforme uma tarefa!');
  };
  
}; 

function DeleteItem(id, Element){
  if(window.confirm("Quer realmente excluir o item da sua tarefa?")){
    //colocar condicao para atender o id ultimo sendo menor que o length do array
    const indexItem = id==1?0:id;
    console.log(id);
     TaskList.splice(indexItem, 1);
 
    if (TaskList!=[]){
      localStorage.removeItem('lista');
      localStorage.setItem('lista',JSON.stringify(TaskList)); 
    };

    Element.remove(this);

    if(TaskList==[]||TaskList.length==0||TaskList==undefined){
      HideController();
      createInitialELement();
    }else{
      UpdateController(TaskList, false);
    };
  }
};

function UpdateItem(id){
// atualizar o item

  TaskList = JSON.parse(localStorage.getItem('lista'));
  const indexItem = id==1?0:id;
  console.log(id);

  const itemInfo = {
    id: TaskList[id].id,
    description: TaskList[id].description,
    taskDone: TaskList[id].taskDone?false:true,
    dateCreation: TaskList[id].dateCreation,
    dateUpdate: GetAtualDate()
  };
 
  TaskList.splice(id, 1, itemInfo);
 
  if(!(TaskList == [])){
    localStorage.setItem('lista', JSON.stringify(TaskList)); 
  };

  UpdateController(TaskList, false);
}; 

function CheckItem(id, label){
// marcar  e estilizasr o item quando a tarefa tiver concluida

  TaskList = JSON.parse(localStorage.getItem('lista'));

  if(label.style.textDecorationLine==''||label.style.textDecorationLine=='none'){
    label.style.textDecorationLine = "line-through"; 
    label.style.fontStyle = "italic";
    label.style.opacity = 0.5;
  }else{
    label.style.textDecorationLine = "none";
    label.style.fontStyle = "normal";
    label.style.opacity = 1;
  };

  UpdateItem(id);
};

function createListElements(id, taskCaption, taskDone){
//Criação dos elementos de cada item da lista

  var defaultImg = document.getElementById('defaultImg');
  if(defaultImg!=null){
    defaultImg.remove();
  }

  // criacao dos elementos items da lista
  const itemID = `item_000${id}`;
  const labelID = `label_000${id}`;

  const item = document.createElement("LI");
        item.setAttribute("class",'itemList');
        item.setAttribute("id", `${itemID}`);
        
  const input = document.createElement("INPUT");
        input.setAttribute("type",'checkbox');
        input.setAttribute("name",'checkItem');
        input.setAttribute("OnChange",`CheckItem(${id}, ${labelID})`);
    

  const label = document.createElement("LABEL");
        label.setAttribute("id",`${labelID}`);
  const labeltext = document.createTextNode(taskCaption);
        label.appendChild(labeltext);
      
  const buttonDelete = document.createElement("BUTTON");
        buttonDelete.setAttribute('class','deleteButton');
        buttonDelete.setAttribute('OnClick',`DeleteItem(${id}, ${itemID})`);
        
  const delImg = document.createElement('IMG');
  // const srcdel = "/assets/images/deleteIMG.png";
  const srcdel = "https://i.ibb.co/LDTwxn0/delete-IMG.png";

        delImg.setAttribute('src', srcdel);
        delImg.setAttribute('name','deleteIMG');
        delImg.setAttribute('alt','x');

        buttonDelete.appendChild(delImg);
      
  if(taskDone){
    input.setAttribute("checked", 'checked');
    label.style.textDecorationLine = "line-through"; 
    label.style.fontStyle = "Italic";
    label.style.opacity = 0.5;
  };

  item.appendChild(input);
  item.appendChild(label);
  item.appendChild(buttonDelete);

  document.getElementById("ordenedList").appendChild(item);
};

function setLocalData(dados) {
//funcao para gravar os dados no localstorage

  TaskList = JSON.parse(localStorage.getItem('lista'))||[];

  //verifica se já existe no array
  const index = TaskList.indexOf(dados);
  const existsData = (index !== -1);

  //se tiver, remove
  if (existsData) {
    TaskList.splice(index, 1)
  } else {
    TaskList.push(dados);
  };
 
  localStorage.setItem('lista', JSON.stringify(TaskList));
};

function deleteLocalData(){
  //Deletar itens do localstorage

  if(window.confirm("Deseja realmente excluir sua lista?")){
    const li = document.querySelectorAll(".itemList");
    for(let i = 0; i <= li.length-1; i++ ){
        l = li[i];
        l.remove();
    };

    localStorage.removeItem('lista'); 
    createInitialELement();

    HideController();
  }
};

function CreateControlElements(total, itemsLeft){
  // criacao do botao para deletar a lista  
   const textControl = document.getElementById('textControl');

   textControl.innerText = `Concluídas: ${itemsLeft}/${total}`;
 
   const deleteListButton = document.createElement("button");
         deleteListButton.setAttribute('id', 'deleteListBtn'); 
         deleteListButton.setAttribute('onClick', "deleteLocalData()")
 
   const imgDelList = document.createElement('img');
 
   // const srcDelListIMG = "/assets/images/deleteListIMG.png"
   const srcDelListIMG = "https://i.ibb.co/R2wYWpH/delete-List-IMG.png"
         imgDelList.setAttribute('src', srcDelListIMG) 
         imgDelList.setAttribute('alt', 'DEL') 
         
         deleteListButton.appendChild(imgDelList);
 
   const ListControl = document.getElementById('ListControl');
   ListControl.style.boxShadow = "rgba(79, 78, 78, 0.522) 1px 0.1px 10px";  
   
   ListControl.appendChild(deleteListButton);
   
 
   const root = document.documentElement;
 
   //atualiza o valor da variavel no css para responsividades
   root.style.setProperty('--status-tasks', `${itemsLeft}/${total}`);
   console.log(root.style.getPropertyValue('--status-tasks'));
}

function HideController() {
  const listControl = document.getElementById('ListControl');
  listControl.style.boxShadow = "none";

  const deleteListBtn = document.getElementById('deleteListBtn');
  deleteListBtn.remove();

  const textControl = document.getElementById('textControl');
  textControl.innerText = '';
}

function UpdateController(list, isNew){
/** Atualizar as informacoes de controle */

  TaskList = JSON.parse(localStorage.getItem('lista'))||[];

  const total = isNew?TaskList.length:TaskList.length;

  let itemsDone = 0;
  for(var i=0; i<=list.length-1; i++){
    itemsDone += TaskList[i].taskDone?1:0;
  };
  const textControl = document.getElementById('textControl'); 
  textControl.innerText = `Concluídas: ${itemsDone}/${total}`;
}

function createInitialELement(){
  // criacao do elemento inicial da tela quando não tem lista
  const card = document.getElementById("card");

  const defaultImg = document.createElement('img');
  // let defaultImgSrc = `/assets/images/createNewList.png`;
  let defaultImgSrc = 'https://i.ibb.co/VtfjPKr/create-New-List.png';
  
  defaultImg.setAttribute('src', defaultImgSrc);
  defaultImg.setAttribute('id', 'defaultImg');
  const itemInput = document.getElementById('itemInput');
  defaultImg.setAttribute('onClick',`SetFocus(${itemInput.id})`);

  card.appendChild(defaultImg);
};

function GetAtualDate(){
 //funcao para pegar data atual retornando formatado

  const date = new Date();
  const day = date.getUTCDate();
  const month = date.getUTCMonth()+1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  const today = `${day}/${month}/${year} ${hour}:${min}:${sec}`;
  return today;
};

function SetFocus(element){
  alert('Muito bem! Comece digitando sua primeira tarefa...');
   element.focus();
}