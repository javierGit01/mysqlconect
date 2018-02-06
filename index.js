var mysql = require('mysql');

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

mainRecursiveAsyncReadLine = function () {
  rl.question("Please Choose an option:\n"
    + "1) Create Student 1\n"
    + "2) Show Students 2\n"
    + "3) Exit\n"
    , function (line) {
      
      switch (line){
        case "1":
          setStudent();
          break;
        case "2":
          showStudents();
          break;
        case "3":
          return rl.close();
          break;
        default:
          console.log("No such option. Please enter another: ");
      }
      mainRecursiveAsyncReadLine(); //Calling this function again to ask new question
    });
};

mainRecursiveAsyncReadLine();
function setStudent(){
    var student = {
      name: null,
      lastName: null
    };
    rl.question("Name: ",function(name) {
      student.name = name;
      rl.question("LastName: ",function(lastName) {
        student.lastName = lastName;
        createStudents(student);
        rl.close();
      });
    });
    
}

function showStudents(){
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_mean'
  });
  
  connection.connect();
  connection.query('Select * from alumno', (err, result, fields)=>{
    if (err){
      console.log('Error al ejecutar la consulta: ' + err);
      return;
    }else {
      console.log('Lista de alumnos: ', result);
    }
    
  });
  connection.end();
}

function createStudents(student){
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_mean'
  });
  
  connection.connect();
  var sql = "INSERT INTO alumno (nombre, apellido) VALUES ?";
  var values = [
    [student.name, student.lastName]
  ];
  connection.query(sql, [values], (err, result, fields)=>{
    if (err){
      console.log('Error al ejecutar la consulta: ' + err);
      return;
    }else {
      console.log('Se creo correctamente');
    }
  });
  connection.end();
}