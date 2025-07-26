import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './components/layout/MainLayout';
import AnalysisControls from './components/analysis/AnalysisControls';
import DetailedSummary from './components/analysis/DetailedSummaryDisplay';

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<AnalysisControls />} />
          <Route path="/detailed" element={<DetailedSummary />} />
        </Routes>
      </MainLayout>
    </Router>
  </Provider>
);

export default App;
