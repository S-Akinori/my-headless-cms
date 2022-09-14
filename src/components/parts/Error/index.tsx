interface Props {
  children: string
}
const Error = ({children}: Props) => {
  return <div className="text-xs text-red-400">{children}</div>
}

export default Error