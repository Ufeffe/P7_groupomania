'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [{
            userName: 'John',
            password: 'azerty123',
            role: 'viewers',
            createdAt: new Date(),
            updatedAt: new Date()

        }], {});
    },

    async down(queryInterface, Sequelize) {

        await queryInterface.bulkDelete('Users', null, {});

    }
};