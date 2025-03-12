var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "[E7£0!)Do0bdc]DsQXT9",
  database: "forumdb"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM post", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});