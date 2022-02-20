
import { FC } from 'react';
import cn from "classnames"

interface Props {
  className: string | undefined
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
}
const FormInputText: FC<Props> = ({ className, handleOnChange, name }) => {

  return (
    <>
      <input
        className={cn(className)}
        name={name}
        type="text"
        onChange={handleOnChange}
      />
    </>
  )
}

export default FormInputText