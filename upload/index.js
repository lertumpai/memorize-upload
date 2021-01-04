const express = require('express')
const fs = require('fs')
const multer = require('multer')

const router = express.Router()

function generateString(n) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < n; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/profile')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `${generateString(15)}-${Date.now()}.${ext}`)
  }
})

// const upload = multer({ storage: profileStorage })
const uploadProfile = multer({ storage: profileStorage })

router.post('/profile', uploadProfile.single('photo'), async (req, res) => {
  const { file } = req
  const fileName = `${req.body.userId}-${file.filename}`
  await fs.renameSync(req.file.path, `${file.destination}/${fileName}`)
  res.send({ urlImage: `http://localhost:4000/profile/${fileName}`})
})

module.exports = router
