const express = require('express');
const app = express();
const path = require('path');
const mysql = require("mysql");

// Configurando o mecanismo de visualização Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Dados a serem passados para o template
const data = {
  pageTitle: 'Exemplo Pug Dinâmico com Express e Bootstrap',
  pageDescription: 'Esta é uma página de exemplo usando Pug com Express para valores dinâmicos e Bootstrap para layout responsivo.',
  items: ['Item 1', 'Item 2', 'Item 3','Item 4','Item 5'], 
  observacao: 'ESTA É A MINHA OBSERVAÇÃO',
  tabela: null, 
};

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'redes21',
  database: 'meuBanco',
});

// Rota para renderizar o template com os dados
app.get('/', (req, res) => {
  res.render('template', data);
});

// Rota para renderizar o template com os dados
app.get('/', (req, res) => {
  // Consulta no banco de dados usando um SELECT
  const sql = 'SELECT * FROM sua_tabela';
  connection.query(sql, (error, results) => {
    if (error) throw error;

    // Armazena os resultados da consulta na propriedade 'tabela' do objeto 'data'
    data.tabela = results;

    // Renderiza o template 'template.pug' com os dados atualizados
    res.render('template', data);
  });
});

// Servindo arquivos estáticos do Bootstrap, jQuery e CSS personalizado
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, '/estilos')));

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado em http://localhost:3000');
});

/*// Servindo arquivos estáticos do Bootstrap, jQuery e CSS personalizado
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, '/estilos')));

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado em http://localhost:3000');
});
*/