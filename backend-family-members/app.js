import express from 'express'
import cors from 'cors'
import winston from 'winston'
import MembersFamilyRoutes from './src/routes/member.routes.js'

const app = express()

app.use(express.json())

app.use(cors())

app.use('/members-of-family', MembersFamilyRoutes)

// winston(log)
const { combine, timestamp, label, printf } = winston.format
const myformat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level} ${message}`
})
global.logger = winston.createLogger({
	level: 'silly',
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'members-of-family' }),
	],
	format: combine(label({ label: 'members-of-family' }), timestamp(), myformat),
})

// erro padrão
app.use((err, req, res, next) => {
	global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
	res.status(400).send({ erros: err.message })
})

export default app
