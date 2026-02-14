import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import PortfolioDetail from './pages/PortfolioDetail';
import type { Profile, Portfolio } from './types';
import profileData from './data/profile.json';
import portfoliosData from './data/portfolios.json';
import './App.css';

const STORAGE_KEY = 'profiling_portfolios';

function App() {
  const [profile] = useState<Profile>(profileData);
  const [portfolios, setPortfolios] = useState<Portfolio[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return portfoliosData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
  }, [portfolios]);

  const handleAddPortfolio = (portfolio: Portfolio) => {
    setPortfolios((prev) => [...prev, portfolio]);
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              profile={profile}
              portfolios={portfolios}
              onAddPortfolio={handleAddPortfolio}
            />
          }
        />
        <Route
          path="/portfolio/:id"
          element={<PortfolioDetail portfolios={portfolios} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
