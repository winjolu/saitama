import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={require('./logo.svg').default} className="App-logo" alt="logo" />
        <h1>Welcome to Saitama</h1>
        <p>
          Your project setup is working!
        </p>
      </header>
    </div>
  );
}

export default App;
