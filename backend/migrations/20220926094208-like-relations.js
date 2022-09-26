'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint('likes', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'like_user_association',
            references: {
                table: 'users',
                field: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('likes', {
            fields: ['postId'],
            type: 'foreign key',
            name: 'like_post_association',
            references: {
                table: 'posts',
                field: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
    },

    async down(queryInterface, Sequelize) {
        queryInterface.removeConstraint('likes', 'like_user_association');
        queryInterface.removeConstraint('likes', 'like_post_association');
    }
};