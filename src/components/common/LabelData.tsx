/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from "@mui/material";
import { FunctionComponent, ReactNode, isValidElement, useContext } from "react";
import { useTranslation } from "react-i18next";
import { ToastContext } from "../../providers/SnackBar";

interface LabelDataProps {
  width?: string;
  label: string;
  data?: any | ReactNode | null;
  disableClipboard?: boolean;
  m?: number;
  p?: number;
}
/**
 * LabelData component displays a label with corresponding data.
 * Optionally, it allows copying the data to clipboard when clicked and shows a toast notification.
 *
 * @component
 * @prop {Object} props - Props for the LabelData component
 * @prop {string} props.label - The label text to display
 * @prop {any | React.ReactNode} [props.data] - The data to display (can be string, number, or React element)
 * @prop {boolean} [props.disableClipboard=true] - If false, clicking the data copies it to clipboard
 * @prop {string} [props.width] - Optional width of the container (e.g., "200px", "100%")
 * @prop {number} [props.m] - Margin
 * @prop {number} [props.p] - Padding
 *
 * @example
 * // Wrap your app with ToastProvider
 * import { ToastProvider } from './providers/SnackBar';
 *
 * function App() {
 *   return (
 *     <ToastProvider>
 *       <LabelData
 *         label="Email"
 *         data="user@example.com"
 *         disableClipboard={false}
 *         width="250px"
 *         m={2}
 *         p={1}
 *       />
 *     </ToastProvider>
 *   );
 * }
 */

const LabelData: FunctionComponent<LabelDataProps> = ({
  label,
  data,
  disableClipboard = true,
  width,
  m,
  p,
}) => {
  // context
  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", width, m, p }}
      className={disableClipboard ? "" : "pointable"}
      onClick={
        disableClipboard === false
          ? () => {
              if (isValidElement(data)) {
                return;
              }
              navigator.clipboard.writeText(data);
              showToast(`${t("copied")} ${data} ${t("toClipBoard")}`, "success");
            }
          : undefined
      }
    >
      <Typography
        variant="subtitle1"
        component="p"
        sx={{
          fontWeight: 400,
          bottom: 0,
          color: "#6F6F6F",
        }}
      >
        {label}
      </Typography>

      {isValidElement(data) ? (
        data
      ) : (
        <Typography variant="body1" fontWeight={500}>
          <span>{data != null ? data.toString() : "-"}</span>
        </Typography>
      )}
    </Box>
  );
};

export default LabelData;
