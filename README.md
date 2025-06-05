Aircraft Performance Calculator
A cutting-edge web-based application for calculating aircraft performance metrics, featuring advanced visualizations, AI-driven insights, and real-time atmospheric data integration. Built with React, Tailwind CSS, Three.js, Chart.js, and more.
Features

Oblique Shock Calculations: Mach number, pressure ratio, density ratio, temperature ratio, and wave angle.
Aerodynamic Calculations: Lift, drag, thrust, weight, rate of climb/descent, maximum range, power available, and glide velocity.
Advanced Visualizations: Interactive charts with Chart.js and 3D shock wave models with Three.js.
AI-Driven Insights: Predictive suggestions for optimal flight parameters.
Unit Conversion: Support for multiple units (m/s, knots, km/h, degrees, radians).
Real-Time Atmospheric Data: Fetch air density from Open-Meteo API based on altitude.
Multilingual Support: English and Hindi with i18next.
PWA Support: Offline access and mobile installation.
Export Options: CSV and LaTeX-based PDF reports.
Interactive FAQ: Searchable knowledge base.

Prerequisites

Node.js (v16 or higher)
npm or yarn

Setup

Clone the repository:git clone <repository-url>
cd aircraft-performance-calculator


Install dependencies:npm install


Run the application:npm start

Open http://localhost:5173 in your browser.

Project Structure

public/index.html: Main HTML file.
src/App.jsx: Main React component.
src/components/: React components for panels and visualizations.
src/utils/calculations.js: Calculation logic and AI suggestions.
src/i18n.js: Multilingual configuration.
src/serviceWorker.js: PWA functionality.
package.json: Dependencies and scripts.
README.md: Project documentation.
.gitignore: Excludes unnecessary files.

Deployment
Deploy to Vercel or Netlify:

Push the repository to GitHub.
Connect to Vercel/Netlify via their CLI or web interface.
Configure the build command as npm run build and output directory as dist.

Contributing
Submit issues or pull requests to enhance features like additional calculations or visualizations.
License
MIT
"# aircraft-performance-calculator" 
