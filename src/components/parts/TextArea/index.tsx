import React, { useState, forwardRef, ComponentPropsWithoutRef, useEffect} from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import styles from './index.module.css'

interface Props {
  register?: UseFormRegister<any>
  id?: string
  name?: string
  label?: string
  type?: string
  className?: string
  style?: React.CSSProperties
}
type ChildProps = ComponentPropsWithoutRef<'textarea'> & Props;

const TextArea = forwardRef<HTMLTextAreaElement, ChildProps>(
  ({ register, id, name, label, type, className, style, ...rest }, ref)  => {
  const [empty, setEmpty] = useState(true)

  useEffect(() => {
    if(rest.defaultValue || rest.value) {
      setEmpty(false)
    }
  }, [])

  return(
    <div className={styles.inputGroup}>
      <label className={`${styles.label} ${!empty && styles.active}`} htmlFor={id}>{label}</label>
      {(register && name) && (
        <textarea {...register(name)} className={`${styles.textarea}`} id={id} {...rest}>{rest.value}</textarea>
      )}
      {(!register && name) && (
        <textarea className={`${styles.textarea}`} name={name} id={id} {...rest} ref={ref}>{rest.value}</textarea>
      )}
      {(!register && !name) && (
        <textarea className={`${styles.textarea}`} id={id} {...rest} ref={ref}>{rest.value}</textarea>
      )}
    </div>
  );
})

export default TextArea