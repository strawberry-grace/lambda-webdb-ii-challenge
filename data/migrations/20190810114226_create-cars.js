
exports.up = function(knex) {
    return knex.schema.createTable('cars', table => {
        table.increments();
        table.text('VIN').notNullable().unique();
        table.text('make', 50).notNullable();
        table.text('model', 50).notNullable();
        table.integer('mileage', 6).notNullable();
        table.text('transmissionType', 50);
        table.text('titleStatus', 50);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
