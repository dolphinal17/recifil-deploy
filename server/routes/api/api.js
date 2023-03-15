const api = require('express')
const router = api.Router()
const cors = require('cors')


//api url for client
const whitelist = ['http//127.0.0.1:3000']

var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

  router.use(api.json())

  router.use(cors(corsOptions));

  //22:40