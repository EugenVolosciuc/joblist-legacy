import { JobPost } from "@prisma/client";
import axios from "axios";
import { QueryFunctionContext, useQuery } from "react-query";

import { PaginatedPageQuery } from "types/misc";

export default class JobPostService {
  public static async createJobPost(jobPostData: Partial<JobPost>) {
    const { data } = await axios.post<JobPost>("/api/job-posts", jobPostData);

    return data;
  }

  public static useJobPosts(filters: any) {
    console.log("filters", filters);
    const { isLoading, error, data } = useQuery(
      ["/api/job-posts"],
      this._getJobPosts
    );

    return { isLoading, error, data: data?.data };
  }

  private static async _getJobPosts({
    queryKey,
  }: QueryFunctionContext<(string | PaginatedPageQuery)[], any>) {
    const [_key, query] = queryKey;

    return await axios.get<{ query: PaginatedPageQuery; data: JobPost[] }>(
      _key as string,
      { params: query }
    );
  }
}
