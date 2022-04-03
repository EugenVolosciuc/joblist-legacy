import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import prisma from "config/prisma";
import Layout from "components/Layout";
import JobPostService from "services/JobPost";
import AddEditJobPostModal from "components/Jobs/AddEditJobPostModal";
import { useRouter } from "next/router";

const EditJobPostPage = ({
  id,
  jobPost: initialJobPost,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { data: jobPost } = JobPostService.useJobPost(id, initialJobPost);

  const handleClose = () => {
    router.back();
  };

  return (
    <Layout>
      <AddEditJobPostModal
        jobPost={jobPost}
        onClose={handleClose}
        closeOnOverlayClick={false}
        isOpen
      />
    </Layout>
  );
};

export default EditJobPostPage;

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
      id: params.id,
      jobPost: JSON.parse(JSON.stringify(jobPost)),
    },
  };
};
