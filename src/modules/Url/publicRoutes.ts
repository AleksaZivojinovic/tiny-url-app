import Router from 'koa-router'

import { redirect } from './controller'

const router = new Router()

router.get('/:urlId', redirect)

export default router
