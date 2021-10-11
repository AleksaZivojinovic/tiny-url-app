import { isURL } from 'validator'
import { generate } from 'shortid'

import Url from './Url'

const removeLastSlash = (url: string): string => {
	if (url[url.length - 1] === '/') {
		return url.slice(0, -1)
	}
	return url
}

export const updateStatistic = async () => {
	try {
		const urls = await Url.find({})

		for (let index = 0; index < urls.length; index++) {
			const url = urls[index]
			await checkCount(url)
		}
	} catch (error) {
		console.log(error)
	}
}

const checkCount = async (url, addNew = false) => {
	try {
		const counts = [...url.counts]

		const pastDate = new Date(Date.now())
		pastDate.setDate(pastDate.getDate() - 1)

		const date = new Date(Date.now())
		if (addNew) {
			counts.push(date)
		}

		const filteredCounts = counts.filter((date) => {
			if (date > pastDate) {
				return date
			}
		})

		const totalCount = filteredCounts.length

		url.counts = filteredCounts
		url.count24Hours = totalCount
		await url.save()
	} catch (error) {
		console.log(error)
	}
}

const checkExisting = async (fullUrl: string): Promise<any> => {
	const existingUrl = await Url.findOne({ fullUrl })
	if (existingUrl) {
		return existingUrl
	}
}

export const createUrl = async (ctx, next): Promise<any> => {
	try {
		const { url } = ctx.request.body
		const { FORWARDING_ADDRESS } = process.env

		const fullUrl = removeLastSlash(url)

		if (!isURL(fullUrl)) {
			ctx.status = 404
			return (ctx.body = 'Valid url must be provided')
		}
		const existingUrl = await checkExisting(fullUrl)
		if (existingUrl) {
			checkCount(existingUrl, true)
			ctx.status = 200
			return (ctx.body = existingUrl.shortUrl)
		}

		const urlId = generate()
		const shortUrl = `${FORWARDING_ADDRESS}/${urlId}`

		const date = new Date(Date.now())
		await Url.create({ fullUrl, shortUrl, urlId, counts: [date] })

		ctx.status = 201
		ctx.body = shortUrl
	} catch (error) {
		console.log(error)
		return next(error)
	}
}

export const redirect = async (ctx, next): Promise<any> => {
	try {
		const { urlId } = ctx.params

		const existingUrl = await Url.findOne({ urlId })
		if (existingUrl) {
			ctx.status = 301
			ctx.response.redirect(existingUrl.fullUrl)
		} else {
			ctx.status = 404
			ctx.body = 'Not Found'
		}
	} catch (error) {
		console.log(error)
		return next(error)
	}
}

export const getUrls = async (ctx, next): Promise<any> => {
	try {
		const urls = await Url.find({}).sort({ count24Hours: -1 }).limit(10)

		ctx.status = 200
		ctx.body = urls
	} catch (error) {
		console.log(error)
		return next(error)
	}
}
