// Validando o telefone
const campoTelefone = document.getElementById("phone");
campoTelefone.addEventListener("input", function() {

    // Parte 1: ficar só com números, no máximo 11
    let numeros = campoTelefone.value.replace(/\D/g, "").slice(0, 11);

    // Parte 2: Montar a máscara conforme os dígitos que existem
    let formatado = "";

    if (numeros.length > 0) {
        formatado = `(${numeros.slice(0, 2)}`;    
    }
    
    if (numeros.length > 2) {
        formatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}`;

    }

    if (numeros.length > 7) {
        formatado = formatado + `-${numeros.slice(7)}`;

    }

    // Parte 3: Devolver o resultado ao campo
    campoTelefone.value = formatado;
});

// Validando o E-mail
const validarEmail = document.getElementById("email");
validarEmail.addEventListener("input", function() {
    const email = validarEmail.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        validarEmail.setCustomValidity("Por favor, insira um email válido.");
    } else {
        validarEmail.setCustomValidity("");
    }
});

// Limites de tamanho nos campos de texto
const camposTexto = document.getElementById("resume");
camposTexto.addEventListener("input", function() {
    if (camposTexto.value.length > 500) {
        camposTexto.value = camposTexto.value.substring(0, 500);
    }
});

// Validando as vagas
const campoVaga = document.getElementById("vaga");
campoVaga.addEventListener("input", function() {
    const vagasAbertas = ["Operador de Caixa", "Atendente de Loja", "Auxiliar Administrativo", "Padeiro"]
    if (!vagasAbertas.includes(campoVaga.value)) {
        campoVaga.setCustomValidity("Por favor, selecione uma vaga válida.");
    } else {
        campoVaga.setCustomValidity("");
    }
});

// Validando arquivos de curriculos
const campoCurriculum = document.getElementById("curriculum");
campoCurriculum.addEventListener("input", function() {
    const arquivo = campoCurriculum.files[0];
    if (arquivo) {
        const tipo = arquivo.type;
        const tamanhosPermitidos = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        if (!tamanhosPermitidos.includes(tipo)) {
            campoCurriculum.setCustomValidity("Por favor, selecione um arquivo de currículo válido (PDF, DOC ou DOCX).");
        } else {
            campoCurriculum.setCustomValidity("");
        }
    }
});