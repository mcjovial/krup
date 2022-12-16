const Input = ({type, placeholder, name, onChange, value, ...rest}) => {
  return (
    <>
      <input
        {...rest}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
    </>
  )
}

export default Input