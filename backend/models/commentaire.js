'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Commentaire extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Commentaire.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });
            Commentaire.belongsTo(models.Post, {
                foreignKey: 'postId',
                as: 'post'
            });
        }
    }
    Commentaire.init({
        userId: {
            type: 'Integer'
        },
        postId: {
            type: 'Integer'
        },
        description: {
            type: 'String'
        },
    }, {
        sequelize,
        tableName: 'commentaires',
        modelName: 'Commentaire',
    });
    return Commentaire;
};