import express from 'express'
import * as Path from 'node:path'
import listings from './routes/listings'
import profileRoutes from './routes/profile'

const server = express()

server.use(express.json({ limit: '50mb' }))
server.use(express.urlencoded({ limit: '50mb', extended: true }))
server.use('/api/profile', profileRoutes)

server.use('/api/v1/listings', listings)
server.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
