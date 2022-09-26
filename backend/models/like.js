'use strict';
const Post = require('./post')
const User = require('./user')
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Like.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });
            Like.belongsTo(models.Post, {
                foreignKey: 'postId',
                as: 'post'
            });
        }
    }
    user_like_post.init({
        userId: {
            type: 'Integer'
        },
        postId: {
            type: 'Integer'
        }
    }, {
        sequelize,
        tableName: "likes",
        modelName: 'Like',
    });
    return Like;
};