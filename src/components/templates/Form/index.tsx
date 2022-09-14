import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  defaultValues?: Record<string, any>
  children: React.ReactElement[];
  onSubmit: SubmitHandler<any>
}

const Form = ({ defaultValues = {}, children, onSubmit }: Props) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}> 
      {React.Children.map(children, child => {
        return child?.props?.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name
              }
            })
          : child;
       })}
    </form>
  );
}

export default Form