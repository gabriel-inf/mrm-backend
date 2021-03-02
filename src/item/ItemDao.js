"use-strict";

const Item = require("./Item");

const db = require("../database/db");

const itemTable = "ITEM";
const itemColumns = ['id', 'name', 'item_type'];

const itemColumnsToStatement = itemColumns.join(",");

console.log(itemColumnsToStatement);


const addItem = (item) => {
    var sql = "INSERT INTO ".concat(itemTable, "(", itemColumnsToStatement, ") ", "VALUES (", '\''.concat([item.getId(), item.getName(), item.getType()].join([separador = '\',\'']), '\''), ")");
    sql = sql.replace('\"', "\'");
    console.log(sql);

    db.query(sql);
    db.destroy();

    return null; // will return the id
}

const updateItem = (item) => {
    // will return the id
}

const getItemById = (id) => {
    return new Item();
}

const getAllItems = () => {
    return [];
}

const getItemsByType = () => {
    return [];
}

module.exports = {
    addItem: addItem,
    updateItem: updateItem,
    getItemById: getItemById,
    getAllItems: getAllItems,
    getItemsByType: getItemsByType
}

addItem(new Item("3", "2", "2"));