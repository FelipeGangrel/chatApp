var NodeCouchDb = require('node-couchdb');

module.exports = {

  couch: new NodeCouchDb({
      auth:{
        user: 'admin',
        password: 'admin'
      }
  }), 

  dbName: 'chatapp'


}


// var dbName = 'chatapp';
// var apiUrl = '_design/usuarios/_view/todos';



return module.exports;