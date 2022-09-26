const { sequelize, Post, user_like_post } = require('../models')
const db = require('../models');

const fs = require('fs');


// Création d'une nouvelle post à partir d'un model
exports.createPost = (req, res, next) => {
    console.log("etape 1 demande globale", req.body);

    const post = new Post({
        description: req.body.description,
        userId: req.auth.userId,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })
    console.log('etape 2 le post contient :', post);
    post.save()
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.modifyPost = (req, res, next) => {
    // Recherche et récupération du lien image sinon importation classique
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body }
    console.log("postObject", postObject);

    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            console.log("comparaison des userId", post.userId, req.auth.userId);
            console.log("ton role", req.auth.role);
            if (isAdmin(req.auth.role) || isCreator(post.userId, req.auth.userId)) {
                console.log("user autorisé", postObject);
                Post.update({...postObject }, { where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Post modifiée' }))
                    .catch((error) => res.status(401).json({ message: error }))
            } else {
                res.status(401).json({ message: 'Non autorisé' })
            }
        })
        .catch(error => res.status(400).json({ error }))
}

exports.deletePost = (req, res, next) => {
    console.log("debut suppression");
    Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            console.log("comparaison des userId");
            if (isAdmin(req.auth.role) || isCreator(post.userId, req.auth.userId)) {
                console.log("suppression etape 1");
                Post.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Post supprimée !' }))
                    .catch((error) => res.status(401).json({ message: error }))
                    // Récupération du nom de fichier pour suppression des données images de la bdd
                    // const filename = post.imageUrl.split('/images/')[1]
                    // fs.unlink(`images/${filename}`, () => {
                    //     console.log("suppression etape 2");
                    // })
            } else {
                res.status(401).json({ message: 'Non autorisé' })
            }
        })
        .catch(error => res.status(500).json({ message: error }))
}

exports.getOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }))
}

exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }))
}

exports.likePost = (req, res, next) => {
    const postId = parseInt(req.params.id)
    const userId = parseInt(req.auth.userId)

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

// Vérifie si l'utilisateur a déjà like le post dans la join table
function isLiked(userId, postId) {
    console.log("début vérif is Liked");
    console.log(userId, postId);
    Like.findOne({
            where: {
                userId: userId,
                postId: postId
            }
        })
        .then(() => {
            console.log(userfound);
            return true
        })
        .catch(() => res.status(400).json({ message: "impossible de vérif" }))

}

function isAdmin(role) {
    console.log("check de ton role", role);
    if (role === "Admin") {
        console.log("tu es bien admin");
        return true
    }
}

function isCreator(userId, reqAuth) {
    console.log("check si t'es le créateur, ton id", reqAuth);
    console.log("l'Id du créateur", userId);
    if (userId === reqAuth) {
        console.log("tu es bien le créateur");
        return true
    }
}