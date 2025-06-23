import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TreePine, Thermometer, Wind, Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface SensorData {
  timestamp: string;
  temperature: number;
  co2: number;
  humidity: number;
  temperatureNorm: number;
  co2Norm: number;
  humidityNorm: number;
  aggregateScore: number;
}

interface ClassificationThresholds {
  q1: number;
  q3: number;
  iqr: number;
  lowerBound: number;
  upperBound: number;
}

type AlertLevel = 'low' | 'medium' | 'high';
type Scenario = 'normal' | 'wildfire';

const ForestryDashboard: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [currentData, setCurrentData] = useState<SensorData | null>(null);
  const [thresholds, setThresholds] = useState<ClassificationThresholds | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [currentScenario, setCurrentScenario] = useState<Scenario>('normal');

  // Generate random sensor values based on scenario
  const generateSensorValue = (min: number, max: number, scenario: Scenario = 'normal'): { temp: number, co2: number, humidity: number } => {
    if (scenario === 'wildfire') {
      // Wildfire scenario: high temperature, very low humidity, high CO2
      const temperature = Math.random() * 15 + 35; // 35-50°C
      const humidity = Math.random() * 20 + 10; // 10-30%
      const co2 = Math.random() * 200 + 500; // 500-700 ppm
      return { temp: temperature, co2, humidity };
    } else {
      // Normal scenario: optimal forest conditions
      const temperature = Math.random() * 20 + 15; // 15-35°C
      const humidity = Math.random() * 50 + 40; // 40-90%
      const co2 = Math.random() * 100 + 350; // 350-450 ppm
      return { temp: temperature, co2, humidity };
    }
  };

  // Normalize values to 0-100 scale with scenario-specific ranges
  const normalizeValue = (value: number, min: number, max: number): number => {
    return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  };

  // Get dynamic ranges based on scenario
  const getRanges = (scenario: Scenario) => {
    if (scenario === 'wildfire') {
      return {
        temp: { min: 10, max: 55 },
        co2: { min: 300, max: 750 },
        humidity: { min: 5, max: 95 }
      };
    }
    return {
      temp: { min: 10, max: 40 },
      co2: { min: 300, max: 500 },
      humidity: { min: 30, max: 95 }
    };
  };

  // Calculate IQR and classification thresholds
  const calculateIQRThresholds = (data: number[]): ClassificationThresholds => {
    const sorted = [...data].sort((a, b) => a - b);
    const n = sorted.length;
    const q1Index = Math.floor(n * 0.25);
    const q3Index = Math.floor(n * 0.75);
    
    const q1 = sorted[q1Index];
    const q3 = sorted[q3Index];
    const iqr = q3 - q1;
    
    return {
      q1,
      q3,
      iqr,
      lowerBound: q1 - 1.5 * iqr,
      upperBound: q3 + 1.5 * iqr
    };
  };

  // Classify alert level based on IQR (HIGH = GOOD for forestry health)
  const classifyAlertLevel = (value: number, thresholds: ClassificationThresholds): AlertLevel => {
    if (value >= thresholds.q3) return 'high'; // High values = Good health
    if (value <= thresholds.q1) return 'low';  // Low values = Poor health
    return 'medium';
  };

  // Generate new sensor data point
  const generateDataPoint = (): SensorData => {
    const now = new Date();
    const ranges = getRanges(currentScenario);
    const sensorValues = generateSensorValue(0, 0, currentScenario);
    
    const { temp: temperature, co2, humidity } = sensorValues;
    
    const temperatureNorm = normalizeValue(temperature, ranges.temp.min, ranges.temp.max);
    const co2Norm = normalizeValue(co2, ranges.co2.min, ranges.co2.max);
    const humidityNorm = normalizeValue(humidity, ranges.humidity.min, ranges.humidity.max);
    
    // Aggregate score for forest health (higher humidity and moderate temp = better, lower CO2 = better)
    // In wildfire scenarios, this will result in lower aggregate scores
    const aggregateScore = (
      (100 - Math.abs(temperatureNorm - 60)) * 0.3 + // Optimal around 60% of temp range
      (100 - co2Norm) * 0.3 + // Lower CO2 is better
      humidityNorm * 0.4 // Higher humidity is better
    );
    
    return {
      timestamp: now.toLocaleTimeString(),
      temperature,
      co2,
      humidity,
      temperatureNorm,
      co2Norm,
      humidityNorm,
      aggregateScore: Math.max(0, Math.min(100, aggregateScore))
    };
  };

  // Initialize and update data
  useEffect(() => {
    // Generate initial data (last 20 readings)
    const initialData: SensorData[] = [];
    for (let i = 19; i >= 0; i--) {
      const timestamp = new Date(Date.now() - i * 120000).toLocaleTimeString(); // 2 minutes intervals
      const ranges = getRanges('normal'); // Start with normal scenario
      const sensorValues = generateSensorValue(0, 0, 'normal');
      
      const { temp: temperature, co2, humidity } = sensorValues;
      
      const temperatureNorm = normalizeValue(temperature, ranges.temp.min, ranges.temp.max);
      const co2Norm = normalizeValue(co2, ranges.co2.min, ranges.co2.max);
      const humidityNorm = normalizeValue(humidity, ranges.humidity.min, ranges.humidity.max);
      
      const aggregateScore = (
        (100 - Math.abs(temperatureNorm - 60)) * 0.3 +
        (100 - co2Norm) * 0.3 +
        humidityNorm * 0.4
      );
      
      initialData.push({
        timestamp,
        temperature,
        co2,
        humidity,
        temperatureNorm,
        co2Norm,
        humidityNorm,
        aggregateScore: Math.max(0, Math.min(100, aggregateScore))
      });
    }
    
    setSensorData(initialData);
    setCurrentData(initialData[initialData.length - 1]);
    
    // Calculate initial thresholds
    const aggregateScores = initialData.map(d => d.aggregateScore);
    setThresholds(calculateIQRThresholds(aggregateScores));
  }, []);

  // Update data every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateDataPoint();
      
      setSensorData(prev => {
        const updated = [...prev.slice(-19), newData];
        
        // Recalculate thresholds with new data
        const aggregateScores = updated.map(d => d.aggregateScore);
        setThresholds(calculateIQRThresholds(aggregateScores));
        
        return updated;
      });
      
      setCurrentData(newData);
      
      // Simulate occasional connection issues
      setIsConnected(Math.random() > 0.05);
    }, 30000); // 2 minutes = 120,000 milliseconds

    return () => clearInterval(interval);
  }, [currentScenario]);

  const getAlertColor = (level: AlertLevel): string => {
    switch (level) {
      case 'low': return 'text-red-600 bg-red-100';     // Poor health = Red
      case 'medium': return 'text-yellow-600 bg-yellow-100'; // Medium health = Yellow
      case 'high': return 'text-green-600 bg-green-100'; // Good health = Green
    }
  };

  const getAlertIcon = (level: AlertLevel) => {
    switch (level) {
      case 'low': return <XCircle className="w-5 h-5" />;        // Poor health
      case 'medium': return <AlertTriangle className="w-5 h-5" />; // Medium health
      case 'high': return <CheckCircle className="w-5 h-5" />;   // Good health
    }
  };

  const getAlertLabel = (level: AlertLevel): string => {
    switch (level) {
      case 'low': return 'Poor Health';
      case 'medium': return 'Fair Health';
      case 'high': return 'Good Health';
    }
  };

  const currentAlert = currentData && thresholds 
    ? classifyAlertLevel(currentData.aggregateScore, thresholds)
    : 'medium';

  return (
    <div className="min-h-screen bg-[#D6EBD0] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <TreePine className="w-8 h-8 text-green-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Forestry IoT Dashboard</h1>
                <p className="text-gray-600">Real-time forest health monitoring system</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Scenario Selector */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Scenario:</label>
                <select 
                  value={currentScenario} 
                  onChange={(e) => setCurrentScenario(e.target.value as Scenario)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="normal">Normal Forest</option>
                  <option value="wildfire">Wildfire Risk</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Temperature</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentData?.temperature.toFixed(1)}°C
                </p>
                <p className="text-sm text-gray-500">
                  Norm: {currentData?.temperatureNorm.toFixed(0)}/100
                </p>
              </div>
              <Thermometer className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">CO₂ Level</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentData?.co2.toFixed(0)} ppm
                </p>
                <p className="text-sm text-gray-500">
                  Norm: {currentData?.co2Norm.toFixed(0)}/100
                </p>
              </div>
              <Activity className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Humidity</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentData?.humidity.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">
                  Norm: {currentData?.humidityNorm.toFixed(0)}/100
                </p>
              </div>
              <Wind className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Forest Health</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentData?.aggregateScore.toFixed(0)}/100
                </p>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAlertColor(currentAlert)}`}>
                  {getAlertIcon(currentAlert)}
                  <span className="ml-1">{getAlertLabel(currentAlert)}</span>
                </div>
              </div>
              <TreePine className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Scenario Information */}
        <div className={`rounded-lg shadow-lg p-6 mb-6 ${currentScenario === 'wildfire' ? 'bg-red-50 border-l-4 border-red-500' : 'bg-green-50 border-l-4 border-green-500'}`}>
          <div className="flex items-center space-x-3">
            {currentScenario === 'wildfire' ? (
              <AlertTriangle className="w-6 h-6 text-red-600" />
            ) : (
              <CheckCircle className="w-6 h-6 text-green-600" />
            )}
            <div>
              <h3 className={`text-lg font-semibold ${currentScenario === 'wildfire' ? 'text-red-800' : 'text-green-800'}`}>
                {currentScenario === 'wildfire' ? 'Wildfire Risk Scenario Active' : 'Normal Forest Conditions'}
              </h3>
              <p className={`text-sm ${currentScenario === 'wildfire' ? 'text-red-700' : 'text-green-700'}`}>
                {currentScenario === 'wildfire' 
                  ? 'Simulating extreme conditions: High temperature (35-50°C), Low humidity (10-30%), Elevated CO₂ (500-700 ppm)'
                  : 'Optimal forest conditions: Moderate temperature (15-35°C), Good humidity (40-90%), Normal CO₂ (350-450 ppm)'
                }
              </p>
            </div>
          </div>
        </div>

        {/* IQR Classification Info */}
        {thresholds && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">IQR Classification Thresholds</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
              <div className="text-center">
                <p className="font-medium text-gray-600">Q1 (25%)</p>
                <p className="text-lg font-bold text-red-600">{thresholds.q1.toFixed(1)}</p>
                <p className="text-xs text-red-500">Poor Health</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-600">Q3 (75%)</p>
                <p className="text-lg font-bold text-green-600">{thresholds.q3.toFixed(1)}</p>
                <p className="text-xs text-green-500">Good Health</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-600">IQR</p>
                <p className="text-lg font-bold text-gray-700">{thresholds.iqr.toFixed(1)}</p>
                <p className="text-xs text-gray-500">Interquartile Range</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-600">Lower Bound</p>
                <p className="text-lg font-bold text-red-600">{thresholds.lowerBound.toFixed(1)}</p>
                <p className="text-xs text-red-500">Outlier Detection</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-600">Upper Bound</p>
                <p className="text-lg font-bold text-red-600">{thresholds.upperBound.toFixed(1)}</p>
                <p className="text-xs text-red-500">Outlier Detection</p>
              </div>
            </div>
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Time Series Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-time Sensor Data</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperatureNorm" stroke="#ef4444" name="Temperature" strokeWidth={2} />
                <Line type="monotone" dataKey="co2Norm" stroke="#8b5cf6" name="CO₂" strokeWidth={2} />
                <Line type="monotone" dataKey="humidityNorm" stroke="#3b82f6" name="Humidity" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Aggregate Score Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Forest Health Score</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}`, 'Health Score']} />
                <Line 
                  type="monotone" 
                  dataKey="aggregateScore" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
                {thresholds && (
                  <>
                    <Line 
                      type="monotone" 
                      dataKey={() => thresholds.q1} 
                      stroke="#ef4444" 
                      strokeDasharray="5 5"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey={() => thresholds.q3} 
                      stroke="#10b981" 
                      strokeDasharray="5 5"
                      strokeWidth={2}
                      dot={false}
                    />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Readings Table */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Readings</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temp (°C)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CO₂ (ppm)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Humidity (%)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sensorData.slice(-5).reverse().map((data, index) => {
                  const alertLevel = thresholds ? classifyAlertLevel(data.aggregateScore, thresholds) : 'medium';
                  return (
                    <tr key={index} className={index === 0 ? 'bg-green-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.timestamp}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.temperature.toFixed(1)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.co2.toFixed(0)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.humidity.toFixed(1)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.aggregateScore.toFixed(1)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAlertColor(alertLevel)}`}>
                          {getAlertIcon(alertLevel)}
                          <span className="ml-1">{getAlertLabel(alertLevel)}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForestryDashboard;