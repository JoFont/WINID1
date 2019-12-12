import React, { useEffect, useGlobal } from 'reactn';

const Test = () => {
  const [fire] = useGlobal("fire");
  useEffect(() => {
    console.log(fire);
  }, [fire])
  return (
    <div>
      <h1>Helo</h1>
    </div>
  )
}

export default Test
