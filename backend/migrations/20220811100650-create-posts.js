'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            imageUrl: {
                type: Sequelize.STRING
            },
            imageAlt: {
                type: Sequelize.STRING
            },
            likes: {
                type: Sequelize.INTEGER,
                defaultValue: "0"
            },
            dislikes: {
                type: Sequelize.INTEGER,
                defaultValue: "0"
            },

            usersLiked: {
                type: Sequelize.ARRAY(Sequelize.STRING)
            },
            usersDisliked: {
                type: Sequelize.ARRAY(Sequelize.STRING)
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Posts');
    }
};