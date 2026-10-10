
let idEditando = null;

const formulario = document.getElementById("formulario-cadastro");

formulario.addEventListener("submit", async function (event) {
  event.preventDefault();

  const dadosForm = new FormData(formulario);

  let metodo = 'POST';
  let url = '/curriculos';

  if (idEditando) {
      metodo = 'PUT';
      url = `/curriculos/${idEditando}`;
  }

  const resposta = await fetch(url, {
    method: metodo,
    body: dadosForm
  });
  const dados = await resposta.json();

  const mensagemSucesso = document.getElementById('mensagem');
  mensagemSucesso.textContent = dados.mensagem;
  mensagemSucesso.hidden = false;

  if (resposta.ok) {
    idEditando = null;
    formulario.reset();
    mensagemSucesso.classList.remove('erro');
    carregarLista();
  } else {
    mensagemSucesso.classList.add('erro');
  }
});

async function carregarLista() {
    const resposta = await fetch('/curriculos');
    const curriculos = await resposta.json();
    

    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    if (curriculos.length === 0) {
        const item = document.createElement('li');
        item.textContent = 'Nenhum currículo cadastrado.';
        item.classList.add('vazio');
        lista.appendChild(item);
        return;
    }

    curriculos.forEach(function (curriculo) {
        const item = document.createElement('li');
        item.textContent = curriculo.nome;
        const botao = document.createElement('button');
        botao.classList.add('excluir');
        botao.textContent = 'Excluir';
        botao.addEventListener('click', async () => {
            if (!confirm('Tem certeza que deseja excluir este currículo?'))
                return;
                const resposta = await fetch(`/curriculos/${curriculo.id}`, {
                method: 'DELETE'
            });
            if (resposta.ok) {
                carregarLista()
            } else {
                alert('Erro ao excluir currículo')
            }
        });
        
        const botaoEditar = document.createElement('button');
        botaoEditar.classList.add('editar');
        botaoEditar.textContent = 'Editar';
        botaoEditar.addEventListener('click', () => {
          idEditando = curriculo.id;
          document.getElementById('nome').value = curriculo.nome;
          document.getElementById('email').value = curriculo.email;
          document.getElementById('telefone').value = curriculo.telefone;
          document.getElementById('endereco').value = curriculo.endereco;
          document.getElementById('objetivo').value = curriculo.objetivo;
          document.getElementById('formacao').value = curriculo.formacao;
          document.getElementById('experiencia').value = curriculo.experiencia;
          document.getElementById('habilidades').value = curriculo.habilidades;
        })

        item.appendChild(botao);
        item.appendChild(botaoEditar);

        if (curriculo.arquivo) {
          const link = document.createElement('a');
          link.textContent = 'Baixar';
          link.href = '/uploads/' + curriculo.arquivo;
          link.target = '_blank';
          item.appendChild(link);
        }
        lista.appendChild(item);
    });
};

carregarLista();