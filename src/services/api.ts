import axios from "axios";

const api = axios.create({
	baseURL: "https://metal-api.dev",
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
