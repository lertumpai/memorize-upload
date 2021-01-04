const express = require('express')
const fs = require('fs')
const multer = require('multer')
const sharp = require('sharp')

const router = express.Router()
const url = process.env.SERVER_URL || 'localhost:4000'

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

async function createTempFile(req) {
  const { file } = req

  const fileName = `${req.body.userId}-${file.filename}`
  const newFileName = `${file.destination}/${fileName}`
  const fileName800 = `temporary-memorize-${req.body.userId}-800-${file.filename}`
  const newFileName800 = `${file.destination}/${fileName800}`

  // rename
  await fs.renameSync(req.file.path, newFileName)

  // resize
  await sharp(newFileName).rotate().resize(800).toFile(newFileName800)

  // remove original file
  await fs.unlinkSync(newFileName)

  return {
    fileName: fileName800,
    destination: file.destination,
  }
}

async function renameFile(req) {
  const { fileName, destination } = req.body

  const newFileName = fileName.replace('temporary-memorize-', '')
  const currentPath = `${destination}/${fileName}`
  const newPath = `${destination}/${newFileName}`

  // rename
  await fs.renameSync(currentPath, newPath)

  return {
    fileName: newFileName,
    destination,
  }
}

function removeFile(file) {
  const fileName = `${file.destination}/${file.fileName}`
  const timeout = process.env.TIME_OUT || 10000
  setTimeout(() => fs.unlinkSync(fileName), timeout)
}

router.post('/acknowledge', async (req, res) => {
  const { uploadPath } = req.body
  const file = await renameFile(req)
  res.send({
    ...file,
    urlImage: `http://${url}/${uploadPath}/${file.fileName}`,
  })
})

router.post('/profile', uploadProfile.single('photo'), async (req, res) => {
  const file = await createTempFile(req)
  removeFile(file)
  res.send({
    ...file,
    uploadPath: 'profiles',
    urlImage: `http://${url}/profiles/${file.fileName}`,
  })
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
  const file = await createTempFile(req)
  removeFile(file)
  res.send({
    ...file,
    uploadPath: 'articles',
    urlImage: `http://localhost:4000/articles/${file.fileName}`
  })
})

module.exports = router
