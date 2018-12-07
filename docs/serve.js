const handler = require('serve-handler')
const _ = require('lodash')

const http = require('http')
const path = require('path')

const FILES = [
  'images/100.jpeg',
  'images/200.jpeg',
  'images/300.jpeg',

  'pdfs/100.pdf',
  'pdfs/200.pdf',
  'pdfs/300.pdf'
]

// Set Content-Disposition header for IE11 :(
const contentDispositionHeaders = _.map(FILES, (file) => {
  const basename = path.basename(file)

  return {
    'source': file,
    'headers': [{
      'key': 'Content-Disposition',
      'value': `attachment; filename="${basename}"`
    }]
  }
})

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options
  return handler(request, response, {
    headers: [
      ...contentDispositionHeaders
    ]
  })
})

const PORT = parseInt(process.env.PORT, 10) || 3000

server.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`)
})