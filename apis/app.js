require('dotenv').config();
const express = require('express')
const ejs = require('ejs')
const fs = require('fs')

const { profile, collection } = require('./database/account');

const cors = require('cors')
const app = express();

const { setting_host, setting_port } = require('./setting')

console.log('--->',process.env.REACT_APP_LOCAL_BACKEND_PATH);

app.use(cors({
  origin                 : '*',
  methods                : ["PUT","POST","GET","DELETE","OPTIONS"],
  allowedHeaders         : ["Content-Type","Content-Length","Authorization","Accept","X-Requested-With"],
  credentials            : true,
  optionsSuccessStatus   : 200
}))

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// 定義一個獲取伺服器位址和連接埠的中間件
const getAddress = (req, res, next) => {
  const address = req.app.listen().address()
  const host = address.address === '::' ? setting_host : address.address

  res.locals.host = host
  res.locals.serverAddress = `http://${host}:${setting_port}`
  next()
}

app.get('/following_list', getAddress, (req, res) => {
  fs.readFile('./apis/database/following.ejs', 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      res.end('Internal Server Error')
      return
    }

    const template = ejs.compile(data)
    const json = template({ server: res.locals.host, port: setting_port })
    res.json(JSON.parse(json))
  })
})

app.get('/for_you_list', getAddress, (req, res) => {
  fs.readFile('./apis/database/for_you.ejs', 'utf8', (err, data) => {
    console.log(err);
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      res.end('Internal Server Error')
      return
    }

    const template = ejs.compile(data)
    const json = template({ server: res.locals.host, port: setting_port })
    res.json(JSON.parse(json))
  })
});

app.get('/media/:title', getAddress, (req, res) => {
  /* #swagger.ignore = true */
  const path = req.path;

  // 檢查路徑中是否包含 .m3u8 副檔名
  if (path.endsWith('.m3u8')) {
    fs.readFile(`./apis/media/${req.params.title.replace('m3u8', 'ejs')}`, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        res.end('Internal Server Error')
        return
      }

      const template = ejs.compile(data)
      const m3u8 = template({ server: res.locals.host, port: setting_port })
      res.send(m3u8)
    })
  } else {
    const data = fs.readFileSync(`./apis/media/${req.params.title}`)
    res.send(data)
  }
})

app.get('/images/:title', getAddress, (req, res) => {
  /* #swagger.ignore = true */
  const data = fs.readFileSync(`./apis/images/${req.params.title}`)
  res.send(data)
});

app.get('/account', getAddress, (req, res) => {
  res.status(200).json(profile)
});

app.get('/account/collection', getAddress, (req, res) => {
  res.status(200).json(collection)
});


const server = app.listen(setting_port, () => {
  const host = server.address().address === '::' ? setting_host : server.address().address
  console.log(`Server listening at http://${host}:${setting_port}`)
});
