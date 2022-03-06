import { FC } from "react"

interface Props {
  infoMessage: string
}
export const InfoFlash: FC<Props> = ({infoMessage}) => {
  return (
    <div className="w-full bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
      <p className="font-bold">Info</p>
      <p className="text-sm">{infoMessage}</p>
    </div>
  )
}

