var express = require('express');
var router = express.Router();
var conn = require("../conn");

var doctype = 'usuario';

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

router.get('/:id', function(req, res){
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

router.post('/add', function(req, res){
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

module.exports = router;
