# Lesson To Dos

GOAL: to take modified JSON files from Instock and see if we can build a relational DB schema equivalent

### Before we start

Everyone repeat after me: "THIS IS JUST A DEMO ONLY. I DO NOT HAVE TO USE DATABASES FOR OUR INSTOCK PROJECT."

- Understand the schema we'll use
- Design the API endpoints we'd like:

  - GET `/api/warehouses/`
  - GET `/api/warehouses/:warehouse_id`
    - should it include inventory items as part of the above API? You decide! If not, you can try something like:
  - GET `/api/warehouses/:warehouse_id/inventories/`
  - POST `/api/warehouses`
  - POST `/api/warehouses/:warehouse_id/inventories/`

- Create the database which we'll call `instock_db`
- `mysql -u root -p` (enter your DB password)

  - `create DATABASE 'instock_db';`
  - `exit` or control+D to exit

  ## Starting the project

- `npm init -y`
- `npm install express mysql knex`
- `knex init`
  - if that doesn't work it means you installed knex for your project, but not globally for all projects on your computer. Your options:
    1. `./node_modules/.bin/knex init`
    2. `npx knex init`
    3. Install globally: `npm install knex -g`
- configure your `knexfile.js` with your local DB settings
- `knex migrate:make [MIGRATION NAME]`

  - Example: `knex migrate:make create_warehouses_table`
  - Will create a `/migrations` folder
  - Should create a file w/ a timestamp inside w/ boilerplate
  - Inside that, we will use some built-in knex methods

  ```js
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
  ```

  - Try migrating at the command line: `knex migrate:latest`
  - Optional: view in SQL Workbench
  - Make sure to refresh the table name (right click)
  - Now let's try undoing the DB creation: `knex migrate:rollback`

  - Who wants to memorize knex commands? I don't! Let's create some npm scripts. You can name these whatever. Here's what I'm using in package.json:

  ```json
  {
    "scripts": {
      "tables:create": "knex migrate:latest",
      "tables:drop": "knex migrate:rollback"
    }
  }
  ```

  ### Seeding Data

  - `knex seed:[SEED DESCRIPTION]`
    - ex: `knex seed:make 01_warehouses`
  - Fill out the seed boilerplate
  - Try the command line: `knex seed:run`
  - Optional: write an npm script: `"tables:seed": "knex seed:run"`

  ### Adding a second table and a relationship to the first

- `knex migrate:make create_inventories_table`
- Let's try adding our inventories table that has a foreign key:

```js
exports.up = function (knex) {
  return knex.schema.createTable("inventories", function (table) {
    // table.increments();
    table.uuid("id").primary();
    table.string("item_name").notNullable();
    table.string("description").notNullable();
    table.string("category").notNullable();
    table.string("status").notNullable();
    table.integer("quantity").notNullable();
    table
      .uuid("warehouse_id")
      .references("id")
      .inTable("warehouses")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};
```

- `knex seed:make 02_inventories`
- Fill out the seed boilerplate
- Try the command line: `knex seed:run`

### Let's finally build a route!

- `touch index.js`
- `npm install -D nodemon`

## Potential troubles

### ER_NOT_SUPPORTED_AUTH_MODE

The first time I tried to migrate, I had the following error:

> Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

A quick google search helped with the workaround: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';` Where `root` as your user `localhost` as your URL and `password` as your password. Then run this query to refresh privileges: `flush privileges;`

### Error saying my table exists when I rollback!

**I made an error when migrating. I rolledback, but now it gives me an error saying a table exists!**
Make sure you have rolled back all the way to the beginning so it says "Already at the base migration." Then use SQL Workshop to see if there really ARE extra tables; if there are, drop them by using the UI (right click -> "Refresh All" -> "Drop Table")

## Resources

- https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261
- https://devhints.io/knex
