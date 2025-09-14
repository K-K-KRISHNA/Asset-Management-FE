/* eslint-disable @typescript-eslint/no-explicit-any */
import SnackbarContent from "@mui/material/SnackbarContent";
import * as React from "react";

import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { X } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

type snackType = "success" | "warn" | "error" | "default";
interface IDispatch {
  message?: string;
  type?: snackType;
  dismiss?: boolean;
}
interface dispatchFunc {
  (params: IDispatch): void;
}
export interface showToastFunc {
  (message: string, type: snackType, options?: object): void;
}
interface IState {
  visible: boolean;
  message: string;
  color?: string;
}
interface IToast {
  showToast: showToastFunc;
}
export const ToastContext = React.createContext<IToast>({
  showToast: () => {},
});
export const ToastProvider: React.FC<any> = (props) => {
  const [state, dispatch]: [IState, dispatchFunc] = React.useReducer(
    (prevState: any, action: IDispatch) => {
      let color;

      if (action.dismiss === true) {
        return { ...prevState, visible: false };
      }
      switch (action.type) {
        case "success":
          color = "#357a38";
          break;
        case "warn":
          color = "#ffa000";
          break;
        case "error":
          color = "#d32f2f";
          break;
        default:
          color = "#313131";
          break;
      }
      return {
        ...prevState,
        visible: true,
        //icon,
        color: color,
        message: action.message,
      };
    },
    { visible: false, message: "" }
  );

  const toastContext = React.useMemo(
    () => ({
      showToast: (message: string, type: snackType) => {
        dispatch({ type, message });
      },
    }),
    []
  );
  const { i18n } = useTranslation();
  return (
    <ToastContext.Provider value={toastContext}>
      <>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={state.visible}
          onClose={() => setTimeout(() => dispatch({ dismiss: true }), 5000)}
          autoHideDuration={1000}
        >
          <SnackbarContent
            style={{ backgroundColor: state.color }}
            className={`language-${i18n.language} toast-bar-container`}
            message={<span id="toast">{state.message}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => dispatch({ dismiss: true })}
              >
                <X size={24} weight="bold" />
              </IconButton>,
            ]}
          />
        </Snackbar>
        {props.children}
      </>
    </ToastContext.Provider>
  );
};
export const withToastContext = (ChildComponent: any) => {
  const WrappedComponent = (props: any) => {
    const { showToast } = React.useContext(ToastContext);
    return <ChildComponent {...props} showToast={showToast} />;
  };
  WrappedComponent.displayName = `withToastContext(${ChildComponent.displayName || ChildComponent.name || "Component"})`;
  return WrappedComponent;
};
