
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sales').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('sales').insert([
        {
          buyer: 'Grace Kang',
          amount: 9500,
          car_id: 3
        }
      ]);
    });
};
