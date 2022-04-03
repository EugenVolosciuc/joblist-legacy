import Layout from "components/Layout";
import type { NextPage } from "next";

import UserService from "services/User";

const Home: NextPage = () => {
  return (
    <Layout>
      <p>Homepage</p>
    </Layout>
  );
};

export default Home;
