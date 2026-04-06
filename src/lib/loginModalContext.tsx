"use client";

import { createContext, useCallback, useContext, useState } from "react";

interface LoginModalContextValue {
  /** Call this before any action that requires auth.
   *  Returns true if user is already logged in, false if modal was shown. */
  requireAuth: (onSuccess?: () => void) => boolean;
  isOpen: boolean;
  close: () => void;
  pendingAction: (() => void) | null;
}

const LoginModalContext = createContext<LoginModalContextValue | null>(null);

export function LoginModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const requireAuth = useCallback((onSuccess?: () => void): boolean => {
    // Caller checks auth themselves and calls this only when NOT logged in
    setPendingAction(onSuccess ? () => onSuccess : null);
    // Small natural delay
    setTimeout(() => setIsOpen(true), 220);
    return false;
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setPendingAction(null);
  }, []);

  return (
    <LoginModalContext.Provider value={{ requireAuth, isOpen, close, pendingAction }}>
      {children}
    </LoginModalContext.Provider>
  );
}

export function useLoginModal() {
  const ctx = useContext(LoginModalContext);
  if (!ctx) throw new Error("useLoginModal must be used inside LoginModalProvider");
  return ctx;
}
