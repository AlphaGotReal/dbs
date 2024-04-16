module.exports = class Cursor {

  constructor(mysql_, details) {
 
    this.connection = mysql_.createConnection({
      host: details["host"],
      user: details["user"],
      password: details["password"],
      database: details["database"]
    });

    this.connection.connect((err) => {
      if (err) {
        console.error('Error connecting to database:', err);
        return;
      }console.log('Connected to MySQL database!');
    });

  }

  anti_parse(query_result) {
    return query_result;
  }

  executeEqury(query) {
   
    let result;

    this.connection.query(query, (err, res, fields) => {
      if (err) {
        console.log("Error: ", err);
        return ;
      }

      result = this.anti_parse(res); 
    });

    return res;
  }

}


