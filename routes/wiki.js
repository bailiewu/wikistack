const express = require('express');
const router = express.Router();
const { addPage, wikiPage, main } = require('../views')
const { Page, User } = require('../models')


router.get('/', async(req, res, next) => {
    try {
        const pages = await Page.findAll()
        // console.log(pages)
        res.send(main(pages))
    } catch (error){next(error)}
    // res.send('got to GET /wiki')
})

router.post('/', async (req, res, next) => {
    const [user, wasCreated] = await User.findOrCreate({
        where: {
            name: req.body.name,
            email: req.body.email
        }
    })
    // const page = new Page({
    //     title: req.body.title,
    //     content: req.body.content,
    //     status: req.body.status
    // })
    const page = await Page.create(req.body)

    page.setAuthor(user)

    try {
        await page.save();
        // console.log('slug: ', page.slug)
        // console.log(page.id, page.title, page.slug, page.status)
        res.redirect(`${page.slug}`)
    } catch (error) { next(error) }

})

router.get('/add', (req, res, next) => {
    res.send(addPage())
})

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        })
        const author = await page.getAuthor()
        res.send(wikiPage(page, author))

    } catch (error){ next(error) }
    // res.send(`hit dynamic route at ${req.params.slug}`)
})

module.exports = router
