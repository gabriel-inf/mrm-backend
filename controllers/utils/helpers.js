const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../models');

/**
 * Executes a select
 * @param {string} query
 * @param {array} replacements
 * @returns
 */
async function executeSelect(query, replacements){
  try {
      return await sequelize.query(
          query,
          {
              replacements: replacements,
              type: QueryTypes.SELECT
          }
      );
  } catch (err) {
      console.log('executeSelect', err);
      throw err;
  }
}

exports.get_new_invoice_number = async () => {
  const query = `
  select
      GREATEST(MAX(rc."invoiceNumber"), MAX(a."invoiceNumber"))
  from
    "rentContracts"  rc full join
    "additives" a on (a."rentContractId" = rc."id")
  `

  maxInvoiceNumber = await executeSelect(query);
  maxInvoiceNumber = maxInvoiceNumber[0].greatest == null ? 100 : maxInvoiceNumber[0].greatest + 1
  console.log(maxInvoiceNumber)
  return maxInvoiceNumber;
}