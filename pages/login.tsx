import { SubmitHandler } from "react-hook-form";
import Button from "src/components/parts/Button";
import Container from "src/components/parts/Container";
import Input from "src/components/parts/Input";
import Form from "src/components/templates/Form"
import LoginForm from "src/components/templates/LoginForm";
import Layout from "src/components/views/Layout"

interface Inputs {
  email: string
  password: string
}

const LoginPage = () => {
  return (
    <Layout>
      <Container>
        <h2 className="mb-6">ログイン</h2>
        <LoginForm />
      </Container>
    </Layout>
  )
}

export default LoginPage