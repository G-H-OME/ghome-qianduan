import { createClient as createWSClient } from 'graphql-ws'
const wsClient = process.browser
	? createWSClient({
			url: 'ws://localhost:5000/graphql',
	  })
	: null

export default wsClient
