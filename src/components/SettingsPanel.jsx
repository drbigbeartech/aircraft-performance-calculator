import React from 'react';
import { i18n } from '../i18n';

const SettingsPanel = ({ toggleLanguage, toggleTheme, enlargeFonts }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{i18n.t('settings')}</h2>
      <div className="flex flex-col gap-2 mt-4">
        <button onClick={toggleLanguage} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          {i18n.t('toggleLanguage')}
        </button>
        <button onClick={toggleTheme} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          {i18n.t('toggleTheme')}
        </button>
        <button onClick={enlargeFonts} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          {i18n.t('enlargeFonts')}
        </button>
      </div>
    </div>
  );
};

export { SettingsPanel };