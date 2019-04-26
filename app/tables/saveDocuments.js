const express = require('express')
const router = express.Router()
const docGenerator = require('../utils/generateDocument')

const genDocRepaireList = data => docGenerator.createRepaireList(data)
const genDocSummaryDataList = data => docGenerator.createSummaryDataList(data)
const genDocMidleTarifPrice = data => docGenerator.createDocMidleTarifPrice(data)
const genDocManagerTarifList = data => docGenerator.createDocManagerTarifList(data)
const genDocTarifList = data => docGenerator.createDocTarifList(data)


sendDoc = (data, genDocModule, res) => {
    // console.log(data)
    if (data) {
        genDocModule
        // console.log('success')
        res.send({
            fileName: data,
            success: true
        })
    } else {
        res.status(403).send({
            success: false,
            message: 'Invalid fileName'
        })
    }
}
router.post('/saveRepaireList', (req, res) => {
    sendDoc(req.body.fileName, genDocRepaireList(req.body.fileName), res)
})

router.post('/saveSummaryDataList', (req, res) => {
    sendDoc(req.body.fileName, genDocSummaryDataList(req.body.fileName), res)
})

router.post('/createDocMidleTarifPrice', (req, res) => {
    sendDoc(req.body.fileName, genDocMidleTarifPrice(req.body.fileName), res)
})

router.post('/createDocManagerTarifList', (req, res) => {
    sendDoc(req.body.fileName, genDocManagerTarifList(req.body.fileName), res)
})

router.post('/createDocTarifList', (req, res) => {
    sendDoc(req.body.fileName, genDocTarifList(req.body.fileName), res)
})

module.exports = router;
