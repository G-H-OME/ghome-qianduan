import { Box, Button, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { useLogoutMutation, useMeQuery } from '../../../generated/graphql'

interface NavBarProps {}
export const NavBar: React.FC<NavBarProps> = () => {
	const [{ data, fetching }] = useMeQuery()

	const [{ fetching: logOutFetching }, logout] = useLogoutMutation()
	let body = null
	if (fetching) {
		body = null
	} else if (data?.me) {
		body = (
			<Flex justifyContent='center'>
				<Box mr={2}>{data.me.phone}</Box>
				<NextLink href='/pay'>
					<Link mr={2}>充值</Link>
				</NextLink>
				<Button variant='link' onClick={() => logout()} isLoading={logOutFetching}>
					登出
				</Button>
			</Flex>
		)
	} else {
		body = (
			<>
				<NextLink href='/login'>
					<Link mr={2}>注册&登陆</Link>
				</NextLink>
			</>
		)
	}
	return (
		<Flex bg='tan' p={4}>
			<Box ml={'auto'}>{body}</Box>
		</Flex>
	)
}
