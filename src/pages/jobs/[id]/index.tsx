import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Company, JobPost, User } from "@prisma/client";

import Layout from "components/Layout";
import JobPageContainer from "components/Jobs/JobPageContainer";
import JobPostService from "services/JobPost";
import prisma from "config/prisma";

const JobPage = ({
  jobPost: initialJobPost,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: jobPost } = JobPostService.useJobPost(
    (initialJobPost as JobPost).id,
    initialJobPost
  );

  return (
    <Layout headProps={{ title: `${jobPost?.title}@${jobPost.company.name}` }}>
      <JobPageContainer
        jobPost={jobPost as JobPost & { company: Company; createdBy: User }}
      />
    </Layout>
  );
};

export default JobPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;

  if (!params?.id || typeof params.id !== "string") return { notFound: true };

  const jobPost = await prisma.jobPost.findUnique({
    where: { id: params.id },
    include: { company: true, createdBy: true },
  });

  if (!jobPost) return { notFound: true };

  return {
    props: {
      jobPost: JSON.parse(JSON.stringify(jobPost)),
    },
  };
};
