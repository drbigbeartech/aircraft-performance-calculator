const GAMMA = 1.4;

export const calculateObliqueShock = (type, mach, angle) => {
  let value, text, parameter;
  switch (type) {
    case 'mach':
      value = Math.sqrt((1 + ((GAMMA - 1) / 2) * mach ** 2 * Math.sin(angle * Math.PI / 180) ** 2) / ((GAMMA + 1) / 2));
      text = `Mach Number Behind the Shock: ${value.toFixed(2)}`;
      parameter = 'Mach Number';
      break;
    case 'pressure':
      value = ((1 + 2 * GAMMA * mach ** 2 * Math.sin(angle * Math.PI / 180) ** 2 - (GAMMA - 1) * mach ** 4 * Math.sin(angle * Math.PI / 180) ** 2) /
               (1 + (GAMMA - 1) * mach ** 2 * Math.sin(angle * Math.PI / 180) ** 2));
      text = `Pressure Ratio: ${value.toFixed(2)}`;
      parameter = 'Pressure Ratio';
      break;
    case 'density':
      value = ((GAMMA + 1) * mach ** 2 * Math.sin(angle * Math.PI / 180) ** 2) / ((GAMMA - 1) * mach ** 2 * Math.sin(angle * Math.PI / 180) ** 2 + 2);
      text = `Density Ratio: ${value.toFixed(2)}`;
      parameter = 'Density Ratio';
      break;
    case 'temperature':
      value = ((GAMMA - 1) * mach ** 2 * Math.sin(angle * Math.PI / 180) ** 2 + 2) / ((GAMMA + 1) * mach ** 2 * Math.sin(angle * Math.PI / 180) ** 2);
      text = `Temperature Ratio: ${value.toFixed(2)}`;
      parameter = 'Temperature Ratio';
      break;
    case 'waveAngle':
      value = Math.acos(1 / mach) * 180 / Math.PI;
      text = `Wave Angle: ${value.toFixed(2)}°`;
      parameter = 'Wave Angle';
      break;
    default:
      return { text: 'Invalid calculation type', value: 0, parameter: '' };
  }
  return { text, value: value.toFixed(2), parameter };
};

export const calculateAerodynamic = (type, values) => {
  let value, text, parameter;
  switch (type) {
    case 'lift':
      value = 0.5 * values.airDensity * values.velocity ** 2 * values.wingArea * values.liftCoefficient;
      text = `Calculated Lift: ${value.toFixed(2)} N`;
      parameter = 'Lift';
      break;
    case 'drag':
      value = 0.5 * values.airDensity * values.velocity ** 2 * values.wingArea * values.dragCoefficient;
      text = `Calculated Drag: ${value.toFixed(2)} N`;
      parameter = 'Drag';
      break;
    case 'thrust':
      value = values.engineThrust;
      text = `Calculated Thrust: ${value.toFixed(2)} N`;
      parameter = 'Thrust';
      break;
    case 'weight':
      value = values.aircraftMass * values.gravity;
      text = `Calculated Weight: ${value.toFixed(2)} N`;
      parameter = 'Weight';
      break;
    case 'climb':
      value = (values.engineThrust - values.drag) / values.weight;
      text = `Rate of Climb: ${value.toFixed(2)} m/s`;
      parameter = 'Rate of Climb';
      break;
    case 'descent':
      value = (values.drag - values.engineThrust) / values.weight;
      text = `Rate of Descent: ${value.toFixed(2)} m/s`;
      parameter = 'Rate of Descent';
      break;
    case 'range':
      value = values.endurance * values.airSpeed * 60;
      text = `Maximum Range: ${value.toFixed(2)} meters`;
      parameter = 'Maximum Range';
      break;
    case 'power':
      value = values.enginePower - values.dragPower;
      text = `Power Available: ${value.toFixed(2)} Watts`;
      parameter = 'Power Available';
      break;
    case 'glide':
      value = Math.sqrt(2 * values.weight * values.liftToDrag / values.airDensity / values.wingArea);
      text = `Glide Velocity: ${value.toFixed(2)} m/s`;
      parameter = 'Glide Velocity';
      break;
    default:
      return { text: 'Invalid calculation type', value: 0, parameter: '' };
  }
  return { text, value: value.toFixed(2), parameter };
};

export const suggestOptimalMach = (mach, angle) => {
  // Simple AI rule: Suggest Mach number for optimal pressure ratio (example heuristic)
  if (mach < 1) return 'Mach number should be supersonic (>1) for oblique shocks.';
  if (angle > 45) return 'Consider reducing shock angle to below 45° for better efficiency.';
  return `Optimal Mach number for angle ${angle}° is approximately ${(mach * 0.95).toFixed(2)} for balanced performance.`;
};