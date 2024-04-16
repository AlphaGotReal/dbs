const Cursor = require("./Cursor");
const fs = require("fs");
const { OutgoingMessage } = require("http");
const mysql = require("mysql");

let details = JSON.parse(fs.readFileSync("./details.json", "utf-8"));
// const cursor = new Cursor(mysql, details);

let tables = JSON.parse(fs.readFileSync("./tables.json", "utf-8"));

function generateCreateTableSQL(tableName, schema) {
    const attributesSQL = Object.entries(schema.attributes_with_type).map(([attr, type]) => `${attr} ${type}`).join(",\n\t");
    const keysSQL = Object.entries(schema.keys).filter(([_, isKey]) => isKey).map(([key]) => key).join(",\n\t");

    return `CREATE TABLE ${tableName}(
        ${attributesSQL},
        ${keysSQL}
    );`;
}

function CreateTables(tables) {
  Object.keys(tables).forEach(function(key, index) {
    const tableName = tables[key]["name"];
    console.log(tableName);
  });
}

CreateTables(tables);
