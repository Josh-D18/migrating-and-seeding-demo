exports.up = function (knex) {
  return knex.schema.createTable("warehouses", function (table) {
    // table.increments();
    table.uuid("id").primary();
    table.string("name").notNullable();
    table.string("address").notNullable();
    table.string("city").notNullable();
    table.string("country").notNullable();
    table.string("contact_name").notNullable();
    table.string("contact_position").notNullable();
    table.string("contact_phone").notNullable();
    table.string("contact_email").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("warehouses");
};
