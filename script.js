const btn = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-task')

let mylist = []

function adicionarNovaTarefa() {
    if (input.value.trim() === "") return;

    mylist.push({
        tarefa: input.value,
        concluida: false
    })
    mostrarTarefa()
    input.value = ""
}

function mostrarTarefa() {
    let novaLi = ""
    mylist.forEach((task, posicao) => {
        novaLi += `
        <li class="task ${task.concluida ? "done" : ""}">
            <i class="bi bi-check-circle-fill img check ${task.concluida ? "checkwhite" : ""}" onclick="concluirTarefa(${posicao})"></i>
            <p>${task.tarefa}</p>
            <i class="bi bi-trash3-fill img delete" onclick="deletarItem(${posicao})"></i>
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

input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarNovaTarefa()
    }
})
