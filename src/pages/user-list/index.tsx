import dynamic from "next/dynamic";
import Head from "next/head";

const Layout = dynamic(() => import("@/components/common/Layout"), { ssr: false });
const Users = dynamic(() => import("@/components/users/Users"), { ssr: false });

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Users List | Asset Management</title>
        <meta
          name="description"
          content="Users List page of Asset Management showing key metrics and analytics"
        />
        {/* Replace with your own icon in /public */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <Users />
      </Layout>
    </>
  );
};

export default Dashboard;
