import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// Map of dynamic module loaders
const solutionLoaders = {
  1: () => import('./solution-1.jsx'),
  2: () => import('./solution-2.jsx'),
  3: () => import('./solution-3.jsx'),
  4: () => import('./solution-4.jsx'),
  5: () => import('./solution-5.jsx'),
  6: () => import('./solution-6.jsx'),
  7: () => import('./solution-7.jsx'),
  8: () => import('./solution-8.jsx'),
  9: () => import('./solution-9.jsx'),
  10: () => import('./solution-10.jsx'),
  11: () => import('./solution-11.jsx'),
  12: () => import('./solution-12.jsx'),
  13: () => import('./solution-13.jsx'),
  14: () => import('./solution-14.jsx'),
  capstone: () => import('./capstone-solution.jsx')
};

const problemLabels = {
  1: 'Problem 1: Employee Components',
  2: 'Problem 2: Employee Counter (useState)',
  3: 'Problem 3: Employee List (Props)',
  4: 'Problem 4: Registration Form',
  5: 'Problem 5: Employee Search',
  6: 'Problem 6: Activity Tracker (useEffect)',
  7: 'Problem 7: Form Auto Focus (useRef)',
  8: 'Problem 8: Render Counter (useRef)',
  9: 'Problem 9: Router Navigation',
  10: 'Problem 10: Theme Switch (Context API)',
  11: 'Problem 11: Axios GET Request',
  12: 'Problem 12: Complete Axios CRUD',
  13: 'Problem 13: Redux Toolkit Store',
  14: 'Problem 14: Redux + Axios Integration',
  capstone: 'Capstone: Full Employee System'
};

function SolutionSelectorApp() {
  const [selected, setSelected] = useState('1');
  const [LoadedComponent, setLoadedComponent] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setLoadError(null);

    const loader = solutionLoaders[selected];
    if (!loader) {
      setLoadError(`No loader found for selection: ${selected}`);
      setIsLoading(false);
      return;
    }

    loader()
      .then((module) => {
        if (!isMounted) return;
        if (!module.default) {
          throw new Error(`The file does not export a 'default' component.`);
        }
        setLoadedComponent(() => module.default);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setLoadedComponent(null);
        setLoadError(err.message || 'Failed to load file. Ensure code is pasted and saved.');
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selected]);

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', minHeight: '100vh', background: '#f9fafb' }}>
      {/* Top Navbar */}
      <header style={{
        background: '#1f2937',
        color: '#ffffff',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#60a5fa' }}>
          React Practice Solutions
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label htmlFor="solution-select" style={{ fontSize: '14px' }}>Select Solution:</label>
          <select
            id="solution-select"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: '1px solid #4b5563',
              backgroundColor: '#374151',
              color: '#ffffff',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            {Object.entries(problemLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Button Ribbon */}
      <div style={{
        background: '#ffffff',
        padding: '8px 20px',
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
        borderBottom: '1px solid #e5e7eb'
      }}>
        {Object.keys(solutionLoaders).map((key) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            style={{
              padding: '4px 10px',
              fontSize: '12px',
              borderRadius: '4px',
              cursor: 'pointer',
              border: selected === key ? '1px solid #2563eb' : '1px solid #d1d5db',
              backgroundColor: selected === key ? '#2563eb' : '#ffffff',
              color: selected === key ? '#ffffff' : '#374151',
              fontWeight: selected === key ? 'bold' : 'normal'
            }}
          >
            {key === 'capstone' ? 'Capstone' : `P${key}`}
          </button>
        ))}
      </div>

      {/* Solution Display Area */}
      <main style={{ padding: '20px' }}>
        {isLoading && <p style={{ color: '#6b7280' }}>Loading component...</p>}

        {loadError && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #ef4444',
            color: '#b91c1c',
            padding: '16px',
            borderRadius: '6px',
            maxWidth: '600px'
          }}>
            <h4 style={{ margin: '0 0 8px 0' }}>Cannot display {selected === 'capstone' ? 'Capstone' : `solution-${selected}.jsx`}</h4>
            <p style={{ margin: 0, fontSize: '14px' }}>{loadError}</p>
            <p style={{ marginTop: '8px', fontSize: '13px', color: '#7f1d1d' }}>
              Ensure you have pasted the solution code into the corresponding file and saved it.
            </p>
          </div>
        )}

        {!isLoading && !loadError && LoadedComponent && <LoadedComponent />}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SolutionSelectorApp />
  </React.StrictMode>
);