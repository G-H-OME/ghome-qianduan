import { CacheExchangeOpts } from '@urql/exchange-graphcache/dist/types/types'
import {
	LogoutMutation,
	MeDocument,
	MeQuery,
	NoPhoneLoginMutation,
	PhoneLoginOrRegisterMutation,
} from '../generated/graphql'
import { betterUpdateQuery } from './betterUpdateQuery'

export const cacheExchangeConfig: CacheExchangeOpts = {
	resolvers: {
		Query: {},
	},
	updates: {
		Mutation: {
			logout: (_result, args, cache, info) => {
				betterUpdateQuery<LogoutMutation, MeQuery>(
					cache,
					{ query: MeDocument },
					_result,
					() => ({ me: null })
				)
			},
			phoneLoginOrRegister: (_result, args, cache, info) => {
				betterUpdateQuery<PhoneLoginOrRegisterMutation, MeQuery>(
					cache,
					{ query: MeDocument },
					_result,
					(result, query) => {
						if (result.phoneLoginOrRegister.errors) {
							return query
						} else {
							return { me: result.phoneLoginOrRegister.user }
						}
					}
				)
			},
			noPhoneLogin: (_result, args, cache, info) => {
				betterUpdateQuery<NoPhoneLoginMutation, MeQuery>(
					cache,
					{ query: MeDocument },
					_result,
					(result, query) => {
						if (result.noPhoneLogin.errors) {
							return query
						} else {
							return { me: result.noPhoneLogin.user }
						}
					}
				)
			},
		},
	},
}
