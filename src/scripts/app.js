var TaskList = [];
var itemInfo = {};
var itemID = '';


function LoadList(){
  const storage = JSON.parse(localStorage.getItem('lista'));

  if (storage===null||storage.length==0){
    alert('Ainda não há uma lista à fazer!\nAproite e crie uma.');
  }else{
    TaskList = storage;
    for(var i=0; i<=TaskList.length-1; i++){
      createElementHTML(TaskList[i].id, TaskList[i].description, TaskList[i].taskDone);
    };
  };
};

function AddItem(){
  const storage = JSON.parse(localStorage.getItem('lista'));
  // const idStorage = (storage===null?1:storage.length-1);
  // const idTaskList = (TaskList==0?0:TaskList.length+1);
  const idTaskList = TaskList.length+1;
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
    createElementHTML(idTaskList, task, false);
  }else{  
    alert('Informe um item para a lista!');
  };
}; 

function DeleteItem(id, idElement){
  TaskList.splice(id-1, 1);

  if (!(TaskList == [])){
    localStorage.setItem('lista', JSON.stringify(TaskList)); 
  };

  const item = document.getElementById(idElement);
  item.remove();
};

function createElementHTML(id, task, taskDone){

  // criacao dos elementoss sendo o pai LI e filhos o input e botao
  const itemID = `item_000${id}`;

  const item = document.createElement("LI");
        item.setAttribute("class",'itemList');
        item.setAttribute("id", `${itemID}`);


  const input = document.createElement("INPUT");
        input.setAttribute("type",'checkbox');
        input.setAttribute("name",'checkItem');
        input.setAttribute("checked", taskDone);
        input.setAttribute("OnChange",`MarkDown(${id},"${itemID}")`);

      
  const label = document.createElement("LABEL");
  const labeltext = document.createTextNode(task);
        label.appendChild(labeltext);


  const buttonDelete = document.createElement("BUTTON");
        buttonDelete.setAttribute('class','deleteButton');
        buttonDelete.setAttribute('OnClick',`DeleteItem(${id},"${itemID}")`);

  const textButton = document.createTextNode('x');
        buttonDelete.appendChild(textButton);    

      item.appendChild(input);
      item.appendChild(label);
      item.appendChild(buttonDelete);

  document.getElementById("ordenedList").appendChild(item);
  console.log(input);
};

function MarkDown(id, idElement){
  const item = document.getElementById(idElement);

  if(item.style.textDecorationLine==''||item.style.textDecorationLine=='none'){
    item.style.textDecorationLine = "line-through"; 
  }else{
    item.style.textDecorationLine = "none"; 
  }

  UpdateItem(id-1);
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

function UpdateItem(id){
  const storage = JSON.parse(localStorage.getItem('lista'));
  TaskList = storage;

  console.log(TaskList[id]);
  console.log(storage[id]);

  const itemInfo = {
    id: storage[id].id,
    description: storage[id].description,
    taskDone: storage[id].taskDone?false:true,
    dateCreation: storage[id].dateCreation,
    dateUpdate: GetAtualDate()
  };
  
  TaskList.splice(id, 1, itemInfo);
  console.log(TaskList[id]);

  if (!(TaskList == [])){
    localStorage.setItem('lista', JSON.stringify(TaskList)); 
  };
};

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

function testeCheck(){
  const item = document.getElementById("itemwerik");
  // item.setAttribute("checked", "true");

  item.click();

  console.log(item);
}