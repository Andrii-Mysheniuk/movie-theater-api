const express = require('express')
const router = express.Router()
// const {check, validationResult} = require('express-validator')
const { Show } = require('../../models/index')

router.use(express.json())
router.use(express.urlencoded())

router.get('/', async (req, res) => {
  const shows = await Show.findAll()
  res.json(shows)
})

router.get('/:id', async (req, res) => {
  const showId = req.params.id
  const show = await Show.findByPk(showId)
  res.json(show)
})

router.get('/genres/:genre', async (req, res) => {
  const genre = req.params.genre
  const show = await Show.findAll({ where: { genre } })
  res.json(show)
})

router.put('/:id/watched', async (req, res) => {
  const showId = req.params.id
  const show = await Show.findByPk(showId)
  show.rating = req.body.rating
  res.json(show)
})

router.put('/:id/updates', async (req, res) => {
  const showId = req.params.id
  const show = await Show.findByPk(showId)
  show.available === true ? show.available = false : show.available = true
  await show.save()
  res.json(show)
})

router.delete('/:id', async (req, res) => {
  const shows = await Show.findAll()
  const showId = req.params.id
  shows.splice(showId - 1, 1)
  res.json(shows)
})

module.exports = router
