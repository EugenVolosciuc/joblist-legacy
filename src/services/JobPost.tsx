import { Company, JobPost } from "@prisma/client";
import { QueryFunctionContext, useQuery } from "react-query";

import queryClient from "config/react-query";
import axios from "config/axios";
import { PaginatedPageQuery } from "types/misc";
import { JobPostFilters } from "types/jobPost";

export default class JobPostService {
  public static async createJobPost(jobPostData: Partial<JobPost>) {
    const { data } = await axios.post<JobPost>("/api/job-posts", jobPostData);

    queryClient.invalidateQueries("/api/job-posts");

    return data;
  }

  public static useJobPosts(
    query: PaginatedPageQuery,
    filters: JobPostFilters
  ) {
    console.log("filters", filters);
    const { isLoading, error, data } = useQuery(
      ["/api/job-posts", query, filters],
      this._getJobPosts
    );

    return { isLoading, error, data: data?.data };
  }

  private static async _getJobPosts({
    queryKey,
  }: QueryFunctionContext<
    (string | PaginatedPageQuery | JobPostFilters)[],
    any
  >) {
    const [_key, query, filters] = queryKey;

    return await axios.get<{
      query: PaginatedPageQuery & { filters: JobPostFilters };
      data: (JobPost & { company: Company })[];
    }>(_key as string, {
      params: { ...(query as PaginatedPageQuery), filters },
    });
  }
}
