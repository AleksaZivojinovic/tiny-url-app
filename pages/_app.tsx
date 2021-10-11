import { Fragment } from 'react'
import 'isomorphic-unfetch'
import App from 'next/app'
import Head from 'next/head'

import Layout from '../components/Layout'
import '../styles.css'

class TinyUrlApp extends App {
	render() {
		const { Component, pageProps } = this.props

		return (
			<Fragment>
				<Head>
					<title>TinyUrl</title>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta charSet="utf-8" />
				</Head>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Fragment>
		)
	}
}

export default TinyUrlApp
