import { useForm, SubmitHandler } from "react-hook-form";
import Button from "src/components/parts/Button";
import Error from "src/components/parts/Error";
import Input from "src/components/parts/Input"
import Form from "../Form"

interface Inputs {
  email: string
  password: string
}

const LoginForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Input id="email" label="メールアドレス" {...register('email', {required: '入力してください。'})} />
        {errors.email?.message && <Error>{errors.email.message}</Error>}
      </div>
      <div className="mb-4">
        <Input {...register('password', {required: '入力してください'})} id="password" type="password" label="パスワード" />
        {errors.password?.message && <Error>{errors.password.message}</Error>}
      </div>
      <div>
        <Button>ログイン</Button>
      </div>
    </form>
  )
}

export default LoginForm