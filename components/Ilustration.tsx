import Image from 'next/image'

const Ilustration = (props) => {
	return (
		<div
			id="image-div"
			style={{ position: 'absolute', top: '15em', left: '50%' }}
		>
			<Image
				src="/ilustration.svg"
				alt="ilustration"
				width="762.98px"
				height="537.99px"
			></Image>
		</div>
	)
}

export default Ilustration
