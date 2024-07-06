import React, { useState } from 'react';

export default function H1() {
  const [count, setCount] = useState(0);

  function add() {
    setCount(count + 1);
    console.log(count + 1);
  }

  return (
    <>
      <div>hi</div>
      <div onClick={add} style={{ background: 'green', width: '10%' }}>click here</div>
      <div>Count: {count}</div>
    </>
  );
}
