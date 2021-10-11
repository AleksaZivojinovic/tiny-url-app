const UrlsTable = ({ urls }) => {
	return (
		<table id="table-urls">
			<thead>
				<tr>
					<th style={{ width: '35%' }}>Short Url</th>
					<th style={{ width: '50%' }}>Full Url</th>
					<th style={{ width: '15%' }}>24h Searches</th>
				</tr>
			</thead>
			<tbody>
				{urls.map((url, index) => {
					const check = index % 2
					return (
						<tr
							style={{
								backgroundColor: check
									? 'rgba(240, 241, 245, 1)'
									: 'rgba(255, 255, 255, 1)'
							}}
							key={index}
						>
							<td
								style={{
									border: 'none'
								}}
							>
								{url.shortUrl}
							</td>
							<td
								style={{
									border: 'none'
								}}
							>
								{url.fullUrl}
							</td>
							<td>
								{url.count24Hours}
								{url.count24Hours > 1 ? 'searches' : 'search'}
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default UrlsTable
