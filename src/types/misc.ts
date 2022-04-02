export type AutocompletesReturnType = {
  count: number;
  entities: {
    facet_ids: string[];
    identifier: {
      uuid: string;
      value: string;
      image_id: string;
      permalink: string;
      entity_def_id: string;
    };
    short_description: string;
  }[];
};

export interface PaginationQuery {
  page: number;
  pageSize: number;
}

export interface PageQuery {
  [key: string]: unknown;
}

export interface PaginatedPageQuery extends PageQuery {
  page: number;
  pageSize: number;
  pages?: number;
}
