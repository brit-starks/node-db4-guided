// this is better than using truncate() because it can become really messy 
// when using foreign keys, remember we have to be very careful of the order we run these in
// And this method will do so
// SO USE THIS CLEANUP METHOD

const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return cleaner.clean(knex, {
    mode: 'truncate', // resets ids
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'], // don't empty migration tables
  });
};