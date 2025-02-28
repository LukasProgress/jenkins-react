import React from 'react';
import Counter from './components/Counter';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Mini App</h1>
      <p>Das ist eine kleine React-Anwendung, zum Deployen auf EC2!</p>
      <p>Änderungen sind nach kürzester Zeit Live!</p>
      <Counter />
    </div>
  );
}

export default App;
