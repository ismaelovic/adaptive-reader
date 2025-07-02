import React from 'react';

const Header: React.FC = () => {
return (
  <header className="bg-blue-600 text-white p-4 shadow-md">
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Adaptive Reader</h1>
      <p className="text-sm opacity-80">Transform text to any reading level</p>
    </div>
  </header>
);
};

export default Header;