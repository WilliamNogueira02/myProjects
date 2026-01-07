let BotaoAdd = document.getElementById("botao");
let BotaoRemove = document.getElementById("botao-remover");
let Input = document.getElementById("input-tarefa");
let Tarefas = document.getElementById("tarefas");

BotaoAdd.addEventListener("click", function () {
  if (Input.value != "") {
    var tarefa = document.createElement("p");
    Tarefas.appendChild(tarefa);
    tarefa.innerText = "- " + Input.value;
    Input.value = "";
    tarefa.addEventListener("click", function () {
      if (tarefa.style.textDecoration === "line-through") {
        tarefa.style.textDecoration = "none";
      } else {
        tarefa.style.textDecoration = "line-through";
      }
    });
    tarefa.addEventListener("dblclick", function () {
      Tarefas.removeChild(tarefa);
    });
  }
});

BotaoRemove.addEventListener("click", function () {
  if (Tarefas.lastChild) {
    Tarefas.removeChild(Tarefas.lastChild);
  }
});
