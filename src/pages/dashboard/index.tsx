import { Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";

const Layout = dynamic(() => import("@/components/common/Layout"), { ssr: false });

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard | YourAppName</title>
        <meta
          name="description"
          content="Dashboard page of YourAppName showing key metrics and analytics"
        />
        {/* Replace with your own icon in /public */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <Stack alignItems="center" justifyContent="center" sx={{ minHeight: "80vh" }}>
          <Typography variant="h4" component="h1">
            Dashboard
          </Typography>
        </Stack>
      </Layout>
    </>
  );
};

export default Dashboard;
