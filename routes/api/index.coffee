express = require 'express'
config = require 'config'
moment = require 'moment'
_ = require 'lodash'

router = express.Router()

router.use '/memos', require('./memo')
router.use '/users', require('./user')

module.exports = router