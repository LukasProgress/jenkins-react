import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(prev => prev + 1);
  }

  function decrement() {
    setCount(prev => prev - 1);
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <h2>Counter</h2>
      <p>Aktueller Zählerstand: {count}</p>
      <button onClick={decrement}>-1</button>
      <button onClick={increment} style={{ marginLeft: '0.5rem' }}>
        +1
      </button>
    </div>
  );
};

export default Counter;
