const express = require('express')
const router = express.Router()
const { putUuid, getUuid, updateUuid } = require('../Controller/uuidController')


router.put('/putuuid', putUuid)

router.get('/getuuid', getUuid)

router.patch('/updateuuid', updateUuid )



module.exports = router