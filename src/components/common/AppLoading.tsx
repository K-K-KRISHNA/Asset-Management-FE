import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import React from "react";

interface ILoadingProps {
  message?: string;
}

export const AppLoading: React.FC<ILoadingProps> = ({ message }) => {
  return (
    <Dialog open={true} className="loading-dialog" aria-labelledby="loading">
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="text-center">
          <CircularProgress />
        </div>
        {message && <div className="loading">{message}</div>}
      </DialogContent>
    </Dialog>
  );
};

export default AppLoading;
