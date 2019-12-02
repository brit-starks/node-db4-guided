
exports.up = function(knex) {
  return (
    knex.schema
      .createTable('zoos', tbl => {
        tbl.increments();
        tbl.string('zoo_name', 255).notNullable();
        tbl.string('address', 255).notNullable().unique();
      })
      .createTable('species', tbl => {
        tbl.increments();
        tbl.string('species_name', 255).notNullable().unique();
      })
      .createTable('animals', tbl => {
        tbl.increments();
        tbl.string('animal_name', 255).notNullable();
        tbl.integer('species_id')
          .unsigned()
          .notNullable()
          .references('id') // Or .references('species.id')
          .inTable('species');
      })
      .createTable('zoo_animals', tbl => {
        tbl.integer('zoo_id')
          .unsigned()
          .notNullable()
          .references('zoo.id');

          tbl.integer('animal_id')
            .unsigned()
            .notNullable()
            .references('animals.id');

            tbl.primary(['zoo_id', 'animal_id']);

      })
  )
};

exports.down = function(knex) {
  return (
    knex.schema
      .dropTableIfExists('zoo_animals')
      .dropTableIfExists('animals')
      .dropTableIfExists('species')
      .dropTableIfExists('zoos')
  )
};
