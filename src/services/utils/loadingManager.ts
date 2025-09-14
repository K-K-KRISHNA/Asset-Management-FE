// loadingManager.ts
let startLoadingFn: (() => void) | null = null;
let stopLoadingFn: (() => void) | null = null;

export const registerLoadingFns = (startFn: () => void, stopFn: () => void) => {
  startLoadingFn = startFn;
  stopLoadingFn = stopFn;
};

export const startGlobalLoading = () => {
  if (startLoadingFn) startLoadingFn();
};

export const stopGlobalLoading = () => {
  if (stopLoadingFn) stopLoadingFn();
};
