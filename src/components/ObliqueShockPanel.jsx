import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { ThreeDShockWave } from './ThreeDShockWave';
import { calculateObliqueShock, suggestOptimalMach } from '../utils/calculations';
import axios from 'axios';
import { i18n } from '../i18n';
import katex from 'katex';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

const ObliqueShockPanel = ({ addToHistory }) => {
  const [inputs, setInputs] = useState({ mach: '', angle: '', altitude: '' });
  const [unit, setUnit] = useState('degrees');
  const [result, setResult] = useState('');
  const [chartData, setChartData] = useState(null);
  const [calculationType, setCalculationType] = useState('');
  const [airDensity, setAirDensity] = useState('');
  const chartRef = useRef(null);

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const fetchAtmosphericData = async (altitude) => {
    try {
      const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=0&longitude=0&altitude=${altitude}&hourly=temperature_2m,pressure`);
      const data = response.data.hourly;
      const density = data.pressure[0] / (287 * (data.temperature_2m[0] + 273.15)); // Ideal gas law
      setAirDensity(density.toFixed(2));
    } catch (error) {
      console.error('Error fetching atmospheric data:', error);
      setAirDensity('1.225'); // Default sea-level density
    }
  };

  const calculate = (type) => {
    let mach = parseFloat(inputs.mach);
    let angle = parseFloat(inputs.angle);
    if (unit === 'radians') angle = angle * 180 / Math.PI;

    if (isNaN(mach) || (type !== 'waveAngle' && isNaN(angle))) {
      setResult('Please enter valid numbers');
      return;
    }

    const result = calculateObliqueShock(type, mach, angle);
    setResult(result.text);
    addToHistory(result.parameter, result.value);

    // Generate chart data
    const chartValues = [];
    const labels = [];
    for (let m = 1; m <= 5; m += 0.1) {
      const value = calculateObliqueShock(type, m, angle).value;
      chartValues.push(value);
      labels.push(m.toFixed(1));
    }
    setChartData({
      labels,
      datasets: [{
        label: result.parameter,
        data: chartValues,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    });

    // AI-driven suggestion
    const suggestion = suggestOptimalMach(mach, angle);
    if (suggestion) {
      setResult(prev => `${prev}\nAI Suggestion: ${suggestion}`);
    }

    setCalculationType(type);
  };

  useEffect(() => {
    if (inputs.altitude) fetchAtmosphericData(inputs.altitude);
  }, [inputs.altitude]);

  useEffect(() => {
    if (chartData && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      new ChartJS(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: i18n.t('chartTitle') },
            tooltip: { enabled: true }
          }
        }
      });
    }
  }, [chartData]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{i18n.t('obliqueShock')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <input
            type="number"
            name="mach"
            value={inputs.mach}
            onChange={handleInputChange}
            placeholder={i18n.t('initialMach')}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            aria-label={i18n.t('initialMach')}
          />
          {calculationType !== 'waveAngle' && (
            <>
              <input
                type="number"
                name="angle"
                value={inputs.angle}
                onChange={handleInputChange}
                placeholder={i18n.t('shockAngle')}
                className="w-full p-2 border rounded mt-2 dark:bg-gray-800 dark:border-gray-700"
                aria-label={i18n.t('shockAngle')}
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full p-2 border rounded mt-2 dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="degrees">Degrees</option>
                <option value="radians">Radians</option>
              </select>
            </>
          )}
          <input
            type="number"
            name="altitude"
            value={inputs.altitude}
            onChange={handleInputChange}
            placeholder={i18n.t('altitude')}
            className="w-full p-2 border rounded mt-2 dark:bg-gray-800 dark:border-gray-700"
            aria-label={i18n.t('altitude')}
          />
          {airDensity && <p className="mt-2">Air Density: {airDensity} kg/m³</p>}
        </div>
        <div className="flex flex-col gap-2">
          {['mach', 'pressure', 'density', 'temperature', 'waveAngle'].map(type => (
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
      {result && <p className="mt-4 text-lg whitespace-pre-line">{i18n.t('result')}: {result}</p>}
      <div className="mt-4">
        <canvas ref={chartRef}></canvas>
      </div>
      <ThreeDShockWave mach={parseFloat(inputs.mach)} angle={parseFloat(inputs.angle)} />
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: katex.renderToString(`M_2 = \\sqrt{\\frac{1 + \\frac{\\gamma - 1}{2} M_1^2 \\sin^2\\beta}{\\frac{\\gamma + 1}{2}}}`) }} />
    </div>
  );
};

export { ObliqueShockPanel };