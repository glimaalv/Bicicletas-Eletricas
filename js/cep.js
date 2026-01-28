let cepInvalidoAvisado = false;

document.getElementById("cep").addEventListener("blur", function () {
  const cep = this.value.replace(/\D/g, "");

  if (cep.length !== 8) {
    cepInvalidoAvisado = false;
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        if (!cepInvalidoAvisado) {
          alert("CEP não encontrado");
          cepInvalidoAvisado = true;
        }

        limparEndereco();
        return;
      }

      cepInvalidoAvisado = false;

      document.getElementById("logradouro").value = data.logradouro;
      document.getElementById("bairro").value = data.bairro;
      document.getElementById("cidade").value = data.localidade;
      document.getElementById("estado").value = data.uf.toLowerCase();
    })
    .catch(() => {
      alert("Erro ao buscar o CEP");
    });
});

function limparEndereco() {
  document.getElementById("logradouro").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("estado").value = "";
}