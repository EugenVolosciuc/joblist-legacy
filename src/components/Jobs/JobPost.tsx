import { FC } from "react";
import { JobPost, Company } from "@prisma/client";

import { Inputs } from "components/Jobs/AddEditJobPostModal";
import Editor from "components/shared/Editor";
import { Heading } from "@chakra-ui/react";

type Props = {
  jobPost: (Partial<JobPost> & { company: Company }) | Inputs;
};

const JobPost: FC<Props> = ({ jobPost }) => {
  const { title, description } = jobPost;
  console.log("jobPost", jobPost);

  return (
    <div>
      {title && <Heading size="lg">{title}</Heading>}
      <Editor initialEditorContent={description} readMode />
    </div>
  );
};

export default JobPost;
