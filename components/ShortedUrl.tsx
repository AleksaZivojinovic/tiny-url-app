import { useState } from 'react'
import Image from 'next/image'

const ShortedUrl = ({ shortUrl, fullUrl }) => {
	const [copied, setCopied] = useState(false)

	const copyToClipboard = () => {
		navigator.clipboard.writeText(shortUrl)
		setCopied(true)
		setTimeout(() => {
			setCopied(false)
		}, 2000)
	}

	return (
		<>
			<div id="short-url-div" onClick={copyToClipboard}>
				<Image
					src="/attachment.svg"
					alt="attachment"
					width="17px"
					height="18px"
				></Image>
				<span id="short-url">{shortUrl}</span>
				{copied && <button id="copied-btn">Link Copied!</button>}
			</div>
			<div id="full-url">
				<span>{fullUrl}</span>
			</div>
		</>
	)
}

export default ShortedUrl
