import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

interface HalfGaugeProps {
  value: number;
  maxValue?: number;
  size?: number;
  title?: string;
  animated?: boolean;
  className?: string;
}

const HalfGauge: React.FC<HalfGaugeProps> = ({
  value,
  maxValue = 100,
  size = 200,
  title = "Health Score",
  animated = true,
  className = ""
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  // Animation effect
  useEffect(() => {
    if (animated) {
      const duration = 1500;
      const steps = 60;
      const increment = value / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const newValue = Math.min(increment * currentStep, value);
        setAnimatedValue(newValue);

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedValue(value);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      setAnimatedValue(value);
    }
  }, [value, animated]);

  // Calculate gauge properties
  const radius = (size - 40) / 2;
  const strokeWidth = 12;
  const normalizedValue = Math.max(0, Math.min(animatedValue, maxValue));
  const percentage = (normalizedValue / maxValue) * 100;
  
  // Half circle path (180 degrees)
  const circumference = Math.PI * radius;
  const progressLength = (percentage / 100) * circumference;

  // Determine color based on value using green palette
  const getColor = (val: number) => {
    if (val <= 30) return '#8B5A2B'; // Brown for low values
    if (val <= 60) return '#a3d696'; // Light green
    if (val <= 80) return '#097833'; // Dark green
    return '#097833'; // Dark green for excellent
  };

  const color = getColor(normalizedValue);
  const centerX = size / 2;
  const centerY = size / 2;

  return (
    <div className={`rounded-lg shadow-lg p-6 ${className}`} style={{ backgroundColor: '#D6EAD0' }}>
      {/* Header */}
      <div className="flex items-center gap-1 mb-2">
        <Activity className="w-5 h-5" style={{ color: '#097833' }} />
        <h3 className="text-md font-semibold" style={{ color: '#097833' }}>{title}</h3>
      </div>

      {/* Half Gauge */}
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: size, height: size / 2 + 40 }}>
          <svg width={size} height={size / 2 + 40}>
            {/* Background arc */}
            <path
              d={`M 20 ${centerY} A ${radius} ${radius} 0 0 1 ${size - 20} ${centerY}`}
              fill="none"
              stroke="#B8D4B8"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            
            {/* Progress arc */}
            <path
              d={`M 20 ${centerY} A ${radius} ${radius} 0 0 1 ${size - 20} ${centerY}`}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progressLength}
              className="transition-all duration-300 ease-out"
              style={{
                filter: `drop-shadow(0 0 6px ${color}40)`
              }}
            />

            {/* Tick marks */}
            {[0, 25, 50, 75, 100].map((tick) => {
              const angle = (tick / 100) * Math.PI; // 0 to π (180 degrees)
              const x1 = centerX + (radius - 10) * Math.cos(Math.PI - angle);
              const y1 = centerY - (radius - 10) * Math.sin(Math.PI - angle);
              const x2 = centerX + (radius + 2) * Math.cos(Math.PI - angle);
              const y2 = centerY - (radius + 2) * Math.sin(Math.PI - angle);
              
              return (
                <line
                  key={tick}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#6B8F6B"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              );
            })}

            {/* Tick labels */}
            {[0, 25, 50, 75, 100].map((tick) => {
              const angle = (tick / 100) * Math.PI;
              const x = centerX + (radius + 15) * Math.cos(Math.PI - angle);
              const y = centerY - (radius + 15) * Math.sin(Math.PI - angle) + 5;
              
              return (
                <text
                  key={`label-${tick}`}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  className="text-xs"
                  fontSize="10"
                  fill="#4A6B4A"
                >
                  {tick}
                </text>
              );
            })}
          </svg>

          {/* Center Value */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-3xl font-bold" style={{ color: '#097833' }}>
              {Math.round(animatedValue)}
            </div>
            <div className="text-sm" style={{ color: '#6B8F6B' }}>
              / {maxValue}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo component
const HalfGaugeDemo: React.FC = () => {
  const [healthScore, setHealthScore] = useState(80);

  return (
    <div className="rounded-lg " style={{ backgroundColor: '#F0F8F0' }}>
      {/* <div className="max-w-md mx-auto"> */}
        <HalfGauge
          value={healthScore}
          title="Carbon Credit Health"
          size={200}
        />

        {/* Test Controls */}
        {/* <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => setHealthScore(25)}
            className="px-4 py-2 text-white rounded-lg hover:opacity-80 transition-opacity"
            style={{ backgroundColor: '#8B5A2B' }}
          >
            Critical (25)
          </button>
          <button
            onClick={() => setHealthScore(45)}
            className="px-4 py-2 text-white rounded-lg hover:opacity-80 transition-opacity"
            style={{ backgroundColor: '#a3d696' }}
          >
            Warning (45)
          </button>
          <button
            onClick={() => setHealthScore(75)}
            className="px-4 py-2 text-white rounded-lg hover:opacity-80 transition-opacity"
            style={{ backgroundColor: '#097833' }}
          >
            Good (75)
          </button>
          <button
            onClick={() => setHealthScore(95)}
            className="px-4 py-2 text-white rounded-lg hover:opacity-80 transition-opacity"
            style={{ backgroundColor: '#097833' }}
          >
            Excellent (95)
          </button>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default HalfGaugeDemo;