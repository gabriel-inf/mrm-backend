module.exports = class BaseCrud {

    /**
     * Base create method with parametrized attributes and includes
     * @param {db.model} model 
     * @param {object} attributes 
     * @param {array} includes 
     */
    static async create(model, attributes, includes) {

        delete attributes["id"];
        const models = includes.map(dbModel => {
            return {model: dbModel}
        });

        const createdEntity = await model.create(
            {...attributes},
            {
                include: models
            }
        )
        return createdEntity;
    }

    static async findAll(model, whereClauses, includes) {
        
        const models = includes.map(dbModel => {
            return {model: dbModel}
        });

        const entities = await model.findAll({
            include: models,
            where: whereClauses
        }, includes)

        return entities;
    }

    static async findOne(model, id, includes) {
        const entities = await BaseCrud.findAll(model, {id: id}, includes);
        return entities[0]; // assuming that we check if the id is found in the controller
    }

    static async deleteOne(model, id) {
        await model.destroy({
            where: {
              id: id
            }
        });
    }

    static async deleteAll(model) {
        await model.destroy({
            where: {
                //   all
            },
            truncate: true
        }); 
    }

}