import { Chip, Grid, IconButton, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import { EyeIcon, PencilIcon } from "@phosphor-icons/react";
import { Form, Formik } from "formik";
import Image from "next/image";
import { COLORS } from "../../styles/colors";
import { IMenu, UserStatus } from "../../vm";
import AppButton from "../common/AppButton";
import AppSelectInput from "../common/AppSelectInput";
import AppTextInput from "../common/AppTextInput";
import GenericTable, { Column } from "../common/GenericTable";
import EachUserCard from "./EachUserCard";

const statusItems: IMenu[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive",
    value: "active",
  },
];

interface SearchValues {
  searchText: string;
  status: UserStatus | "all";
}

interface Employee {
  id: number;
  photo: string;
  username: string;
  designation: string;
  latestAsset: string;
  status: "Active" | "Inactive";
}

// Dummy Data
const employees: Employee[] = [
  {
    id: 1,
    photo: `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 99)}.jpg`,
    username: "Rohan Naik",
    designation: "Software Developer",
    latestAsset: "Laptop",
    status: "Active",
  },
  {
    id: 2,
    photo: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
    username: "Suresh Patel",
    designation: "Software Developer",
    latestAsset: "Desktop",
    status: "Active",
  },
  {
    id: 3,
    photo: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
    username: "Ajay Sharma",
    designation: "Software Developer",
    latestAsset: "Mobile",
    status: "Active",
  },
  {
    id: 4,
    photo: `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 99)}.jpg`,
    username: "Pooja Verma",
    designation: "Software Developer",
    latestAsset: "Laptop",
    status: "Inactive",
  },
  {
    id: 5,
    photo: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
    username: "Rahul Gupta",
    designation: "Software Developer",
    latestAsset: "Keyboard",
    status: "Active",
  },
];

// Column Definitions
const columns: Column<Employee>[] = [
  {
    key: "photo",
    header: "Photo",
    render: (value) => (
      <Image
        alt="employee"
        width={40}
        height={40}
        src={String(value)}
        style={{ borderRadius: "5px", objectFit: "cover" }}
      />
    ),
  },
  {
    key: "username",
    header: "Username",
  },
  { key: "designation", header: "Designation" },
  { key: "latestAsset", header: "Latest asset" },
  {
    key: "status",
    header: "Status",
    render: (value) => (
      <Chip
        label={value}
        sx={{ width: "110px", p: { color: COLORS.background } }}
        color={value === "Active" ? "success" : "error"}
      />
    ),
  },
  {
    key: "id",
    header: "Actions",
    render: () => (
      <Stack direction={"row"} justifyContent={"center"}>
        <IconButton>
          <EyeIcon size={24} color={COLORS.grey_table_cell} />
        </IconButton>
        <IconButton>
          <PencilIcon size={24} color={COLORS.grey_table_cell} />
        </IconButton>
      </Stack>
    ),
  },
];

const SearchForm = ({ onSearch }: { onSearch: (values: SearchValues) => void }) => {
  return (
    <Formik<SearchValues>
      initialValues={{
        searchText: "",
        status: "all",
      }}
      onSubmit={(values) => {
        onSearch(values);
      }}
    >
      {({ values, handleChange, handleSubmit, resetForm, initialValues }) => (
        <Form onSubmit={handleSubmit}>
          <Stack
            width={"100%"}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
          >
            {/* 🔹 Text Search Field */}
            <AppTextInput
              name="searchText"
              label="Search"
              value={values.searchText}
              onChange={handleChange}
              sx={{ minWidth: 200 }}
            />

            {/* 🔹 Status Dropdown */}
            <AppSelectInput
              menuItems={statusItems}
              name="status"
              label="Status"
              value={values.status}
              onChange={handleChange}
            />

            {/* 🔹 Buttons */}
            <Stack direction="row" spacing={1}>
              <AppButton btnText={"Search"} type="submit" variant="contained" />
              <AppButton
                btnText={"Clear"}
                onClick={() => {
                  resetForm();
                }}
                variant="outlined"
              />
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

const Users = () => {
  const isBelowMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <Stack rowGap={2}>
      <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
        <Typography variant="h3" color="primary">
          User List
        </Typography>
        <Stack>
          <Typography variant="h6" textAlign={"right"}>
            Total Users : 238
          </Typography>
          <Typography variant="h6" textAlign={"right"}>
            Active : 189
          </Typography>
        </Stack>
      </Stack>
      <Grid container alignItems={"center"}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <SearchForm onSearch={() => {}} />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }} display={"flex"} justifyContent={"right"}>
          <AppButton btnText={"Add New User"} variant="contained" />
        </Grid>
      </Grid>
      <Grid container>
        <Paper sx={{ width: "100%", borderRadius: "10px" }}>
          <GenericTable
            data={employees}
            MobileViewCard={EachUserCard}
            columns={columns}
            count={84}
            currentPage={2}
          />
        </Paper>
      </Grid>
    </Stack>
  );
};

export default Users;
