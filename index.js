const express = require ('express');
const mongoose = require('mongoose');
const server = express();

const funcionarioRoutes = require('./routes/funcionarioRoutes');

//Middleware
server.use(
    express.urlencoded({
        extended: true,
    }),
);


server.use(express.json());

//Criando o endpoint e as rotas da minha API
server.use('/funcionario', funcionarioRoutes);


//Conexão com MongoDB Atlas
const DB_USER = 'eduardovbfreitas'
const DB_PASSWORD = encodeURIComponent('jackmacaco')

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.qgegyo5.mongodb.net/`
)
.then(()=>{
    console.log('Conectado ao MongoDB');
})
.catch((err)=>{
    console.log(err);
})

//Porta do servidor
server.listen(3000);