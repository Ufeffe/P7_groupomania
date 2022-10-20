const { sequelize, Post, Commentaire, User } = require('../models')

exports.createCommentaire = (req, res, next) => {
    const commentaire = new Commentaire({
        description: req.body.description,
        userId: req.auth.userId,
        postId: req.params.id
    })
    commentaire.save()
        .then(() => res.status(201).json({ message: 'commentaire enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.modifyCommentaire = (req, res, next) => {
    const description = req.body.description
    Commentaire.findOne({ where: { id: req.params.id } })
        .then(commentaire => {
            if (isAdmin(req.auth.role) || isCreator(commentaire.userId, req.auth.userId)) {
                Commentaire.update({ description }, { where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'commentaire modifié' }))
                    .catch((error) => res.status(401).json({ message: error }))
            } else {
                res.status(401).json({ message: 'Non autorisé' })
            }
        })
        .catch(error => res.status(400).json({ error }))
}

exports.getAllCommentaire = (req, res, next) => {
    const postId = parseInt(req.params.id)
    Commentaire.findAll({
            where: { postId: postId },
            include: {
                model: User,
                as: 'user',
                attributes: ['username']
            }
        })
        .then(commentaires => res.status(200).json(commentaires))
        .catch(error => res.status(400).json({ error }))
}

exports.deleteCommentaire = (req, res, next) => {
    Commentaire.findOne({ where: { id: req.params.id } })
        .then((commentaire) => {
            if (isAdmin(req.auth.role) || isCreator(commentaire.userId, req.auth.userId)) {
                commentaire.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'commentaire supprimé !' }))
                    .catch((error) => res.status(401).json({ message: error }))
            } else {
                res.status(401).json({ message: 'Non autorisé' })
            }
        })
        .catch(error => res.status(500).json({ message: error }))
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