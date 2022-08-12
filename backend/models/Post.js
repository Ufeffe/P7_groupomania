// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('P7_groupomania', 'postgres', 'poiu987', {
//     dialect: 'postgres'
// });
// const Post = sequelize.define('Post', {
//     username: {
//         type: DataTypes.STRING
//     },
//     likes: {
//         type: DataTypes.INTEGER,
//         defaultValue: "0",
//     },
//     dislikes: {
//         type: DataTypes.INTEGER,
//         defaultValue: "0",
//     },
//     imageUrl: {
//         type: DataTypes.STRING
//     },
//     usersLiked: {
//         type: DataTypes.ARRAY(DataTypes.STRING)
//     },
//     usersDisliked: {
//         type: DataTypes.ARRAY(DataTypes.STRING)
//     }
// });
// Post.sync();