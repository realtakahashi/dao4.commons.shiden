
import { FC } from 'react';
import cn from "classnames"
import { SubDAOData } from '@/types/SubDAO';

interface InputProps {
  className: string | undefined
  handleOnChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  label: string
}
export const FormInputText: FC<InputProps> = (props) => {
  return (
    <>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500  md:text-right mb-1 md:mb-0 pr-4"
          >
            {props.label}
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className={cn(props.className)}
            name={props.name}
            type="text"
            onChange={props.handleOnChangeInput}
          />
        </div>
      </div>
    </>
  )
}

interface SelectProps {
  className: string | undefined
  handleOnChangeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
  label: string
  name: string
  selectList: any[]
  optionLabelKey: string
  optionValueKey: string
  itemName: string
}
export const FormInputSelect: FC<SelectProps> = (props) => {
  return (
    <>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500  md:text-right mb-1 md:mb-0 pr-4"
          >
            {props.label}
          </label>
        </div>
        <div className="md:w-2/3">
          <select
            className={cn(props.className)}
            onChange={props.handleOnChangeSelect}
            name={props.name}
          >
            <option value="">Please Choose { props.itemName}</option>
            {
              props.selectList.length > 0 ?
                props.selectList.map((item) => {
                  return (
                    <option
                      key={item[props.optionValueKey]}
                      value={item[props.optionValueKey]}>
                      {item[props.optionLabelKey]}
                    </option>
                  )
                })
                : ("")
            }
          </select>
        </div>
      </div>
    </>
  )
}


interface TextProps {
  label: string
  text: string
}
export const FormText: FC<TextProps> = (props) => {
  return (
    <>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500  md:text-right mb-1 md:mb-0 pr-4"
          >
            {props.label}
          </label>
        </div>
        <div className="md:w-2/3">
          <p>{props.text}</p>
        </div>
      </div>
    </>
  )
}
