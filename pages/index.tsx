import Form from '../components/Form'
import TextContent from '../components/TextContent'
import Ilustration from '../components/Ilustration'

const Index = () => {
	return (
		<div style={{ marginTop: '2.6em' }}>
			<span id="logo">TinyUrl</span>
			<div id="heading-div">
				<TextContent />
				<Form />
			</div>
			<Ilustration />
		</div>
	)
}

export default Index
