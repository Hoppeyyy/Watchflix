const express = require('express')
const router = express.Router()
const { putUuid, getUuid, updateUuid } = require('../Controller/uuidController')

// need Auth
router.put('/putuuid', putUuid)

router.get('/getuuid', getUuid)

// need Auth
router.patch('/updateuuid', updateUuid )



module.exports = router