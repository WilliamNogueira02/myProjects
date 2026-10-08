// 1. Carregar o Express e criar o app
const express = require("express");
const app = express();

// 2. MIDDLEWARES (os "funcionários da porta")
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// 3. ROTAS
app.post("/enviar-curriculo", function (req, res) {
    console.log(req.body);
    res.send("Currículo enviado com sucesso!");
});

// 4. Ligar o servidor (sempre por último)
app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000");
});