// LoadingContext.tsx
import { registerLoadingFns } from "@/services/utils/loadingManager";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AppLoading from "../components/common/AppLoading";

interface LoadingContextType {
  counter: number;
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [counter, setCounter] = useState(0);

  const startLoading = useCallback(() => {
    setCounter((prev) => prev + 1);
  }, []);

  const stopLoading = useCallback(() => {
    setCounter((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    registerLoadingFns(startLoading, stopLoading);
  }, [startLoading, stopLoading]);

  return (
    <LoadingContext.Provider
      value={{
        counter,
        isLoading: counter > 0,
        startLoading,
        stopLoading,
      }}
    >
      {counter > 0 && <AppLoading />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
