
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('customers').del()
    .then(function () {
      // Inserts seed entries
      return knex('customers').insert([
        {name: "customer1", commercial_name: "commercial_name1", cpf: "cpf1", cnpj: "cnpj1", address: "address1", active: true},
        {name: "customer2", commercial_name: "commercial_name2", cpf: "cpf2", cnpj: "cnpj2", address: "address2", active: true},
        {name: "customer3", commercial_name: "commercial_name3", cpf: "cpf3", cnpj: "cnpj3", address: "address3", active: false},
        {name: "customer4", commercial_name: "commercial_name4", cpf: "cpf4", cnpj: "cnpj4", address: "address4", active: true},
        {name: "customer5", commercial_name: "commercial_name5", cpf: "cpf5", cnpj: "cnpj5", address: "address5", active: false},
        {name: "customer6", commercial_name: "commercial_name6", cpf: "cpf6", cnpj: "cnpj6", address: "address6", active: true},
        {name: "customer7", commercial_name: "commercial_name7", cpf: "cpf7", cnpj: "cnpj7", address: "address7", active: true},
        {name: "customer8", commercial_name: "commercial_name8", cpf: "cpf8", cnpj: "cnpj8", address: "address8", active: true},
        {name: "customer9", commercial_name: "commercial_name9", cpf: "cpf9", cnpj: "cnpj9", address: "address9", active: true}
      ]);
    });
};
