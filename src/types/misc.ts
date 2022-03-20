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
