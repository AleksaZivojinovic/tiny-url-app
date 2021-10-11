import 'isomorphic-unfetch'
import dotenv from 'dotenv'
import Koa from 'koa'
import next from 'next'
import bodyParser from 'koa-body'
import cron from 'node-cron'

import { startDb } from './src/db/db'

import urlRoutes from './src/modules/Url/routes'
import publicUrlRoutes from './src/modules/Url/publicRoutes'
import { updateStatistic } from './src/modules/Url/controller'

startDb()
dotenv.config()

const { NODE_ENV } = process.env

const dev = NODE_ENV === 'development' ? true : false

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
	try {
		const server = new Koa()
		server.use(bodyParser())

		server.use(urlRoutes.routes())
		server.use(publicUrlRoutes.routes())

		server.use(async (ctx) => {
			await handle(ctx.req, ctx.res)
			ctx.respond = false
			ctx.res.statusCode = 200
		})

		cron.schedule('0 58 * * * *', () => {
			updateStatistic()
		})

		server.listen(process.env.PORT || 3000, () => {
			console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`)
		})
	} catch (error) {
		console.log(error)
	}
})
