import { FieldError } from '../generated/graphql'

export const toMapErrors = (errors: FieldError[]) => {
	let Errors: Record<string, string> = {}
	errors.forEach(({ field, message }) => {
		Errors[field] = message
	})
	return Errors
}
