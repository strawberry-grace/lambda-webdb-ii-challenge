
exports.seed = function(knex) {
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          VIN: 'JH4KA7650RC007283',
          make: 'Infiniti',
          model: 'i35',
          mileage: 120000
        },
        {
          VIN: '2G1WF52E859227943', 
          make: 'Chevrolet',
          model: 'Impala',
          mileage: 195000
        },
      ]);
    });
};
