import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import JobsPageContainer from "components/Jobs/JobsPageContainer";
import Layout from "components/Layout";

const JobsPage = ({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout headProps={{ title: "Jobs" }}>
      <JobsPageContainer query={query} />
    </Layout>
  );
};

export default JobsPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  return {
    props: {
      query: {
        page: parseInt((query.page as string) || "1", 10),
        pageSize: parseInt((query.pageSize as string) || "10", 10),
      },
    },
  };
};
