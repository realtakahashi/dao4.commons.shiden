
import { FC } from 'react';
import cn from "classnames"

interface Props {
  className: string | undefined
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  label: string
}
const FormInputText: FC<Props> = ( props:Props) => {

  return (
    <>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          >
            {props.label}
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className={cn(props.className)}
            name={props.name}
            type="text"
            onChange={props.handleOnChange}
          />
        </div>
      </div>
    </>
  )
}

export default FormInputText
