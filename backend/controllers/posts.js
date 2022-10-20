const { sequelize, Post, User, Like, Commentaire } = require('../models')
const db = require('../models');
const fs = require('fs');


// Création d'une nouvelle post à partir d'un model
exports.createPost = (req, res, next) => {
    if (req.file === undefined) {
        const post = new Post({
            description: req.body.description,
            userId: req.auth.userId,
        })
        post.save()
            .then(() => res.status(201).json({ message: 'Post enregistré !' }))
            .catch(error => res.status(400).json({ error }));
    } else {
        const post = new Post({
            description: req.body.description,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        })
        post.save()
            .then(() => res.status(201).json({ message: 'Post enregistré !' }))
            .catch(error => res.status(400).json({ error }));
    }
}

exports.modifyPost = (req, res, next) => {
    // Recherche et récupération du lien image sinon importation classique
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body }

    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            if (isAdmin(req.auth.role) || isCreator(post.userId, req.auth.userId)) {
                Post.update({...postObject }, { where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Post modifié' }))
                    .catch((error) => res.status(401).json({ message: error }))
            } else {
                res.status(401).json({ message: 'Non autorisé' })
            }
        })
        .catch(error => res.status(400).json({ error }))
}

exports.deletePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            if (hasFile(post) == false) {
                if (isAdmin(req.auth.role) || isCreator(post.userId, req.auth.userId)) {
                    Post.destroy({ where: { id: req.params.id } })
                        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                        .catch((error) => res.status(401).json({ message: error }))
                } else {
                    res.status(401).json({ message: 'Non autorisé' })
                }
            } else if (isAdmin(req.auth.role) || isCreator(post.userId, req.auth.userId)) {
                Post.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                    .catch((error) => res.status(401).json({ message: error }))
                    // Récupération du nom de fichier pour suppression des données images de la bdd
                const filename = post.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => {
                    console.log("Image deleted");
                })
            } else {
                res.status(401).json({ message: 'Non autorisé' })
            }
        })
        .catch(error => res.status(500).json({ message: error }))
}


exports.getAllPosts = (req, res, next) => {
    Post.findAll({ include: [{ model: User, as: "user", attributes: ['username'] }] })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }))
}


exports.likePost = async(req, res, next) => {
    const postId = parseInt(req.params.id)
    const userId = parseInt(req.auth.userId)

    const isLiked = await Like.findOne({
        where: {
            userId: userId,
            postId: postId
        }
    })
    if (isLiked) {
        Like.destroy({
                where: {
                    userId: userId,
                    postId: postId
                }
            })
            .then(() => {
                Post.findOne({ where: { id: req.params.id } })
                    .then(post => {
                        post.nb_likes--;
                        post.save()
                            .then(() => res.status(200).json({ message: 'Post non liked' }))
                            .catch((error) => res.status(401).json({ message: error }))
                    })
            })
            .catch((error) => res.status(400).json({ message: error }))
    } else {
        Like.create({
                postId: postId,
                userId: userId
            })
            .then(() => {
                Post.findOne({ where: { id: req.params.id } })
                    .then(post => {
                        post.nb_likes++;
                        post.save()
                            .then(() => res.status(200).json({ message: 'Post liked' }))
                            .catch((error) => res.status(401).json({ message: error }))
                    })
            })
            .catch((error) => res.status(400).json({ message: error }))
    }
}


function isAdmin(role) {
    if (role === "Admin") {
        return true
    }
}

function isCreator(userId, reqAuth) {
    if (userId === reqAuth) {
        return true
    }
}

function hasFile(post) {
    if (post.imageUrl == null) {
        return false
    } else {
        return true
    }
}