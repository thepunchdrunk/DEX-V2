import React, { useState, useEffect } from 'react';
import {
  AppState,
  OnboardingDay,
  UserProfile,
} from '@/types';
import {
  MOCK_USER,
} from '@/config/constants';

// Import components
import OnboardingShell from './features/onboarding/OnboardingShell';
import RoleDashboard from './features/dashboard/RoleDashboard';
import RoleSelectionScreen from './features/onboarding/RoleSelectionScreen';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/core/ToastProvider';

// Import styles
import './styles/design-system.css';

// Storage key for persisting state
const STORAGE_KEY = 'dex_state';

interface AppPersistedState {
  appState: AppState;
  user: UserProfile;
}

const App: React.FC = () => {
  // Load persisted state
  const loadPersistedState = (): AppPersistedState | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load persisted state:', e);
    }
    return null;
  };

  const persistedState = loadPersistedState();

  // App State - Default to ROLE_SELECTION if no persisted state
  const [appState, setAppState] = useState<AppState>(
    persistedState?.appState || 'ROLE_SELECTION'
  );
  const [user, setUser] = useState<UserProfile>(
    persistedState?.user || MOCK_USER
  );

  // Check if today is Wednesday for Simulator
  const isWednesday = new Date().getDay() === 3;

  // Persist state on change
  useEffect(() => {
    const state: AppPersistedState = { appState, user };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [appState, user]);

  // Handle Role Selection
  const handleRoleSelect = (roleData: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...roleData,
    }));
    setAppState('ONBOARDING');
  };

  // Handle onboarding day completion
  const handleDayComplete = (day: OnboardingDay) => {
    setUser((prev) => ({
      ...prev,
      onboardingDay: Math.min(5, day + 1) as OnboardingDay,
      dayProgress: {
        ...prev.dayProgress,
        [day]: {
          ...prev.dayProgress[day],
          completed: true,
          completedAt: new Date().toISOString(),
        },
      },
    }));
  };

  // Handle graduation (transition to Role-Based)
  const handleGraduate = () => {
    setUser((prev) => ({
      ...prev,
      onboardingComplete: true,
    }));
    setAppState('ROLE_BASED');
  };

  // Demo: Unlock all days
  const handleUnlockAll = () => {
    setUser((prev) => {
      const newProgress = { ...prev.dayProgress };
      [1, 2, 3, 4, 5].forEach(day => {
        if (!newProgress[day as OnboardingDay]) {
          newProgress[day as OnboardingDay] = {
            day: day as OnboardingDay,
            completed: true,
            completedAt: new Date().toISOString(),
            tasks: []
          };
        } else {
          newProgress[day as OnboardingDay] = {
            ...newProgress[day as OnboardingDay],
            completed: true,
            completedAt: new Date().toISOString()
          };
        }
      });
      return {
        ...prev,
        onboardingDay: 5 as OnboardingDay,
        dayProgress: newProgress
      };
    });
  };

  // Render Role Selection
  if (appState === 'ROLE_SELECTION') {
    return (
      <ToastProvider>
        <ErrorBoundary>
          <main id="main-content">
            <RoleSelectionScreen onSelectRole={handleRoleSelect} />
          </main>
        </ErrorBoundary>
      </ToastProvider>
    );
  }

  // Render Onboarding Shell
  if (appState === 'ONBOARDING') {
    return (
      <ToastProvider>
        <ErrorBoundary>
          <main id="main-content">
            <OnboardingShell
              user={user}
              onDayComplete={handleDayComplete}
              onGraduate={handleGraduate}
              onUnlockAll={handleUnlockAll}
            />
          </main>
        </ErrorBoundary>
      </ToastProvider>
    );
  }

  // Unified Role-Based Dashboard (Day 6+)
  return (
    <ToastProvider>
      <ErrorBoundary>
        <main id="main-content">
          <RoleDashboard
            user={user}
            isWednesday={isWednesday}
            onUpdateUser={(updates) => setUser((prev) => ({ ...prev, ...updates }))}
          />
        </main>
      </ErrorBoundary>
    </ToastProvider>
  );
};

export default App;
