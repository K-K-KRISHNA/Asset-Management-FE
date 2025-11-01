import { getRoles } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/thunkHelpers";
import { Typography } from "@mui/material";
import { useEffect } from "react";

const ProfileComponent = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const response = dispatch(getRoles());
    console.log(response, "response");
  }, []);
  return (
    <div>
      <Typography>Hello</Typography>
    </div>
  );
};

export default ProfileComponent;
