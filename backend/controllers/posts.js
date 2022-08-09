const Post = require('../models/Post')
const fs = require('fs')

// Initilisation des constantes pour la fonction like/dislike
const USER_LIKE = 1
const USER_DISLIKE = -1
const USER_RESET = 0

// Création d'une nouvelle post à partir d'un model
exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post)

    // Suppression des éléments automatiquement créés et non voulus
    // delete postObject._id
    delete postObject._userId

    const post = new Post({
        ...postObject,
        username: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })
    post.save()
        .then(() => res.status(201).json({ message: 'Post enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.modifyPost = (req, res, next) => {
    // Recherche et récupération du lien image sinon importation classique
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body }

    delete postObject._userId

    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (post.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non autorisé' })
            } else {
                Post.updateOne({ _id: req.params.id }, {...postObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Post modifiée' }))
                    .catch((error) => res.status(401).json({ message: error }))
            }
        })
        .catch(error => res.status(400).json({ error }))
}

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non autorisé' })
            } else {
                // Récupération du nom de fichier pour suppression des données images de la bdd
                const filename = post.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Post supprimée !' }))
                        .catch((error) => res.status(401).json({ message: error }))
                })
            }
        })
        .catch(error => res.status(500).json({ message: error }))
}

exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }))
}

exports.getAllPosts = (req, res, next) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }))
}

exports.likePost = (req, res, next) => {

    Post.findOne({ _id: req.params.id })
        .then((post) => {
            // suppression de l'id de la requete
            delete req.body.userId

            // recuperation de l'id depuis le service auth
            const userIdToAdd = req.auth.userId

            // recuperation du choix de like -1, 0, 1
            const likeOption = req.body.like

            // Option like 
            if (likeOption == USER_LIKE && !idIsPresent(userIdToAdd, post.usersLiked)) {
                post.usersLiked.push(userIdToAdd)
                post.likes++
            }
            // Option Dislike
            if (likeOption == USER_DISLIKE && !idIsPresent(userIdToAdd, post.usersDisliked)) {
                post.usersDisliked.push(userIdToAdd)
                post.dislikes++
            }
            // Option neutre
            if (likeOption == USER_RESET && idIsPresent(userIdToAdd, post.usersDisliked)) {
                idToDelete(userIdToAdd, post.usersDisliked)
                post.dislikes--
            } else if (likeOption == USER_RESET && idIsPresent(userIdToAdd, post.usersLiked)) {
                idToDelete(userIdToAdd, post.usersLiked)
                post.likes--
            }
            post.save()
                .then(() => res.status(201).json({ message: 'Like/Dislike modifié !' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
}

// Permet de connaitre la position de l'id dans un tableau
function idToDelete(userId, array) {
    const idFinder = array.indexOf(array.find(id => id == userId))
    array.splice(idFinder, 1)
}
// Permet de savoir si l'id est présent dans un tableau
function idIsPresent(userId, array) {
    return array.includes(userId)
}