var TaskList = [];
var itemInfo = {};
var itemID = '';

function LoadList(){
// carregamento dos dados do localstorage na tela

  const TaskList = JSON.parse(localStorage.getItem('lista'))||[];

  if (TaskList===null||TaskList.length==0){
    alert('Bem vindo!\nCrie sua lista agora! :)');
    createInitialELement();
  }else{
    let countListLeft = 0;
    for(var i=0; i<=TaskList.length-1; i++){
      countListLeft += !TaskList[i].taskDone?0:1;

      createListElements(TaskList[i].id, 
                         TaskList[i].description, 
                         TaskList[i].taskDone);
    };
    CreateControlElements(TaskList.length, countListLeft);
  };
};

function AddItem(){
// adiconar 1 item na lista

  const TaskList = JSON.parse(localStorage.getItem('lista'))||[];
  const idTaskList = TaskList!==null?TaskList.length+1:0;
  const task = document.getElementById('itemInput').value;
  const Input = document.getElementById('itemInput');

  if(task!=""){
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

    if(TaskList[0]==1){
      CreateControlElements(1,0);
    }else{
      let countListLeft = 0;

      for(var i=0; i<=TaskList.length-1; i++){
        countListLeft += TaskList[i].taskDone?1:0;
      };
    
      UpdateController(TaskList.length-1, countListLeft);
    }
  }else{  
    alert('Iforme uma tarefa!');
  };
  
}; 

function DeleteItem(id, Element){
// deletar 1 item da lista

  if(window.confirm("Quer realmente excluir o item da sua tarefa?")){
     TaskList.splice(id-1, 1);
 
     if (!(TaskList == [])){
       localStorage.setItem('lista', JSON.stringify(TaskList)); 
     };

     Element.remove();    
  }

  if(TaskList.length==0||TaskList!==null){
    const controller = document.getElementById('ListControl');
    controller.remove();  
  }
};

function UpdateItem(id){
// atualizar o item

  TaskList = JSON.parse(localStorage.getItem('lista'));

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
}; 

function CheckItem(id, label){
// marcar  e estilizasr o item quando a tarefa tiver concluida

  TaskList = JSON.parse(localStorage.getItem('lista'));

  let countListLeft = 0;

  for(var i=0; i<=TaskList.length-1; i++){
    countListLeft += !(TaskList[i].taskDone)?0:1;
  };

  if(label.style.textDecorationLine==''||label.style.textDecorationLine=='none'){
    label.style.textDecorationLine = "line-through"; 
    label.style.fontStyle = "italic";
    label.style.opacity = 0.5;
  }else{
    label.style.textDecorationLine = "none";
    label.style.fontStyle = "normal";
    label.style.opacity = 1;
  };

  UpdateController(TaskList.length, countListLeft);
  UpdateItem(id-1);
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
  const srcdel = "/assets/images/deleteIMG.png";

        delImg.setAttribute('src', srcdel);
        delImg.setAttribute('name','deleteIMG');

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

  TaskList = JSON.parse(localStorage.getItem('lista')) || [];

  //verifica se já existe no array
  const index = TaskList.indexOf(dados)
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
    const itemsLista = document.getElementsByTagName("li");
    
    for(var i=0; i<=itemsLista.length+1; i++){
      itemsLista[0].remove();
    }
    localStorage.removeItem('lista'); 
  }

  const controller = document.getElementById('ListControl');
  controller.remove();  
};

function CreateControlElements(total, itemsLeft){
  // criacao do botao para deletar a lista   
  const textControl = document.getElementById('textControl');

  textControl.innerText = `Concluídas: ${itemsLeft}/${total}`;

  const deleteListButton = document.createElement("button");
        deleteListButton.setAttribute('id', 'deleteListBtn'); 
        deleteListButton.setAttribute('onClick', "deleteLocalData()")

  const imgDelList = document.createElement('img');

  const srcDelListIMG = "/assets/images/deleteListIMG.png"
        imgDelList.setAttribute('src', srcDelListIMG) 
        deleteListButton.appendChild(imgDelList);

  const form = document.getElementById('ListControl');  
  
  form.appendChild(deleteListButton);

  const root = document.documentElement;

  //atualiza o valor da variavel no css para responsividades
  root.style.setProperty('--status-tasks', `${itemsLeft}/${total}`);

  console.log(root.style.getPropertyValue('--status-tasks'));
}

function UpdateController(total, itemsLeft){
// atualizar as informacoes de controle

const textControl = document.getElementById('textControl'); 
  textControl.innerText = `Concluídas: ${itemsLeft}/${total}`;
}
function createInitialELement(){
  // criacao do elemento inicial da tela quando não tem lista
  const card = document.getElementById("card");

  const defaultImg = document.createElement('img');
  let defaultImgSrc = `/assets/images/createNewList.png`;
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