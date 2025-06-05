import React, { useState } from 'react';
import { calculateAerodynamic } from '../utils/calculations';
import { i18n } from '../i18n';

const FunctionsPanel = ({ addToHistory }) => {
  const [inputs, setInputs] = useState({
    airDensity: '', velocity: '', wingArea: '', liftCoefficient: '', dragCoefficient: '',
    engineThrust: '', aircraftMass: '', gravity: '', endurance: '', airSpeed: '',
    enginePower: '', dragPower: '', liftToDrag: ''
  });
  const [unit, setUnit] = useState('m/s');
  const [result, setResult] = useState('');
  const [calculationType, setCalculationType] = useState('');

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculate = (type) => {
    const values = Object.fromEntries(Object.entries(inputs).map(([key, value]) => [key, parseFloat(value)]));
    if (Object.values(values).some(v => isNaN(v) && v !== '')) {
      setResult('Please enter valid numbers');
      return;
    }

    if (unit === 'knots') values.velocity = values.velocity * 0.514444; // Convert to m/s
    if (unit === 'km/h') values.velocity = values.velocity * 0.277778;

    const result = calculateAerodynamic(type, values);
    setResult(result.text);
    addToHistory(result.parameter, result.value);
    setCalculationType(type);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{i18n.t('functions')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          {Object.keys(inputs).map(key => (
            <input
              key={key}
              type="number"
              name={key}
              value={inputs[key]}
              onChange={handleInputChange}
              placeholder={i18n.t(key)}
              className="w-full p-2 border rounded mt-2 dark:bg-gray-800 dark:border-gray-700"
              aria-label={i18n.t(key)}
            />
          ))}
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full p-2 border rounded mt-2 dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="m/s">m/s</option>
            <option value="knots">Knots</option>
            <option value="km/h">km/h</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          {['lift', 'drag', 'thrust', 'weight', 'climb', 'descent', 'range', 'power', 'glide'].map(type => (
            <button
              key={type}
              onClick={() => calculate(type)}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              {i18n.t(`calculate${type.charAt(0).toUpperCase() + type.slice(1)}`)}
            </button>
          ))}
        </div>
      </div>
      {result && <p className="mt-4 text-lg">{i18n.t('result')}: {result}</p>}
    </div>
  );
};

export { FunctionsPanel };