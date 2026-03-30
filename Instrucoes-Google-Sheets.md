# Como conectar sua página com o Google Sheets

Siga este passo a passo para transformar uma Planilha do Google no seu Banco de Dados Gratuito:

### Passo 1: Crie a Planilha
1. Abra o seu [Google Drive](https://drive.google.com/) e crie uma nova "Planilha Google" em branco.
2. Na **linha 1**, escreva os seguintes cabeçalhos (um em cada coluna):
   - Coluna A: `data`
   - Coluna B: `nome`
   - Coluna C: `cpf`
3. Nomeie o arquivo (ex: "Inscritos Trilhão Rio Novo").

### Passo 2: Crie o Script (A sua API)
1. Com a planilha aberta, clique no menu superior em **Extensões** > **Apps Script**.
2. Vai abrir uma nova aba com um código. Apague tudo que estiver lá e cole este código abaixo:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  try {
    // Pega os dados que o site enviou em formato JSON
    var data = JSON.parse(e.postData.contents);
    
    // Adiciona uma nova linha com os dados
    sheet.appendRow([data.date, data.name, data.cpf]);
    
    // Responde que deu tudo certo
    return ContentService.createTextOutput(JSON.stringify({"status": "success"})).setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    // Caso dê erro
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Clique no ícone de disquete (Salvar) e dê um nome ao projeto (ex: `API Trilha`).

### Passo 3: Publique o Script (Criar a URL da API)
1. Ainda no Apps Script, clique no botão azul **Implantar** (no canto superior direito) > **Nova implantação**.
2. Na engrenagem de "Selecionar tipo", escolha **App da Web** (Web app).
3. Em "Descrição", coloque `Versão 1`.
4. Em "Executar como", deixe **Eu**.
5. Em "Quem tem acesso", mude para **Qualquer pessoa**. (MUITO IMPORTANTE!)
6. Clique em **Implantar** (Deploy).
7. *O Google vai pedir para você autorizar o acesso. Clique em "Revisar permissões", escolha sua conta, clique em "Avançado" (lá embaixo) e depois "Acessar API Trilha (não seguro)", e por fim "Permitir".*
8. Ele vai gerar uma **URL do app da Web**. Copie essa URL!

### Passo 4: Conecte no seu Site
1. Abra o arquivo `script.js` do seu projeto.
2. Encontre a linha 46 onde está comentado `// AQUI É ONDE VOCÊ CONECTA...`.
3. Descomente o código do `fetch` e cole a URL que você copiou no lugar de `SUA_CHAVE_AQUI`.
4. Salve e teste o formulário! A mágica já vai estar acontecendo e os dados caindo na planilha na mesma hora.
