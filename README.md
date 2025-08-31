# 💼 Sistema de Etiquetas com QR Code

O Sistema de Etiquetas é uma aplicação web desenvolvida para facilitar a geração e impressão de etiquetas de produtos com informações completas, incluindo QR Code contendo dados organizados para leitura via scanner. O sistema foi pensado para uso corporativo interno, permitindo que colaboradores façam login seguro, preencham dados do produto e distribuam quantidades em volumes, gerando etiquetas individuais para cada volume.

Este projeto é construído com HTML, CSS e JavaScript puro (Vanilla), integrando dados via Google Sheets e utilizando QR Codes para otimizar o registro e rastreamento no estoque.

---

# 🚀 Acesse o sistema
[Sistema de Etiquetas](https://sistema-etiqueta.vercel.app/)


![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Google Sheets](https://img.shields.io/badge/Google%20Sheets-34A853?logo=google-sheets&logoColor=white)
![QRCode](https://img.shields.io/badge/QR%20Code-000000?logo=qrcode&logoColor=white)


---

# 🛠️ Funcionalidades principais

- 📦 Registro detalhado de volumes e quantidades  
- 📝 Autopreenchimento de descrição e fornecedor via Google Sheets  
- 📊 Geração dinâmica de múltiplas etiquetas, uma por volume  
- 📱 QR Code gerado para cada etiqueta com dados estruturados na ordem:  
  **Data; Código; Fornecedor; Descrição; Quantidade total; Volumes**  
- 🖨️ Visualização pronta para impressão, formato personalizado (100x150mm)  
- ✅ Validação completa dos campos e somatório correto dos volumes  
- 🔄 Navegação fluida entre campos com tecla Enter  

---

# 🔌 Tecnologias e Integrações

| Tecnologia        | Uso                                             |
|-------------------|------------------------------------------------|
| HTML5/CSS3        | Interface limpa e responsiva                    |
| JavaScript        | Lógica de formulário, manipulação DOM e QRCode |
| Google Sheets     | Fonte de dados para produtos (descrição/fornecedor) |
| QRCode.js         | Geração dos códigos QR para as etiquetas        |

---

# 🔄 Fluxo de funcionamento

1. Usuário faz login com usuário e senha cadastrados.  
2. Preenche campos de origem, destino, código do produto, quantidade total.  
3. Sistema busca descrição e fornecedor no Google Sheets.  
4. Usuário distribui a quantidade total em volumes, cada volume gerando um input dinâmico.  
5. Após confirmação, o sistema gera as etiquetas com QR Code e formatação para impressão.  
6. O QR Code contém dados organizados para facilitar a leitura no Excel ou sistema de estoque.  

---

# 🧪 Possíveis melhorias

- Login seguro com Firebase Authentication  
- Integração com banco de dados para histórico de impressões  
- Versão mobile otimizada para tablets e smartphones  
- Controle de permissões por perfil de usuário (admin, operador)  

---

# 🧠 Aprendizados aplicados

- Controle avançado de formulários com inputs dinâmicos  
- Validação e lógica para somatório correto de volumes  
- Integração de front-end com APIs públicas (Google Sheets)  
- Geração dinâmica e estilizada de documentos para impressão  
- Utilização da biblioteca QRCode.js para codificação visual legível por scanner  

---

# 👨‍💻 Sobre o projeto

Desenvolvido para automação do processo de etiquetagem no ambiente corporativo, este sistema visa simplificar a geração rápida de etiquetas individualizadas, reduzindo erros de conferência e acelerando a logística de entrada e saída de produtos.

---

# 📫 Contato

- GitHub: @bnocrv  
- LinkedIn: @bnocrv  

---

# 📅 Últimas atualizações (Ago/2025)

- Implementação da geração dinâmica de volumes e etiquetas  
- Integração com Google Sheets para autopreenchimento de dados  
- QR Code gerado com dados estruturados para leitura via scanner  
- Validação completa dos campos e lógica de somatório de volumes  
- Impressão formatada em tamanho padrão para etiquetas físicas  
