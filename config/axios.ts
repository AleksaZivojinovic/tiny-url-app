import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: `${process.env.FORWARDING_ADDRESS}/api`
})

export default axiosInstance
