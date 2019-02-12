const express = require('express');
const router = express.Router();
const { Page, User } = require('../models')
const { userList, userPages } = require('../views')

router.get('/', async (req, res, next) => {
    // res.send('got to GET /user')

    try {
        const users = await User.findAll();
        // console.log(users)
        res.send(userList(users))
    } catch (error){ next(error)}
})

// router.post('/', (req, res, next) => {
//     res.send('got to POST /user')
// })

// router.get('/add', (req, res, next) => {
//     res.send('got to GET /user/add')
// })

router.get('/:userId', async (req, res, next) => {
    const user = await User.findById(req.params.userId)
    // console.log(user)
    const pages = await Page.findAll({
        where: {
            authorId: req.params.userId
        }
    })
    res.send(userPages(user, pages)) //user, pages
})

module.exports = router
