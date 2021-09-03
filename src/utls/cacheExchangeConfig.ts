import { devtoolsExchange } from '@urql/devtools'
import { cacheExchange, CacheExchangeOpts } from '@urql/exchange-graphcache'
import { NextUrqlClientConfig } from 'next-urql'
import Router from 'next/router'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { dedupExchange, Exchange, fetchExchange, subscriptionExchange } from 'urql'
import { pipe, tap } from 'wonka'
import ws from 'ws'
import {
	CreatePostMutation,
	DeletePostMutation,
	LogoutMutation,
	MeDocument,
	MeQuery,
	NoPhoneLoginMutation,
	PhoneLoginOrRegisterMutation,
	PostsDocument,
	PostsQuery,
} from '../generated/graphql'
import { betterUpdateQuery } from './betterUpdateQuery'

const errorExchange: Exchange =
	({ forward }) =>
	(ops$) => {
		return pipe(
			forward(ops$),
			tap(({ error }) => {
				if (error?.message.includes('not authenticated')) {
					Router.replace('/test')
				}
			})
		)
	}

const wssUrl = process.env.NEXT_PUBLIC_SERVER_URL.replace('http', 'ws')
const subscriptionClient = new SubscriptionClient(
	wssUrl,
	{
		reconnect: true,
	},
	process.browser ? undefined : ws
)

export const cacheExchangeConfig: CacheExchangeOpts = {
	// resolvers: {
	// 	Query: {},
	// },
	updates: {
		Mutation: {
			deletePost: (_result, args, cache, info) => {
				betterUpdateQuery<DeletePostMutation, PostsQuery>(
					cache,
					{ query: PostsDocument },
					_result,
					(result, query) => {
						query.posts
						// console.log({ cache })
						if (!result.deletePost) {
							return query
						}
						const afterDeletePosts = query.posts.filter((post) => {
							return post.id !== args.id
						})
						return { posts: afterDeletePosts }
					}
				)
			},
			createPost: (_result, args, cache, info) => {
				betterUpdateQuery<CreatePostMutation, PostsQuery>(
					cache,
					{ query: PostsDocument },
					_result,
					(result, query) => {
						// console.log({ result, query, args })
						const { creator, id, title, __typename } = result.createPost
						const posts = [{ creator, id, title, __typename }, ...query.posts]
						return { posts }
					}
				)
			},
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

export const createUrqlClient: NextUrqlClientConfig = (_ssrExchange, _) => ({
	url: process.env.NEXT_PUBLIC_SERVER_URL,
	fetchOptions: { credentials: 'include' },
	exchanges: [
		devtoolsExchange,
		dedupExchange,
		cacheExchange(cacheExchangeConfig),
		errorExchange,
		fetchExchange,
		subscriptionExchange({
			//@ts-ignore
			forwardSubscription(operation) {
				return subscriptionClient.request(operation)
			},
		}),
	],
})
