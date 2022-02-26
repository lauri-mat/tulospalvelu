require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Result = require('./models/result')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const mongoose = require('mongoose')


// ÄLÄ KOSKAAN TALLETA SALASANOJA GitHubiin!
const url =
  `mongodb+srv://saunojat:268qmwne@cluster0.iphf9.mongodb.net/results?retryWrites=true&w=majority`

mongoose.connect(url)



const resultSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

resultSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })



let results = [
    {
      hometeam: "Yltäyliskyllästetyt",
      visitorteam: "Vähemmistön enemmistö",
      result: "1-0",
      id: 0
  },
  {
      hometeam: "Suuret Johtajat",
      visitorteam: "Taiteelliset harhaanjohtajat",
      result: "0-2",
      id: 1
  },
  {
      hometeam: "Valon Vartijat",
      visitorteam: "Synkät valtiaat",
      result: "1-1",
      id: 2
  }
  ]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

  app.get('/api/results', (request, response) => {
    Result.find({}).then(results => {
      response.json(results)
    })
  })
  
//   app.get('/api/results', (req, res) => {
//     res.json(results)
//   })

  //kaksoispistesyntaksi kun poluille parametreja, esim id:
  app.get('/api/results/:id', (request, response) => {
    Result.findById(request.params.id).then(result => {
      response.json(result)
    })
  })
  
//   app.get('/api/results/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const result = results.find(result => {
//       console.log(result.id, typeof result.id, id, typeof id, result.id === id)
//       return result.id === id
//     })
    
//     if (result) {    
//         response.json(result)  
//     } else {    
//         response.status(404).end()  
//     }

//     console.log(result)
//     response.json(result)
//   })

  

  app.delete('/api/results/:id', (request, response) => {
    const id = Number(request.params.id)
    results = results.filter(result => result.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = results.length > 0
      ? Math.max(...results.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.post('/api/results', (request, response) => {
    const body = request.body
  
    if (!body.hometeam || !body.visitorteam || !body.result) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const result = new Result({
      hometeam: body.hometeam,
      visitorteam: body.visitorteam,
      result: body.result,
      id: generateId(),
    })

    result.save().then(savedResult => {
        response.json(savedResult)
      })
  })

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
