const btn = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-task')

let mylist = []

function adicionarNovaTarefa() {
    if (input.value.trim() === "") return;

    const date = new Date(); 
    const formattedDate = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    mylist.push({
        tarefa: input.value,
        data: formattedDate,
        concluida: false
    });

    mostrarTarefa();
    input.value = "";
}

function mostrarTarefa() {
    let novaLi = ""
    mylist.forEach((task, posicao) => {
        novaLi += `
        <li class="task ${task.concluida ? "done" : ""}">
            <div class="content">
                <p>${task.tarefa}</p>
                <small class="task-date check ${task.concluida ? "task-date-complete" : ""}">${task.data}</small>
            </div>
            <div class="icons">
                <i class="bi bi-check-circle-fill img check ${task.concluida ? "checkwhite" : ""}" onclick="concluirTarefa(${posicao})"></i>
                <i class="bi bi-trash3-fill img delete" onclick="deletarItem(${posicao})"></i>
            </div>
        </li>
        `
    })

    listaCompleta.innerHTML = novaLi
    localStorage.setItem('lista', JSON.stringify(mylist))
}

function concluirTarefa(posicao) {
    mylist[posicao].concluida = !mylist[posicao].concluida
    mostrarTarefa()
}

function deletarItem(posicao) {
    mylist.splice(posicao, 1)
    mostrarTarefa()
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')
    if (tarefasDoLocalStorage) {
        mylist = JSON.parse(tarefasDoLocalStorage)
    }
    mostrarTarefa()
}

recarregarTarefas()
btn.addEventListener('click', adicionarNovaTarefa)

input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        adicionarNovaTarefa()
    }
})