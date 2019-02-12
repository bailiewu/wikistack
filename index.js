const express = require('express')
const morgan = require('morgan')
const path = require('path')
const views = require('./views')
const { db } = require('./models');//squelize or use {db, User, Page} and then remove models. from prefix of each func call

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const app = express()
app.use(morgan('dev'))

app.use('/public', express.static(path.join(__dirname, 'public' )))
app.use(express.urlencoded({ extended: false }));

app.use('/wiki', require('./routes/wiki'))
app.use('/users', require('./routes/user'))

app.get('/', (req, res, next) => {
    res.redirect('/wiki')
})

const init = async () => {

    await db.sync( {force: true})

    const PORT = 3000
    app.listen(PORT, () => {
        console.log(`app listening on ${PORT}`)
    })
}

init()
