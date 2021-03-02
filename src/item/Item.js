'use strict';

class Item {

    constructor(id, name, type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getType() {
        return this.type;
    }


}
module.exports = Item;