var TaskList = [];

function LoadList(){
  // const checkItem = document.getElementsByTagName('LI');

  // checkItem.addEventListener('change', function(e){
  //   checkItem.style.textdecoration = "line-through";
  //   alert('Mudou!!');
  // });
  
  const storage = JSON.parse(localStorage.getItem('lista'));

  if (storage===null){
    alert('Ainda não há uma lista à fazer!\nAproite e crie uma.');
  }else{
    TaskList = storage;
    for(var i=0; i<=TaskList.length-1; i++){
      createElement(TaskList[i]);
    };
  };

};

function AddItem(){
  var task = document.getElementById('itemInput').value;

  if(task==""){
    alert('Informe um item para a lista!');
  }else{  
    TaskList.push(1, task);
    createElement(task);
    setLocalData(TaskList);
  };
}; 

function DeleteItem(){

};

function createElement(task){
    // criacao dos elementoss sendo o pai LI e filhos o input e botao

    var item = document.createElement("LI");
        item.setAttribute("class",'itemList');


    var input = document.createElement("INPUT");
        input.setAttribute("type",'checkbox');
        input.setAttribute("name",'checkItem');
        

    var label = document.createElement("LABEL");
    var labeltext = document.createTextNode(task);
        label.appendChild(labeltext);


    var buttonDelete = document.createElement("BUTTON");
        buttonDelete.setAttribute('class', 'deleteButton');

    var textButton = document.createTextNode('x');
        buttonDelete.appendChild(textButton);    

        item.appendChild(input)
        item.appendChild(label);
        item.appendChild(buttonDelete)
  
    document.getElementById("ordenedList").appendChild(item);
};

function MarkDown(){

};


function setLocalData(dados) {
  let lista = JSON.parse(localStorage
    .getItem('lista')) || []

  // se já tiver o mesmo item, revome
  const index = lista.indexOf(dados)
  const existsData = (index !== -1);

  if (existsData) {
    lista.splice(index, 1)
  } else {
    lista.push(dados);
  };

  // insere no local storage
  localStorage.setItem('lista', JSON.stringify(lista));
};
