const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');


/**
 * Returns all the stock items that are associated with a given customer in a ongoing contract
 * @param {*} clientId 
 * @returns 
 */
exports.allItemsWithGivenClient = async (clientId) => {
    const query = `
        select
            si.*
        from
            "rentContracts"  rc inner join
            "customers" c on (c.id = rc."customerId") inner join
            "itemRentals" ir on (ir."rentContractId" = rc.id) inner join
            "stockItems" si on (si.id = ir."stockItemId")
        where
            c.cnpj = ? AND
            rc."endDate" > CURRENT_TIMESTAMP AND
            rc."startDate" < CURRENT_TIMESTAMP AND
            ir."leftAt" is not NULL AND
            ir."returnedAt" is NULL;
    `

    try {
        return await sequelize.query(
            query,
            {
                replacements: [clientId],
                type: QueryTypes.SELECT
            }
        );
    } catch (err) {
        console.log(err);
        throw err;
    }
}
