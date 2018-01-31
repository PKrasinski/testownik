import express from 'express'

const router = express.Router()



/* GET vue app. */
router.get('*', function(req, res, next) {
  res.render('index', { title: 'Testownik W8' })
})

export default router
