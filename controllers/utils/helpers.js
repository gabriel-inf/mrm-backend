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
  newInvoiceNumber = maxInvoiceNumber[0].greatest == null ? 246 : maxInvoiceNumber[0].greatest + 1
  return newInvoiceNumber;
}

exports.get_new_contract_number = async () => {
  const query = `
  select
      MAX(rc."contractNumber")
  from
    "rentContracts"  rc
  `

  maxContractNumber = await executeSelect(query);
  newContractNumber = maxContractNumber[0].max == null ? 100 : maxContractNumber[0].max + 1
  return newContractNumber;
}

exports.get_contract_number_from_rent_contract = async (rentContractId) => {
  const query = `
  select
      rc."contractNumber"
  from
    "rentContracts"  rc
  where
    rc."id" = ${rentContractId}
  `

  contractNumber = await executeSelect(query);
  console.log(contractNumber);
  return contractNumber[0].contractNumber;
}