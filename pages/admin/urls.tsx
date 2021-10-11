import { useState, useEffect } from 'react'

import UrlsTable from '../../components/UrlsTable'

import axios from '../../config/axios'

const Urls = (props) => {
	const [urls, setUrls] = useState([])

	const fetchUrls = async () => {
		try {
			const { data } = await axios.get('/urls')

			setUrls(data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchUrls()
	}, [])

	return (
		<div id="urls-page">
			<span id="logo" style={{ color: '#FFF' }}>
				TinyUrl
			</span>
			<div id="table-div">
				<UrlsTable urls={urls} />
			</div>
		</div>
	)
}

export default Urls
