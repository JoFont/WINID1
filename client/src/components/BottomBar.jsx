import React, { useState, useGlobal } from "reactn"
import { Link } from "react-router-dom"
import { Affix, Icon } from "antd"
import * as ROUTES from "../constants/trimmed.routes"

const BottomBar = () => {
  const [top, setTop] = useState(10)
  const [player] = useGlobal("player")

  return (
    <Affix offsetBottom={0}>
      <ul className="flex bg-blue-500 p-3 text-white">
        <li className="flex-1 mr-2">
          <a
            className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
            href="#"
          >
            Active Item
          </a>
        </li>
        <li className="flex-1 mr-2">
          <a
            className="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
            href="#"
          >
            Nav Item
          </a>
        </li>
        <li className="text-center flex-1">
          <a className="block py-2 px-4 text-gray-400 cursor-not-allowed" href="#">
            Disabled Item
          </a>
        </li>
      </ul>
    </Affix>
  )
}

export default BottomBar
