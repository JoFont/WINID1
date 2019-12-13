import React, { useState, useGlobal } from 'reactn';
import { Link } from 'react-router-dom';
import { Affix, Button } from 'antd';
import * as ROUTES from '../constants/routes';

const Navbar = () => {
  const [top, setTop] = useState(10);
  const [player] = useGlobal('player');

  return (
    <div className="bg-gray-600 p-3 border-b text-white">
      <Affix offsetTop={10}>
        <Link to="/" className="text-black">
          Profile
        </Link>
      </Affix>
    </div>
  );
};

export default Navbar;
