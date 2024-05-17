const express = require('express')
const router = express.Router()
// const {check, validationResult} = require('express-validator')
const { User } = require('../../models/index')

router.use(express.json())
router.use(express.urlencoded())

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const userId = req.params.id
  const user = await User.findByPk(userId)
  res.json(user)
})

router.get('/:id/shows', async (req, res) => {
  const userId = req.params.id
  const user = await User.findByPk(userId)
  const userShows = await user.getShows()
  res.json(userShows)
})

router.put('/:userId/shows/:showId', async (req, res) => {
  const userId = req.params.userId
  const showId = req.params.showId
  const user = await User.findByPk(userId)
  const userShows = await user.getShows()
  userShows[showId - 1] = req.body
  res.json(userShows)
})

module.exports = router
