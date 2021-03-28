
exports.up = knex => knex.schema.createTable("customers", table => {
    table.increments("id");
    table.text("name");
    table.text("commercial_name");
    table.text("cpf").unique();
    table.text("cnpj").unique();
    table.text("address");
    table.text("address_number");
    table.text("city");
    table.text("phone_number");
    table.text("mobile");
    table.text("email");
    table.bool("active");

    table.timestamp("created_at").defaultTo(knex.fn.now()); 
    table.timestamp("updated_at").defaultTo(knex.fn.now()); 
  });

exports.down = knex => knex.schema.dropTable("customers");
