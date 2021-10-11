import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const startDb = () => {
	try {
		mongoose.connect(process.env.DB_URL, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		})

		mongoose.connection.on('error', (err) => {
			console.log('Mongoose Connection error: ' + err.message)
		})

		mongoose.connection.once('open', () => {
			console.log('MongoDB connected')
		})
	} catch (error) {
		console.log('Error when connecting to the database: ', error)
	}
}
