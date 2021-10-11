import { Schema, model } from 'mongoose'

export interface UrlDoc extends Document {
	fullUrl: string
	shortUrl: string
	urlId: string
	count24Hours: number
	counts: [Date]
}

const schema = new Schema(
	{
		fullUrl: {
			type: String,
			required: true
		},
		shortUrl: {
			type: String,
			required: true
		},
		urlId: {
			type: String,
			required: true,
			unique: true
		},
		count24Hours: {
			type: Number,
			required: true,
			default: 1
		},
		counts: [
			{
				type: Date
			}
		]
	},
	{ timestamps: true }
)

export default model<UrlDoc>('Url', schema)
