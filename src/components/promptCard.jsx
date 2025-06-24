// src/components/PromptCard.jsx

import React from 'react';

const PromptCard = ({ title, description }) => {
  return (
    <div className="text-center px-2">
      <h3 className="text-md font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-green-100">{description}</p>
    </div>
  );
};

export default PromptCard;
