import React, { useState } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import { CircularProgress } from '@mui/material';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #0d1117;
    color: #c9d1d9;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 40px;
  font-size: 2.5rem;
  color: #58a6ff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #30363d;
  border-radius: 5px;
  background-color: #0d1117;
  color: #c9d1d9;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #58a6ff;
  }
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #238636;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  &:disabled {
    background-color: #30363d;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background-color: #2ea043;
  }
`;

const Results = styled.div`
  margin-top: 40px;
  padding: 20px;
  border-radius: 5px;
  background-color: #161b22;
  width: 100%;
  max-width: 600px;
`;

const ResultItem = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 5px;
  background-color: #0d1117;
  border: 1px solid #30363d;
`;

const ResultTitle = styled.h2`
  margin: 0;
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #58a6ff;
`;

const ResultDescription = styled.p`
  margin: 0;
  color: #c9d1d9;
`;

const ResultDetails = styled.div`
  margin-top: 10px;
`;

function App() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!url) {
      alert('Please enter a URL');
      return;
    }
    setLoading(true);
    let formattedUrl = url;
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }
    try {
      const response = await axios.post('http://localhost:5000/scan', { url: formattedUrl });
      console.log('Scan response:', response.data);
      setResults(response.data);
    } catch (error) {
      console.error('Scan error:', error);
      setResults([{ alert: 'Error', description: `Scan failed: ${error.message}`, other: '' }]);
    }
    setLoading(false);
  };

  const renderResults = () => {
    if (!results.length) return null;

    return results.map((result, index) => (
      <ResultItem key={index}>
        <ResultTitle>{result.alert}</ResultTitle>
        <ResultDescription>{result.description}</ResultDescription>
        <ResultDetails>
          <strong>URL:</strong> {result.url}<br />
          <strong>Method:</strong> {result.method}<br />
          <strong>Evidence:</strong> {result.evidence}<br />
          <strong>Other Info:</strong> {result.other}<br />
          <strong>Reference:</strong> {result.reference && result.reference.split('\n').map((ref, idx) => <div key={idx}>{ref}</div>)}<br />
          <strong>Solution:</strong> {result.solution}<br />
          <strong>Risk:</strong> {result.risk}<br />
          <strong>Tags:</strong> {result.tags && Object.entries(result.tags).map(([key, value]) => <div key={key}>{key}: {value}</div>)}
        </ResultDetails>
      </ResultItem>
    ));
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Saitama Vulnerability Scanner</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Scan'}
          </Button>
        </Form>
        {results.length > 0 && (
          <Results>
            <ResultTitle>Scan Results</ResultTitle>
            {renderResults()}
          </Results>
        )}
      </Container>
    </>
  );
}

export default App;
