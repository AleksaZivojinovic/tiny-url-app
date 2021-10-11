import Router from 'koa-router'

import { createUrl, getUrls } from './controller'

const router = new Router()

router.get('/', getUrls)
router.post('/', createUrl)

export default router.prefix('/api/urls')
