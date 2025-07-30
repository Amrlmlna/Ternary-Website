import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastProvider } from "../contexts/ToastContext";

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from "@testing-library/react";
export { customRender as render };

// Mock data for tests
export const mockUser = {
  id: "test-user-id",
  email: "test@example.com",
  user_metadata: {
    full_name: "Test User",
    avatar_url: "https://example.com/avatar.jpg",
  },
  app_metadata: {
    provider: "google",
  },
  created_at: "2024-01-01T00:00:00Z",
};

export const mockSession = {
  access_token: "test-access-token",
  refresh_token: "test-refresh-token",
  user: mockUser,
};

// Mock Supabase client
export const mockSupabase = {
  auth: {
    getSession: jest.fn(),
    getUser: jest.fn(),
    signInWithOAuth: jest.fn(),
    signInWithOtp: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChange: jest.fn(() => ({
      data: { subscription: { unsubscribe: jest.fn() } },
    })),
  },
};

// Mock Google One Tap
export const mockGoogleOneTap = {
  initialize: jest.fn(),
  prompt: jest.fn(),
  renderButton: jest.fn(),
};

// Mock window.matchMedia
export const mockMatchMedia = (matches: boolean = false) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

// Mock localStorage
export const mockLocalStorage = () => {
  const store: Record<string, string> = {};

  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        Object.keys(store).forEach((key) => delete store[key]);
      }),
    },
    writable: true,
  });
};

// Mock IntersectionObserver
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
};

// Mock ResizeObserver
export const mockResizeObserver = () => {
  const mockResizeObserver = jest.fn();
  mockResizeObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.ResizeObserver = mockResizeObserver;
};

// Mock Performance API
export const mockPerformance = () => {
  Object.defineProperty(window, "performance", {
    value: {
      now: jest.fn(() => Date.now()),
      mark: jest.fn(),
      measure: jest.fn(() => ({ duration: 100 })),
      getEntriesByType: jest.fn(() => []),
    },
    writable: true,
  });
};

// Mock Notification API
export const mockNotifications = () => {
  Object.defineProperty(window, "Notification", {
    value: {
      permission: "granted",
      requestPermission: jest.fn(() => Promise.resolve("granted")),
    },
    writable: true,
  });
};

// Mock Service Worker
export const mockServiceWorker = () => {
  Object.defineProperty(navigator, "serviceWorker", {
    value: {
      register: jest.fn(() => Promise.resolve({})),
      ready: Promise.resolve({}),
    },
    writable: true,
  });
};

// Setup all mocks
export const setupMocks = () => {
  mockMatchMedia();
  mockLocalStorage();
  mockIntersectionObserver();
  mockResizeObserver();
  mockPerformance();
  mockNotifications();
  mockServiceWorker();
};

// Test helpers
export const waitForElementToBeRemoved = (element: Element) => {
  return new Promise<void>((resolve) => {
    const observer = new MutationObserver(() => {
      if (!document.contains(element)) {
        observer.disconnect();
        resolve();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
};

export const createMockEvent = (type: string, options: any = {}) => {
  return new Event(type, { bubbles: true, cancelable: true, ...options });
};

export const createMockKeyboardEvent = (key: string, options: any = {}) => {
  return new KeyboardEvent("keydown", {
    key,
    bubbles: true,
    cancelable: true,
    ...options,
  });
};
