import { routes } from "@/constants";
import { logout } from "@/store/slices/authSlice";
import { COLORS } from "@/styles/colors";
import {
  Avatar,
  Badge,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { BellIcon, CaretRightIcon, ListIcon, SignOutIcon, XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useAppDispatch } from "../../store/thunkHelpers";
import CustomDrawerComponent from "./CustomDrawer";

const Sidebar = () => {
  const router = useRouter();
  const isBelowMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  // 🔹 Renders each route item
  const renderRoutes = useMemo(
    () => (
      <List>
        {routes.map(({ label, path, Icon }) => {
          const isActive = router.pathname.includes(path);
          return (
            <ListItemButton
              LinkComponent={Link}
              key={label}
              href={path}
              sx={isActive ? styles.activeTab : undefined}
            >
              <ListItemIcon>
                <Icon size={28} weight="bold" color={COLORS.background} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography fontWeight={600} color={COLORS.background}>
                    {label}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}
      </List>
    ),
    [router.pathname]
  );

  // 🔹 Profile and Logout Section
  const renderProfileSection = (
    <List sx={{ mt: "auto" }}>
      {!isBelowMd && (
        <ListItemButton
          sx={router.pathname === "/profile" ? styles.activeTab : undefined}
          LinkComponent={Link}
          href="/profile"
        >
          <ListItemIcon>
            <Avatar sx={{ height: 40, width: 40 }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <>
                <Typography fontWeight={600} color={COLORS.background}>
                  K K Krishna
                </Typography>
                <Typography fontWeight={700} color={COLORS.background}>
                  Admin
                </Typography>
              </>
            }
          />
          <ListItemIcon>
            <CaretRightIcon size={28} color={COLORS.background} weight="bold" />
          </ListItemIcon>
        </ListItemButton>
      )}
      <ListItemButton
        sx={{ mt: "auto" }}
        onClick={() => {
          dispatch(logout());
          router.push("/");
        }}
      >
        <ListItemIcon>
          <SignOutIcon weight="bold" size={28} color={COLORS.background} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography fontWeight={600} color={COLORS.background}>
              Logout
            </Typography>
          }
        />
      </ListItemButton>
    </List>
  );

  // 🔹 Sidebar Content (Desktop + Drawer)
  const sidebarContent = (
    <Box sx={[styles.mainContainer, isBelowMd && styles.mobileMain]}>
      {/* Header / Logo */}
      <Box
        sx={[styles.logoContainer, isBelowMd && { borderTopRightRadius: 0, position: "relative" }]}
      >
        {!isBelowMd ? (
          <Image width={214} height={50} alt="logo" src="/AppLogo.png" />
        ) : (
          <Stack
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            px={2}
            direction="row"
          >
            <Avatar sx={{ height: 50, width: 50 }} />
            <Stack>
              <Typography>K K Krishna</Typography>
              <Typography fontSize={12}>Admin</Typography>
            </Stack>
            <Typography
              fontWeight={600}
              color="primary"
              fontSize={10}
              ml="auto"
              component={Link}
              href="/profile"
            >
              View Profile
            </Typography>
            <XIcon
              onClick={() => setIsDrawerOpen(false)}
              size={20}
              weight="bold"
              style={{ position: "absolute", top: 1, right: 1 }}
            />
          </Stack>
        )}
      </Box>

      {/* Routes */}
      {renderRoutes}

      {/* Profile + Logout */}
      {renderProfileSection}
    </Box>
  );

  // 🔹 Top Bar (Mobile)
  const mobileHeader = (
    <Stack
      display={isBelowMd ? "flex" : "none"}
      direction="row"
      bgcolor={COLORS.background}
      justifyContent="space-between"
      p={2}
      alignItems="center"
    >
      <ListIcon cursor={"pointer"} size={32} onClick={() => setIsDrawerOpen(true)} />
      <Image width={214} height={50} alt="logo" src="/AppLogo.png" />
      <Badge badgeContent={4} color="primary">
        <BellIcon size={28} />
      </Badge>
    </Stack>
  );

  return (
    <>
      {mobileHeader}
      {isBelowMd ? (
        <CustomDrawerComponent
          anchor="left"
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          {sidebarContent}
        </CustomDrawerComponent>
      ) : (
        sidebarContent
      )}
    </>
  );
};

export default Sidebar;

// 🎨 Styles
const styles: Record<string, SystemStyleObject<Theme>> = {
  mainContainer: {
    width: 346,
    background: `linear-gradient(174.39deg, ${COLORS.sidebar_bg_1} 2.01%, ${COLORS.sidebar_bg_2} 99.87%)`,
    borderTopRightRadius: 75,
    p: 1,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  mobileMain: {
    width: "100%",
    height: "100vh",
    borderTopRightRadius: 0,
  },
  logoContainer: {
    background: COLORS.background,
    height: 75,
    borderTopRightRadius: 67,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: COLORS.background,
    borderRadius: 2,
    ".MuiTypography-root": {
      color: COLORS.sidebar_bg_1,
      fontWeight: 600,
    },
    svg: {
      fill: COLORS.sidebar_bg_1,
    },
    "&:hover": {
      backgroundColor: COLORS.background,
    },
  },
};
