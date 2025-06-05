import React, { useState } from 'react';
import { i18n } from '../i18n';

const UserManualPanel = () => {
  const [search, setSearch] = useState('');
  const faqs = [
    { question: i18n.t('faq1Q'), answer: i18n.t('faq1A') },
    { question: i18n.t('faq2Q'), answer: i18n.t('faq2A') },
    // Add more FAQs as needed
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{i18n.t('userManual')}</h2>
      <p className="mt-4 whitespace-pre-line">{i18n.t('manualContent')}</p>
      <div className="mt-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={i18n.t('searchFaq')}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
        />
        <div className="mt-4">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold">{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { UserManualPanel };