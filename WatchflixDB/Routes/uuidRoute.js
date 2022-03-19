const express = require('express')
const router = express.Router()
const { postUuid, getUuid, updateUuid } = require('../Controller/uuidController')


router.post('/postuuid', postUuid)

router.get('/getuuid', getUuid)

router.patch('/updateuuid', updateUuid )

module.exports = router