import { Company, JobPost, User } from "@prisma/client";
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

  public static async updateJobPost(id: string, jobPostData: Partial<JobPost>) {
    const { data } = await axios.patch<JobPost>(
      `/api/job-posts/${id}`,
      jobPostData
    );

    queryClient.invalidateQueries("/api/job-posts");

    return data;
  }

  public static async removeJobPost(id: string) {
    await axios.delete(`/api/job-posts/${id}`);

    queryClient.invalidateQueries("/api/job-posts");
  }

  public static async favouriteJobPost(jobPostId: string, userId: string) {
    await axios.patch(`/api/job-posts/${jobPostId}/favourite?userId=${userId}`);

    queryClient.invalidateQueries(["/api/job-posts", jobPostId, userId]);
  }

  public static async unfavouriteJobPost(jobPostId: string, userId: string) {
    await axios.delete(
      `/api/job-posts/${jobPostId}/favourite?userId=${userId}`
    );

    queryClient.invalidateQueries(["/api/job-posts", jobPostId, userId]);
  }

  public static useJobPostIsFavouritedCheck(
    jobPostId: string,
    userId: string,
    dependencies?: boolean[]
  ) {
    const enabled = dependencies
      ? dependencies.every((dependency) => !!dependency)
      : true;

    const { isLoading, error, data, isFetched } = useQuery(
      ["/api/job-posts", jobPostId, userId],
      this._jobPostIsFavouritedCheck,
      { enabled }
    );

    return { isLoading, error, data: data?.data, isFetched };
  }

  public static useJobPosts(
    query: PaginatedPageQuery,
    filters: JobPostFilters,
    dependencies?: boolean[]
  ) {
    const enabled = dependencies
      ? dependencies.every((dependency) => !!dependency)
      : true;

    const { isLoading, error, data } = useQuery(
      ["/api/job-posts", query, filters],
      this._getJobPosts,
      { enabled }
    );

    return { isLoading, error, data: data?.data };
  }

  public static useJobPost(id: string, initialData?: JobPost) {
    const { isLoading, error, data } = useQuery(
      ["/api/job-posts", id],
      this._getJobPost,
      { initialData }
    );

    return {
      isLoading,
      error,
      data: data as JobPost & { company: Company; createdBy: User },
    };
  }

  private static async _jobPostIsFavouritedCheck({
    queryKey,
  }: QueryFunctionContext<string[]>) {
    const [_key, jobPostId, userId] = queryKey;

    return await axios.get<boolean>(
      `${_key}/${jobPostId}/favourite?userId=${userId}`
    );
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

  private static async _getJobPost({
    queryKey,
  }: QueryFunctionContext<string[]>) {
    const [_key, id] = queryKey;

    return (
      await axios.get<JobPost & { company: Company; createdBy: User }>(
        `${_key}/${id}`
      )
    ).data;
  }
}
