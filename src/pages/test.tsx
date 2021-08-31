import { Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { useNoPhoneLoginMutation } from '../generated/graphql'
import { InputField } from './components/InputField'
import { Wrapper } from './components/Wrapper'

interface testProps {}

const test: React.FC<testProps> = () => {
	const [, _login] = useNoPhoneLoginMutation()
	const router = useRouter()
	const login = async (user: any) => {
		const options = { phone: '', password: '' }
		options.phone = user.phone
		options.password = user.password
		const result = await _login(options)
		if (!result.data) {
			console.log('登录失败')
		} else {
			router.push('/')
		}
	}
	return (
		<Wrapper variant='small'>
			<Formik
				initialValues={{ phone: '', password: '' }}
				onSubmit={async (values, { setSubmitting }) => {
					await login(values)
					setSubmitting(false)
				}}
			>
				<Form>
					<InputField name='phone' label='phone' placeholder='phone' />
					<InputField
						name='password'
						label='password'
						placeholder='password'
						type='password'
					/>
					<Button type='submit' colorScheme='blackAlpha' size='md' mt={4}>
						登陆
					</Button>
				</Form>
			</Formik>
		</Wrapper>
	)
}

export default test
