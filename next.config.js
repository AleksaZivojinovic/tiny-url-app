const webpack = require('webpack')

require('dotenv').config()
const { parsed: localEnv } = require('dotenv').config()

module.exports = {
	webpack: (config, options) => {
		config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
		return config
	}
}
