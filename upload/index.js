const express = require('express')
const fs = require('fs')
const multer = require('multer')
const sharp = require('sharp')

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
    cb(null, './public/profiles')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `${generateString(20)}-${Date.now()}.${ext}`)
  }
})

// const upload = multer({ storage: profileStorage })
const uploadProfile = multer({ storage: profileStorage })

async function renameFile(req) {
  const { file } = req

  const fileName = `${req.body.userId}-${file.filename}`
  const newFileName = `${file.destination}/${fileName}`
  const fileName800 = `${req.body.userId}-800-${file.filename}`
  const newFileName800 = `${file.destination}/${fileName800}`

  // rename
  await fs.renameSync(req.file.path, newFileName)

  // resize
  await sharp(newFileName).resize(800).toFile(newFileName800)

  // remove original file
  await fs.unlinkSync(newFileName)

  return fileName800
}

router.post('/profile', uploadProfile.single('photo'), async (req, res) => {
  const fileName = await renameFile(req)
  res.send({ urlImage: `http://localhost:4000/profiles/${fileName}`})
})

const articleStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/articles')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `${generateString(20)}-${Date.now()}.${ext}`)
  }
})

// const upload = multer({ storage: profileStorage })
const uploadArticle = multer({ storage: articleStorage })

router.post('/article', uploadArticle.single('photo'), async (req, res) => {
  const fileName = await renameFile(req)
  res.send({ urlImage: `http://localhost:4000/articles/${fileName}`})
})

module.exports = router
