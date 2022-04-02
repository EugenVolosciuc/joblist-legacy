import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

const JobPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <div>JobPage</div>;
};

export default JobPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;

  if (!params?.id || typeof params.id !== "string") return { notFound: true };

  return {
    props: {
      id: params.id,
    },
  };
};
