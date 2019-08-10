
exports.up = function(knex) {
    return knex.schema
        .createTable('cars', table => {
            table.increments('id');
            table.text('VIN').notNullable().unique();
            table.text('make', 50).notNullable();
            table.text('model', 50).notNullable();
            table.integer('mileage', 6).notNullable();
            table.text('transmission_type', 50);
            table.text('title_status', 50);
        })
        .createTable('sales', table => {
            table.increments('id');
            table.text('buyer').notNullable();
            table.integer('amount').notNullable();
            table.integer('car_id')
                .references('id')
                .inTable('cars');;
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('cars')
        .dropTableIfExists('sales');
};
