const usuarios = [
  { user: "admin", senha: "1234" },
  { user: "joao", senha: "senha123" },
  { user: "maria", senha: "senha456" },
];

let usuarioLogado = "";

// Helper para focar próximo input
function focusNext(inputs, index) {
  if (index + 1 < inputs.length) {
    inputs[index + 1].focus();
  }
}

// LOGIN: Enter e botão
document.getElementById("loginUser").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("loginPass").focus();
  }
});
document.getElementById("loginPass").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    fazerLogin();
  }
});

function fazerLogin() {
  const u = document.getElementById("loginUser").value.trim();
  const s = document.getElementById("loginPass").value.trim();
  const validado = usuarios.find((item) => item.user === u && item.senha === s);

  if (validado) {
    usuarioLogado = validado.user;
    document.querySelector(".login").style.display = "none";
    document.querySelector(".formulario").style.display = "block";
    document.getElementById("origem").focus();
    document.getElementById("loginMsg").innerText = "";
  } else {
    document.getElementById("loginMsg").innerText =
      "Usuário ou senha inválidos.";
  }
}

// Navegação com Enter no formulário
const formCamposIds = ["origem", "destino", "codigo", "quantTotal"];

formCamposIds.forEach((id, i) => {
  const el = document.getElementById(id);
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (id === "codigo") {
        buscarProduto().then(() => {
          document.getElementById("quantTotal").focus();
        });
      } else if (id === "quantTotal") {
        const total = parseInt(el.value);
        if (total && total > 0) {
          criarVolumesFluidos(total);
        }
      } else {
        focusNext(
          formCamposIds.map((id) => document.getElementById(id)),
          i
        );
      }
    }
  });
});

// Busca produto (simulado via API)
async function buscarProduto() {
  const codigo = document.getElementById("codigo").value.trim();
  if (!codigo) return;

  const url =
    "https://opensheet.elk.sh/1c88BAncBpS7XWzMrYdEfYM78hJ95-e8qCt_SqH1ZPRI/BaseProdutos";

  try {
    const resp = await fetch(url);
    const data = await resp.json();
    const produto = data.find((p) => p.Código === codigo);

    if (produto) {
      document.getElementById("descricao").value = produto.Descrição;
      document.getElementById("fornecedor").value = produto.Fornecedor;
    } else {
      document.getElementById("descricao").value = "";
      document.getElementById("fornecedor").value = "";
      alert("Código não encontrado.");
      document.getElementById("codigo").focus();
    }
  } catch {
    alert("Erro ao buscar dados da planilha.");
  }
}

// Controle volumes dinâmicos
const volumesContainer = document.getElementById("volumesContainer");
let volumesQtds = [];

function criarVolumesFluidos(total) {
  volumesContainer.innerHTML = "";
  volumesQtds = [];

  function criarInputVolume(index) {
    if (index >= total) return;

    const divVol = document.createElement("div");
    divVol.className = "volume";

    const label = document.createElement("label");
    label.innerText = `Volume ${index + 1}:`;
    divVol.appendChild(label);

    const input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.placeholder = "Quantidade";
    input.required = true;
    input.className = "volumeQtd";
    divVol.appendChild(input);

    volumesContainer.appendChild(divVol);

    volumesQtds[index] = 0;

    input.focus();

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        const val = parseInt(input.value);
        if (!val || val <= 0) {
          alert("Digite uma quantidade válida maior que zero.");
          input.focus();
          return;
        }

        // Soma dos volumes menos volume atual + novo valor
        const somaAtual = volumesQtds.reduce(
          (acc, cur, i) => (i === index ? acc : acc + cur),
          0
        );
        const somaVolumes = somaAtual + val;

        if (somaVolumes > total) {
          alert("A soma dos volumes não pode ultrapassar a quantidade total.");
          input.value = "";
          input.focus();
          return;
        }

        volumesQtds[index] = val;

        if (somaVolumes === total) {
          // Bloqueia inputs
          Array.from(document.querySelectorAll(".volumeQtd")).forEach((inp) => {
            inp.disabled = true;
          });
          document.querySelector(".formulario button").focus();
        } else {
          criarInputVolume(index + 1);
          const inputs = document.querySelectorAll(".volumeQtd");
          if (inputs[index + 1]) inputs[index + 1].focus();
        }
      }
    });
  }

  criarInputVolume(0);
}

// Gerar e imprimir etiquetas
function gerarEtiqueta() {
  const origem = document.getElementById("origem").value.trim();
  const destino = document.getElementById("destino").value.trim();
  const codigo = document.getElementById("codigo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const fornecedor = document.getElementById("fornecedor").value.trim();
  const total = parseInt(document.getElementById("quantTotal").value);

  if (!origem) {
    alert("Preencha o campo Origem.");
    document.getElementById("origem").focus();
    return;
  }
  if (!destino) {
    alert("Preencha o campo Destino.");
    document.getElementById("destino").focus();
    return;
  }
  if (!codigo || !descricao || !fornecedor || !total) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  const volumesInputs = document.querySelectorAll(".volumeQtd");
  if (volumesInputs.length === 0) {
    alert("Preencha os volumes.");
    document.getElementById("quantTotal").focus();
    return;
  }

  const volumes = Array.from(volumesInputs).map(
    (input) => parseInt(input.value) || 0
  );
  const somaVolumes = volumes.reduce((a, b) => a + b, 0);

  if (somaVolumes !== total) {
    alert("A soma dos volumes deve ser igual à quantidade total.");
    return;
  }

  const totalVolumes = volumes.length;

  const printWindow = window.open("", "", "width=600,height=800");
  const doc = printWindow.document;

  doc.write(`
    <html>
      <head>
        <title>Imprimir Etiquetas</title>
        <style>
          @page {
            size: 100mm 150mm;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 12px 16px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: white;
          }
          .etiquetaModelo {
            width: 100mm;
            height: 150mm;
            padding: 12px 16px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 8px;
            color: #222;
            margin-bottom: 20px;
            page-break-after: always;
          }
          .topo-logo {
            margin-bottom: 10px;
            text-align: left;
          }
          .topo-logo img {
            height: 40px;
            width: auto;
            display: inline-block;
          }
          .origem {
            font-size: 13px;
            margin-bottom: 8px;
          }
          .destino {
            font-size: 24px;
            margin-bottom: 8px;
            font-weight: normal;
          }
          .destino strong {
            font-weight: 900;
          }
          .codigo {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: normal;
          }
          .codigo strong {
            font-weight: 900;
            font-size: 34px;
            letter-spacing: 1.1px;
          }
          .descricao,
          .fornecedor,
          .total {
            font-size: 18px;
            margin-bottom: 6px;
          }
          .total strong {
            font-weight: 900;
          }
          .volumes {
            font-size: 16px;
            margin-top: 16px;
          }
          .volumes span.info {
            font-weight: normal;
            margin-right: 8px;
          }
          .volumes span.quantidade {
            font-weight: 900;
            font-size: 22px;
          }
          .rodape {
            font-size: 11px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 8px;
            margin-top: 12px;
            display: flex;
            justify-content: space-between;
            font-style: italic;
            user-select: none;
          }
        </style>
      </head>
      <body>
      </body>
    </html>
  `);

  const body = doc.body;

  // Carrega a lib do QRCode.js na janela de impressão
  const scriptQRCode = doc.createElement("script");
  scriptQRCode.src =
    "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
  doc.head.appendChild(scriptQRCode);

  scriptQRCode.onload = () => {
    volumes.forEach((qtd, i) => {
      const divEtiqueta = doc.createElement("div");
      divEtiqueta.className = "etiquetaModelo";

      divEtiqueta.innerHTML = `
        <div class="topo-logo">
          <img src="https://res.cloudinary.com/dmpqzayaa/image/upload/v1756312909/sqt5fplglswwk8isu9co.jpg" alt="Logo Empresa" />
        </div>
        <div class="origem">Origem: <span class="etqOrigem">${origem}</span></div>
        <div class="destino">Destino: <strong>${destino}</strong></div>
        <div class="codigo">Código: <strong>${codigo}</strong></div>
        <div class="descricao">Descrição: <span class="etqDescricao">${descricao}</span></div>
        <div class="fornecedor">Fornecedor: <span class="etqFornecedor">${fornecedor}</span></div>
        <div class="total">Total: <strong>${total}</strong></div>
        <div class="volumes">Volumes: <span class="info">${
          i + 1
        }/${totalVolumes}</span> <strong class="quantidade">(${qtd} peças)</strong></div>
        <div id="qrcode${i}"></div>
        <div class="rodape">
          <div>Etiqueta gerada por: ${usuarioLogado}</div>
          <div>Data: ${new Date().toLocaleString("pt-BR")}</div>
        </div>
      `;

      body.appendChild(divEtiqueta);

      // Gera o QRCode
      new printWindow.QRCode(doc.getElementById(`qrcode${i}`), {
        text: codigo,
        width: 140,
        height: 140,
      });
    });

    // Dá um pequeno delay para garantir a geração dos QRCodes antes de imprimir
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      // printWindow.close(); // Se quiser fechar a janela automaticamente após imprimir, descomente esta linha
    }, 500);
  };
}
