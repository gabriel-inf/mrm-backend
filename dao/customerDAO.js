
const { executeSelect } = require('./baseDAO');

/**
 * Returns the clients and the total amount they are in debt
 * the query returns the results order by the amount desc
 */
exports.getClientsAndDebts = async () => {
    const query = `
        SELECT
            T."customerId",
            sum(t.total_value) as contracts_and_aditives_total_value
        FROM
            (
                SELECT
                    "customerId",
                    SUM(rc.value) AS total_value
                FROM
                    "rentContracts" rc
                WHERE
                    rc."paidAt" is null and
                    rc."paymentDueDate" < CURRENT_TIMESTAMP
                GROUP BY
                    rc."customerId"

                UNION ALL

                SELECT
                    rc."customerId",
                    SUM(a.value) AS total_value
                FROM
                    additives a inner join
                    "rentContracts" rc on (rc.id = a."rentContractId")
                WHERE
                    a."paidAt" is null and
                    a."paymentDueDate" < CURRENT_TIMESTAMP
                GROUP BY
                    rc."customerId"
            ) T
        GROUP BY
            T."customerId"
        ORDER BY
            contracts_and_aditives_total_value desc
    `
    return await executeSelect(query, []);
}

