const { sequelize, User } = require('../models')
const validator = require("email-validator");

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.signup = (req, res, next) => {
    if (validator.validate(req.body.username)) {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = User.build({
                    username: req.body.username,
                    password: hash,
                    role: req.body.role
                })
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
                    .catch(error => res.status(400).json({ error }))
            })
            .catch(error => res.status(500).json({ error }))
    }
}

exports.login = (req, res, next) => {
    User.findOne({ where: { username: req.body.username } })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: 'Paire identifiant/mdp incorrecte' })
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: 'Paire identifiant/mdp incorrecte' })
                        } else {
                            res.status(200).json({
                                userId: user.id,
                                role: user.role,
                                username: user.username,
                                token: jwt.sign({
                                        userId: user.id,
                                        role: user.role,
                                    },
                                    'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                                )
                            })
                        }
                    })
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }))
}