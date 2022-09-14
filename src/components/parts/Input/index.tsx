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
type ChildProps = ComponentPropsWithoutRef<'input'> & Props;

const Input = forwardRef<HTMLInputElement, ChildProps>(
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
        <input {...register(name)} className={styles.input} id={id} type={type} {...rest} />
      )}
      {(!register && name) && (
        <input className={styles.input} name={name} id={id} type={type} {...rest} ref={ref} />
      )}
      {(!register && !name) && (
        <input className={styles.input} id={id} type={type} {...rest} ref={ref} />
      )}
    </div>
  );
})

Input.displayName = 'Input'

export default Input