// LoadingContext.tsx
import { registerLoadingFns } from "@/services/utils/loadingManager";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import AppLoading from "./AppLoading";

export const LoadingWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
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
    <>
      {counter > 0 && <AppLoading />}
      {children}
    </>
  );
};
