import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { VitalsGrid } from '@/components/vitals-grid';
import { VitalsChart } from '@/components/vitals-chart';
import { EmergencyAlerts } from '@/components/emergency-alerts';
import { ThresholdSettings } from '@/components/threshold-settings';
import { generateMockVitalData, VitalReading } from '@/lib/mock-data';
import { detectCriticalAlerts, VitalAlert } from '@/lib/alert-detection';

export default function Dashboard() {
  const [vitals, setVitals] = useState<VitalReading[]>([]);
  const [alerts, setAlerts] = useState<VitalAlert[]>([]);
  const [thresholds, setThresholds] = useState({
    heartRateHigh: 120,
    heartRateLow: 50,
    systolicHigh: 180,
    diastolicHigh: 120,
    diastolicLow: 60,
  });
  const [showThresholds, setShowThresholds] = useState(false);

  // Initialize and stream mock data
  useEffect(() => {
    setVitals(generateMockVitalData(50));

    const interval = setInterval(() => {
      setVitals((prev) => {
        const newData = generateMockVitalData(1)[0];
        const updated = [...prev.slice(-49), newData];
        
        const newAlerts = detectCriticalAlerts(newData, thresholds);
        if (newAlerts.length > 0) {
          setAlerts((a) => [
            ...newAlerts,
            ...a.filter((alert) => Date.now() - alert.timestamp < 30000),
          ].slice(0, 10));
        }

        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [thresholds]);

  const currentVitals = vitals[vitals.length - 1] || generateMockVitalData(1)[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onSettingsClick={() => setShowThresholds(!showThresholds)} />
      
      <main className="container mx-auto px-4 py-6">
        {/* Emergency Alerts Section */}
        {alerts.length > 0 && <EmergencyAlerts alerts={alerts} />}

        {/* Main Vitals Display */}
        <div className="grid gap-6">
          <VitalsGrid currentVitals={currentVitals} thresholds={thresholds} />

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VitalsChart data={vitals} title="Heart Rate (BPM)" dataKey="heartRate" />
            <VitalsChart
              data={vitals}
              title="Blood Pressure"
              dataKey="systolic"
              dataKey2="diastolic"
            />
          </div>
        </div>

        {/* Threshold Settings Panel */}
        {showThresholds && (
          <ThresholdSettings
            thresholds={thresholds}
            onThresholdsChange={setThresholds}
            onClose={() => setShowThresholds(false)}
          />
        )}
      </main>
    </div>
  );
}
