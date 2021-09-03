import { Box, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import {
	useCreatePostMutation,
	useDeletePostMutation,
	useHelloSubscription,
	useMeQuery,
	usePostsQuery,
} from '../generated/graphql'
import { InputField } from './components/InputField'
import { NavBar } from './src/conponents/NavBar'

interface indexProps {}

const index: React.FC<indexProps> = () => {
	const [{ data }] = usePostsQuery()
	const [me] = useMeQuery()
	const [hello] = useHelloSubscription()
	console.log(hello)

	const [, createPost] = useCreatePostMutation()
	const [, deletePost] = useDeletePostMutation()
	const del = async (post) => {
		await deletePost({ id: post.id })
	}
	const add = async (post) => {
		const title = { title: '' }
		title.title = post.title
		const result = await createPost(title)
	}
	return (
		<div>
			<NavBar />
			<Formik
				initialValues={{ title: '' }}
				onSubmit={async (values) => {
					if (!me.data.me) {
						alert('请先登录！🚨')
					} else {
						await add(values)
					}
				}}
			>
				<Form>
					<InputField name='title' label='title' placeholder='请输入title' />
					<Button type='submit' colorScheme='blue' size='md' mt={4}>
						提交
					</Button>
				</Form>
			</Formik>
			<ul>
				{!data ? (
					<Box>正在读取</Box>
				) : (
					<Box>
						{data.posts.map((post) => {
							return (
								<div key={post.id}>
									{post.title}----creator:{post.creator.id}
									<Button
										onClick={() => {
											del(post)
										}}
									>
										删除
									</Button>
								</div>
							)
						})}
					</Box>
				)}
			</ul>
		</div>
	)
}

export default index
