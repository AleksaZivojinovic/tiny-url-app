import { useState } from 'react'
import SimpleReactValidator from 'simple-react-validator'

import ShortedUrl from './ShortedUrl'
import axios from '../config/axios'

const Form = (props) => {
	const [input, setInput] = useState('')
	const [error, setError] = useState(null)
	const [urls, setUrls] = useState([])

	const validator = new SimpleReactValidator()

	const sendRequest = async (e) => {
		try {
			e.preventDefault()

			const existingUrl = urls.find((url) => {
				if (url.fullUrl === input) {
					return url
				}
			})
			if (existingUrl) {
				setInput(existingUrl.shortUrl)
			}

			if (validator.check(input, 'url') && input !== '') {
				const { data } = await axios.post('/urls', {
					url: input
				})

				const newUrls = [...urls]

				if (newUrls.length > 2) {
					newUrls.pop()
				}

				if (!existingUrl) {
					const url = data.split('//')[1]
					newUrls.unshift({ shortUrl: url, fullUrl: input })

					setInput(url)
					setUrls(newUrls)
				}
			} else {
				setError('wrong')
			}
		} catch (error) {
			console.log(error)
		}
	}

	const colorBorder = error ? '#EA4E2D' : '#D3D3D3'
	const colorText = error ? 'rgba(234, 78, 45, 1)' : 'rgba(42, 49, 64, 1)'

	return (
		<div>
			<form
				style={{
					marginTop: '41px'
				}}
				onSubmit={sendRequest}
			>
				<div id="form-div">
					<input
						className="input-url"
						style={{
							border: `1px solid  ${colorBorder}`,
							color: colorText
						}}
						placeholder="Your link"
						value={input}
						onChange={(e) => {
							setError(null)
							setInput(e.target.value)
						}}
					/>

					<button onClick={sendRequest} id="shorten-btn">
						Shorten
					</button>
				</div>
				<div>
					{error && (
						<div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
							<span className="error-msg">Please provide valid URL</span>
						</div>
					)}
					{urls.length > 0 &&
						urls.map((url, index) => {
							return (
								<ShortedUrl
									key={index}
									shortUrl={url.shortUrl}
									fullUrl={url.fullUrl}
								/>
							)
						})}
				</div>
			</form>
		</div>
	)
}

export default Form
