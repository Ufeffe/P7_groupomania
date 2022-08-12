'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Posts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Posts.init({
        username: DataTypes.STRING,
        description: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        imageAlt: DataTypes.STRING,
        likes: DataTypes.INTEGER,
        defaultValue: "0",
        dislikes: DataTypes.INTEGER,
        defaultValue: "0",
        usersLiked: DataTypes.ARRAY,
        usersDisliked: DataTypes.ARRAY
    }, {
        sequelize,
        modelName: 'Posts',
    });
    return Posts;
};