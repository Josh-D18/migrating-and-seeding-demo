# Seeding and Migration Demo

See todo.md for more detailed steps.

## To install locally

- create a MySQL database using CLI or Workbench
- `npm install`
- edit `knexfile.js`, replacing host, database, user, and password properties as needed

## To run locally

- To migrate set up DB schema: `npm run tables:migrate`
- To rollback DB schema one version: `npm run tables:drop`
- To seed DB tables with data: `npm run tables:seed`
- To run local express server: `npm run server`
