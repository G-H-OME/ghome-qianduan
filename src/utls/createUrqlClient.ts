import { cacheExchange, dedupExchange, fetchExchange } from '@urql/core'
import { withUrqlClient } from 'next-urql'
import App from 'next/app'

export default withUrqlClient((ssrExchange) => ({
	url: 'http://localhost:5000/graphql',
	exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
}))(App)
