function LoadList(){
  const storage = JSON.parse(localStorage.getItem('companies'));

  if (storage===null){
    var messageReturn = [{
      message: "Ainda não há históricos"
    }];
    setMessages(messageReturn);
  }else{
    setCompanies(storage);
  };
};

function AddItem(){
  const task = document.getElementById('itemInput').value;
  
  var TaskList = [];

  TaskList.push(task);

  // criacao dos elementoss sendo o pai LI e filhos o input e botao

  var nodeLI = document.createElement("LI");
  var valuenode = document.createTextNode("wawsdfas");
      nodeLI.appendChild(valuenode);

  var item = document.createElement("INPUT");
      item.setAttribute("type",'checkbox');

  var label = document.createElement("LABEL");
  var labeltext = document.createTextNode(task);
      label.appendChild(labeltext);

  item.appendChild(label);

  console.log(label);


  var valueItem = document.createTextNode(task);
      item.appendChild(valueItem);

       

    // var deleteButton = document.createElement("BUTTON");
    // deleteButton.setAttribute("class", "deleteButton")
  
  document.getElementById("ordenedList").appendChild(label);

  // console.log(TaskList);

  // for(var i=0; i<=TaskList.length-1; i++){
  //   <li typeclass="itemList">
  //   <input  type="checkbox">Primeiro item</input> 
  //   <button class="deleteButton">x</button>
  // </li>

  //   console.log(TaskList[i]);
  // }
 
}; 

function DeleteItem(){

};

function createElement(){
  // rotinas para criação dos elemntos aqui
};

function MarkDown(){

};


function setLocalData(dados) {
  let empresas = JSON.parse(localStorage
    .getItem('companies')) || []

  //  se ja tem o mesmo valor dentro do localStorage, remover
  const index = empresas.indexOf(dados)
  const existsInLocalStorage = (index !== -1);

  if (existsInLocalStorage) {
    empresas.splice(index, 1)
  } else {
    empresas.push(dados)
  };

  // insere no local storage
  localStorage.setItem('companies', JSON.stringify(empresas));
};
