import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { Field, useField } from 'formik'
import React from 'react'

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string
	label: string
	placeholder: string
}

export const InputField: React.FC<InputFieldProps> = ({
	label,
	size: _,
	...props
}) => {
	const [field, { error }] = useField(props)
	return (
		<FormControl isInvalid={!!error}>
			{/* htmlFor => id */}
			<FormLabel htmlFor={Field.name}>{label}</FormLabel>
			<Input {...props} {...field} id={field.name} />
			{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
		</FormControl>
	)
}
