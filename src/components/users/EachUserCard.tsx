import { Avatar, Box, Card, Chip, IconButton, Stack, Typography } from "@mui/material";
import { EyeIcon, PencilSimpleIcon } from "@phosphor-icons/react";
import { COLORS } from "../../styles/colors";

type Employee = {
  id: number;
  photo: string;
  username: string;
  designation: string;
  latestAsset: string;
  status: "Active" | "Inactive";
};

interface EachUserCardProps<T> {
  data: T;
}

const EachUserCard = <T extends Employee>({ data }: EachUserCardProps<T>) => {
  const { photo, username, designation, latestAsset, status } = data;

  return (
    <Card
      elevation={1}
      sx={{
        borderRadius: 2,
        mb: 2,
        p: 2,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar src={photo} alt={username} sx={{ width: 56, height: 56 }} />

        <Box flexGrow={1}>
          <Typography fontWeight={600} fontSize="15px" color="#222">
            {username}
          </Typography>
          <Typography fontSize="13px" color="text.secondary">
            {designation}
          </Typography>

          <Typography fontSize="13px" color="#555" mt={0.5}>
            Latest Asset:{" "}
            <Typography component="span" fontWeight={500}>
              {latestAsset}
            </Typography>
          </Typography>

          <Chip
            label={status}
            sx={{
              width: "110px",
              mt: 1,
              color: "#fff",
              backgroundColor: status === "Active" ? COLORS.success : COLORS.error,
            }}
          />
        </Box>

        <Stack direction="row" spacing={1}>
          <IconButton color="primary">
            <EyeIcon size={20} />
          </IconButton>
          <IconButton color="primary">
            <PencilSimpleIcon size={20} />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
};

export default EachUserCard;
