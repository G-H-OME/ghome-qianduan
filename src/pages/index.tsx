import React, { useEffect } from 'react'
import { useNoPhoneLoginsMutation } from '../generated/graphql'

interface indexProps {}

const index: React.FC<indexProps> = () => {
	const [{ fetching, data }, noPhoneLogin] = useNoPhoneLoginsMutation()
	console.log(data)
	useEffect(() => {
		;(async () => {
			const phone = '18023281269'
			const password = '123456'
			await noPhoneLogin({ phone, password })
		})()
	}, [])
	if (fetching) return <p>waiting</p>
	return (
		<div>
			<p></p>
		</div>
	)
}

export default index
