import { JobPost } from "@prisma/client";
import axios from "axios";

export default class JobPostService {
  public static async createJobPost(jobPostData: Partial<JobPost>) {
    const { data } = await axios.post<JobPost>("/api/job-posts", jobPostData);

    return data;
  }
}
