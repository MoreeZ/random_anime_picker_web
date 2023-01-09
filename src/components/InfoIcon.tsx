import React from "react"
import "../styles/infoicon.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

type Props = {
  message: string
}

const InfoIcon: React.FC<Props> = ({ message }) => {
  return (
    <div className="info-icon">
      <FontAwesomeIcon icon={faInfoCircle} fontSize={18} />
      <span className="info-icon__tooltip">{message}</span>
    </div>
  )
}

export default InfoIcon
