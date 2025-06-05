import React, { useState, useEffect } from 'react';
import { ObliqueShockPanel } from './components/ObliqueShockPanel';
import { FunctionsPanel } from './components/FunctionsPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { UserManualPanel } from './components/UserManualPanel';
import { i18n } from './i18n';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('obliqueShock');
  const [history, setHistory] = useState([]);
  const [fontSize, setFontSize] = useState(16);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addToHistory = (parameter, value) => {
    setHistory([...history, { parameter, value }]);
  };

  const exportCSV = () => {
    const csv = ['Parameter,Value', ...history.map(h => `${h.parameter},${h.value}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calculations.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
  };

  const enlargeFonts = () => {
    setFontSize(fontSize + 2);
  };

  return (
    <div className="container mx-auto p-4" style={{ fontSize: `${fontSize}px` }}>
      <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 animate-pulse">
        {i18n.t('title')}
      </h1>
      <div className="flex border-b mt-4">
        {['obliqueShock', 'functions', 'settings', 'userManual'].map(tab => (
          <button
            key={tab}
            className={`p-2 ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600 dark:text-gray-300'} hover:bg-gray-200 dark:hover:bg-gray-700 transition`}
            onClick={() => setActiveTab(tab)}
          >
            {i18n.t(tab)}
          </button>
        ))}
      </div>
      <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        {activeTab === 'obliqueShock' && <ObliqueShockPanel addToHistory={addToHistory} />}
        {activeTab === 'functions' && <FunctionsPanel addToHistory={addToHistory} />}
        {activeTab === 'settings' && <SettingsPanel toggleLanguage={toggleLanguage} toggleTheme={toggleTheme} enlargeFonts={enlargeFonts} />}
        {activeTab === 'userManual' && <UserManualPanel />}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">{i18n.t('history')}</h2>
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="border p-2">{i18n.t('parameter')}</th>
              <th className="border p-2">{i18n.t('value')}</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index} className="border hover:bg-gray-100 dark:hover:bg-gray-600">
                <td className="border p-2">{item.parameter}</td>
                <td className="border p-2">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={exportCSV} className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
          {i18n.t('exportCSV')}
        </button>
      </div>
    </div>
  );
};

export default App;