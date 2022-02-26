const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://saunojat:268qmwne@cluster0.iphf9.mongodb.net/results?retryWrites=true&w=majority`
  //mongodb+srv://saunojat:<password>@cluster0.iphf9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(url)

const resultSchema = new mongoose.Schema({
  hometeam: String,
  visitorteam: String,
  result: String
})

const Result = mongoose.model('Result', resultSchema)

const result = new Result({
    hometeam: process.argv[3], 
    visitorteam: process.argv[4],
    result: process.argv[5]
})
console.log("result: ", result, "Result: ", Result)

// const note = new Note({
//   content: 'HTML is Easy',
//   date: new Date(),
//   important: true,
// })

Result.find({}).then(result => {
    result.forEach(result => {
      console.log(result)
    })
    mongoose.connection.close()
  })

result.save().then(result => {
  console.log('result saved!')
  mongoose.connection.close()
})