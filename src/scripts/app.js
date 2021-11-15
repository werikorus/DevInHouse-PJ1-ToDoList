var TaskList = [];
var itemInfo = {};
var itemID = '';

function LoadList(){
  const storage = JSON.parse(localStorage.getItem('lista'));

  if (storage===null||storage.length==0){
    alert('Bem vindo!\nCrie sua lista agora! :)');
    const card = document.getElementById("card");

    const defaultImg = document.createElement('img');
    let defaultImgSrc = `/assets/images/createNewList.png`;
    defaultImg.setAttribute('src', defaultImgSrc);
    defaultImg.setAttribute('id', 'defaultImg');

    card.appendChild(defaultImg);
  }else{
    TaskList = storage;
    for(var i=0; i<=TaskList.length-1; i++){
      var countItensLeft=0;
      if(TaskList[i].taskDone){
        countItensLeft+=1;
      }
      console.log(countItensLeft)

        
      createListElements(TaskList[i].id, 
                         TaskList[i].description, 
                         TaskList[i].taskDone);
    };
    CreateControlElements(TaskList.length, 1);
  };
};

function AddItem(){
  const storage = JSON.parse(localStorage.getItem('lista'));
  TaskList = storage;

  const idTaskList = TaskList.length||TaskList.length+1;
  var task = document.getElementById('itemInput').value;

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
    task.InnerContent = '';
  }else{  
    alert('Iforme uma tarefa!');
  };
  
}; 

function DeleteItem(id, Element){
  if(window.confirm("Quer realmente excluir o item da sua tarefa?")){
     TaskList.splice(id-1, 1);
 
     if (!(TaskList == [])){
       localStorage.setItem('lista', JSON.stringify(TaskList)); 
     };

     Element.remove();    
  }
};

function UpdateItem(id){
  const storage = JSON.parse(localStorage.getItem('lista'));
  TaskList = storage;

  const itemInfo = {
    id: storage[id].id,
    description: storage[id].description,
    taskDone: storage[id].taskDone?false:true,
    dateCreation: storage[id].dateCreation,
    dateUpdate: GetAtualDate()
  };
 
  TaskList.splice(id, 1, itemInfo);
 
  if(!(TaskList == [])){
    localStorage.setItem('lista', JSON.stringify(TaskList)); 
  };
}; 

function CheckItem(id, label){
  if(label.style.textDecorationLine==''||label.style.textDecorationLine=='none'){
    label.style.textDecorationLine = "line-through"; 
    label.style.fontStyle = "italic";
    label.style.opacity = 0.5;
  }else{
    label.style.textDecorationLine = "none";
    label.style.fontStyle = "normal";
    label.style.opacity = 1;
  };

  UpdateItem(id-1);
};

function createListElements(id, taskCaption, taskDone){
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
  TaskList = JSON.parse(localStorage.getItem('lista')) || [];

  // se já tiver o mesmo item, revome
  const index = TaskList.indexOf(dados)
  const existsData = (index !== -1);

  //splice apaga  o item de acordo com sua posição
  if (existsData) {
    TaskList.splice(index, 1)
  } else {
    TaskList.push(dados);
  };

  // insere no local storage
  localStorage.setItem('lista', JSON.stringify(TaskList));
};

function deleteLocalData(){
  if(window.confirm("Deseja realmente excluir sua lista?")){
    const itemsLista = document.getElementsByTagName("li");
    
    for(var i=0; i<=itemsLista.length+1; i++){
      itemsLista[0].remove();
    }
    
    localStorage.clear(); 
  }
}

function CreateControlElements(total, totalLeft){
  console.log(`Concluídas: ${total}/${totalLeft}`);


  // criacao do botao para deletar a lista   
  const textControl = document.getElementById('textControl');

  textControl.innerText = `Concluídas: ${total}/${totalLeft}`;

  const deleteListButton = document.createElement("button");
        deleteListButton.setAttribute('id', 'deleteListBtn'); 
        deleteListButton.setAttribute('onClick', "deleteLocalData()")

  const imgDelList = document.createElement('img');

  const srcDelListIMG = "/assets/images/deleteListIMG.png"
        imgDelList.setAttribute('src', srcDelListIMG) 
        deleteListButton.appendChild(imgDelList);

  const form = document.getElementById('ListControl');  
  
  form.appendChild(deleteListButton);
}

function Confirm(){
  // criação de um popup estilizado

  const body = document.getElementsByTagName('body');
  //       body[0].style = 0.01;
  
  const PopUp = document.createElement('div');
  const popUpContent = document.createTextNode("CONFIRMA??")
        PopUp.appendChild(popUpContent);
        PopUp.style.backgroundColor = "blue";
}

function GetAtualDate(){
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