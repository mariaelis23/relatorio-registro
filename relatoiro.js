const modalEditar = document.getElementById("modal-editar");
const campoData = document.getElementById("campo-data");
const campoHora = document.getElementById("campo-hora");
const campoTipo = document.getElementById("campo-tipo");
const botaoSalvar = document.getElementById("botao-salvar");
const botaoFechar = document.getElementById("botao-fechar");

// Adiciona um registro fictício ao localStorage se a lista estiver vazia
let listaRegistros = JSON.parse(localStorage.getItem("registros")) || [];
if (listaRegistros.length === 0) {
    listaRegistros.push({
        data: "2024-11-10",
        hora: "08:00",
        tipo: "entrada"
    });
    localStorage.setItem("registros", JSON.stringify(listaRegistros));
}

let indiceRegistroAtual = null;

function exibirLista() {
    const containerRegistros = document.getElementById("lista-registros");
    containerRegistros.innerHTML = "";

    // Agrupa os registros por data
    const registrosPorData = {};
    listaRegistros.forEach((registro) => {
        if (!registrosPorData[registro.data]) {
            registrosPorData[registro.data] = [];
        }
        registrosPorData[registro.data].push(registro);
    });

    // Exibe os registros agrupados
    for (const data in registrosPorData) {
        const registros = registrosPorData[data];

        const dataHeader = document.createElement("h2");
        dataHeader.textContent = data;
        containerRegistros.appendChild(dataHeader);

        const lista = document.createElement("ul");
        registros.forEach((registro, indice) => {
            const li = document.createElement("li");
            const tipoFormatado = registro.tipo.charAt(0).toUpperCase() + registro.tipo.slice(1);
            li.innerHTML = `
                ${registro.hora} - ${tipoFormatado}
                <button onclick="abrirModalEditar(${indice})">Editar</button>
                <button onclick="mostrarAlertaExcluir()">Excluir</button>
            `;
            lista.appendChild(li);
        });
        containerRegistros.appendChild(lista);
    }
}

function abrirModalEditar(indice) {
    indiceRegistroAtual = indice;
    const registro = listaRegistros[indice];

    campoData.value = registro.data;
    campoHora.value = registro.hora;
    campoTipo.value = registro.tipo;

    modalEditar.showModal();
}

botaoSalvar.addEventListener("click", () => {
    if (indiceRegistroAtual !== null) {
        listaRegistros[indiceRegistroAtual].data = campoData.value;
        listaRegistros[indiceRegistroAtual].hora = campoHora.value;
        listaRegistros[indiceRegistroAtual].tipo = campoTipo.value;

        localStorage.setItem("registros", JSON.stringify(listaRegistros));
        exibirLista();
        modalEditar.close();

        alert("Registro atualizado com sucesso!");
    }
});

botaoFechar.addEventListener("click", () => {
    modalEditar.close();
});

function mostrarAlertaExcluir() {
    alert("O ponto não pode ser excluído.");
}

exibirLista();
