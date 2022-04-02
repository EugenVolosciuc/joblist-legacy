import JobsPageContainer from "components/Jobs/JobsPageContainer";
import Layout from "components/Layout";
import JobPostService from "services/JobPost";

const JobsPage = () => {
  const { data } = JobPostService.useJobPosts({});

  console.log("data", data);
  return (
    <Layout>
      <JobsPageContainer />
    </Layout>
  );
};

export default JobsPage;
