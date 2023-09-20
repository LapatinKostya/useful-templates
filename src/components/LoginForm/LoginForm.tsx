import {useId} from "react";
import {useForm} from "react-hook-form";

interface FormData  {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const id = useId()
  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting,
      errors
    },
  } = useForm<FormData>()

  const onSubmit = (data: FormData)=> {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor={`${id}-email`}>Email</label>
        <input
          id={`${id}-email`}
          type='email'
          autoComplete='email'
          aria-describedby={`${id}-email-error-message`}
          {...register('email', {required: 'required field'})}
        />
        {errors.email && (
          <p id={`${id}-email-error-message`} aria-live={'assertive'}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-password`}>Password</label>
        <input
          id={`${id}-password`}
          type='password'
          autoComplete="current-password"
          aria-describedby={`${id}-password-error-message`}
          {...register('password', {
            required: 'required field',
            minLength: {
              value: 8,
              message: 'min length is 8'
            }
          })}
        />
        {errors.password && (
          <p id={`${id}-password-error-message`} aria-live={'assertive'}>
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label>
          Remember me
          <input type='checkbox' {...register('rememberMe')}/>
        </label>

      </div>

      <button
        type="submit"
        disabled={isSubmitting}
      >Sign in</button>
    </form>
  )
}
