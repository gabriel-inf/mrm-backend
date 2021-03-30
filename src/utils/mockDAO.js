let dbs = {};
let incrementalKeys = {};

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

const create = (resource) => {
    if (incrementalKeys[resource] === undefined) incrementalKeys[resource] = 1;
    return (element) => {
        console.log("Element: ", element);
        element.id = incrementalKeys[resource]++;
    
        dbs[resource].push(element);
        return element;
    }
}

const update = (resource) => {
    return (element, params) => {
        console.log("params.id:", params.id);
        index = dbs[resource].findIndex(element => element.id === params.id);
    
        console.log(index);
    
        if (index === -1) return;
        !!element.name ? dbs[resource][index].name = element.name : console.log("no change on name");
    }
}

const remove = (resource) => {
    return (id) => {
        dbs[resource] = dbs[resource].filter(element => element.id != id);
    }
}

module.exports = (resource) => {
    dbs[resource] = []
    return {
        db: dbs[resource],
        findAll: findAll(resource),
        findByPk: findByPk(resource),
        create: create(resource),
        update: update(resource),
        remove: remove(resource)
    }
}
