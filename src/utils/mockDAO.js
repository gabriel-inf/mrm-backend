const uuidv4 = require('uuid').v4;

let db = [
    {
        id: "1",
        name: "test"
    }
]

const findAll = (resource) => {
    return () => {
        return dbs[resource];
    }
}

const findByPk = (resource) => {
    return (pk) => {
        return dbs[resource].filter(element => element.id == pk);
    }
}

const create = (element) => {
    console.log("Element: ", element);
    element.id = uuidv4();

    db.push(element)
}

const update = (element, params) => {
    console.log("params.id:", params.id);
    index = db.findIndex(element => element.id === params.id);

    console.log(index);

    if (index === -1) return;
    !!element.name ? db[index].name = element.name : console.log("no change on name");
}

const remove = (id) => {
    db = db.filter(element => element.id != id);
}


let dbs = {};


module.exports = (resource) => {
    dbs[resource] = []
    return {
        db: dbs[resource],
        findAll: findAll,
        findByPk: findByPk,
        create: create,
        update: update,
        remove: remove
    }
}
