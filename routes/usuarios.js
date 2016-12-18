var express = require('express');
var router = express.Router();
var conn = require("../conn");

var doctype = 'usuario';

//obter todos os usuários
router.get('/', function(req, res) {

  conn.couch.get(conn.dbName, '_design/usuarios/_view/todos').then(
    function(data, headers, status){
      res.send(data.data.rows);
    },
    function(err){
      console.error(err);
    }
  )

});

//obter um usuário
router.get('/:id', function(req, res) {
  var id = req.params.id;
  conn.couch.get(conn.dbName, id).then(
    function(data, headers, status){
      console.log(data.data);
      res.send(data.data);
    },
    function(err){
      console.log(err);
    });
});

// adicionar um usuário
router.post('/add', function(req, res) {
  var nome = req.body.nome;
  var email = req.body.email;
  conn.couch.uniqid().then(function(ids){
    var id = ids[0];

    conn.couch.insert(conn.dbName, {
      _id: id,
      doc_type: doctype,
      nome: nome,
      email: email
    }).then(
      function(data, headers, status){
        res.send(`Usuário inserido ${id} ${nome} ${email}`);
      },
      function(err){
        console.error(err);
      });
  });
  
});

// remover um usuário
router.post('/delete/:id', function(req, res) {
  var id = req.params.id;
  var rev = req.body.rev;

  conn.couch.del(conn.dbName, id, rev).then(
    function(data, headers, status){
      res.send(`Usuário removido ${id}`);
    }
    ,function(err){
      console.error(err);
    });

});

// alterar usuário
router.post('/update/:id', function(req, res) {

  var id = req.params.id;
  var rev = req.body.rev;
  var nome = req.body.nome;
  var email = req.body.email;

  var update = {
    _id: id,
    _rev: rev,
    doc_type: doctype,
    nome: nome,
    email: email
  };

  conn.couch.update(conn.dbName, update).then(
    function(data, headers, status){
      res.send(`Usuário atualizado ${id}`);
    },
    function(err){
      console.error(err);
    });
})



module.exports = router;
