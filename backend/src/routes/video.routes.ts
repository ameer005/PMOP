import express from 'express'

const router = express.Router()

router.route('/').post()

export { router as videoRouter }
