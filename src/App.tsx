import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import PortfolioDetail from './pages/PortfolioDetail';
import type { Profile, Portfolio } from './types';
import profileData from './data/profile.json';
import portfoliosData from './data/portfolios.json';
import './App.css';

const PROFILE_STORAGE_KEY = 'profiling_profile';
const PORTFOLIOS_STORAGE_KEY = 'profiling_portfolios';

/**
 * Migrate portfolio data from old format (thumbnail only) to new format (images array)
 */
function migratePortfolios(portfolios: Portfolio[]): Portfolio[] {
  return portfolios.map((portfolio) => {
    // If images array doesn't exist but thumbnail does, migrate thumbnail to images
    if (!portfolio.images && portfolio.thumbnail) {
      return {
        ...portfolio,
        images: [portfolio.thumbnail],
      };
    }
    return portfolio;
  });
}

function App() {
  // Profile state with localStorage persistence
  const [profile, setProfile] = useState<Profile>(() => {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return profileData;
  });

  // Portfolio state with data migration and localStorage persistence
  const [portfolios, setPortfolios] = useState<Portfolio[]>(() => {
    const saved = localStorage.getItem(PORTFOLIOS_STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      return migratePortfolios(data);
    }
    return migratePortfolios(portfoliosData);
  });

  // Persist profile changes to localStorage
  useEffect(() => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  // Persist portfolio changes to localStorage
  useEffect(() => {
    localStorage.setItem(PORTFOLIOS_STORAGE_KEY, JSON.stringify(portfolios));
  }, [portfolios]);

  const handleAddPortfolio = (portfolio: Portfolio) => {
    setPortfolios((prev) => [...prev, portfolio]);
  };

  const handleUpdateProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
  };

  const handleUpdatePortfolio = (updatedPortfolio: Portfolio) => {
    setPortfolios((prev) =>
      prev.map((p) => (p.id === updatedPortfolio.id ? updatedPortfolio : p))
    );
  };

  const handleDeletePortfolio = (id: string) => {
    setPortfolios((prev) => prev.filter((p) => p.id !== id));
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
              onUpdateProfile={handleUpdateProfile}
            />
          }
        />
        <Route
          path="/portfolio/:id"
          element={
            <PortfolioDetail
              portfolios={portfolios}
              onUpdate={handleUpdatePortfolio}
              onDelete={handleDeletePortfolio}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
