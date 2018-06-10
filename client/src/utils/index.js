export const validation = {
	required: value => (value ? undefined: 'Required'),
	email: value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? 'Invalid email address'
      : undefined),
  password: (value, all, props) => (!props.auth.loginErr ? undefined : 'Unauthorized'),
}