const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const commentaireCtrl = require('../controllers/commentaire')

router.post('/:id', auth, commentaireCtrl.createCommentaire)
router.put('/:id', auth, commentaireCtrl.modifyCommentaire)

// router.get('/', auth, commentaireCtrl.getAllCommentaire)
// router.get('/:id', auth, commentaireCtrl.getOneCommentaire)
// router.delete('/:id', auth, commentaireCtrl.deleteCommentaire);

module.exports = router