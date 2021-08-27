import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import theme from '../theme'

const MyApp = ({ Component, pageProps }: any) => {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<ColorModeProvider
				options={{
					useSystemColorMode: true,
				}}
			>
				<Component {...pageProps} />
			</ColorModeProvider>
		</ChakraProvider>
	)
}

export default withUrqlClient((_ssrExchange, ctx) => ({
	url: 'http://localhost:5000/graphql',
}))(MyApp)
