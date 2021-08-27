import { Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { InputField } from './components/InputField'
import { Wrapper } from './components/Wrapper'

interface testProps {}

const test: React.FC<testProps> = () => {
	return (
		<Wrapper variant='small'>
			<Formik
				initialValues={{ phone: '', password: '' }}
				onSubmit={(values) => {
					console.log(values)
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
