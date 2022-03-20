import { Company } from "@prisma/client";
import { AutocompletesReturnType } from "types/misc";

const crunchbaseAssetURL =
  "https://res.cloudinary.com/crunchbase-production/image/upload/";

export const crunchbaseDataParser = (
  data: AutocompletesReturnType
): Partial<Company>[] => {
  return data.entities.map((entity) => ({
    crunchbaseId: entity.identifier.uuid,
    logoURL: entity.identifier.image_id
      ? `${crunchbaseAssetURL}${entity.identifier.image_id}`
      : undefined,
    description: entity.short_description,
    name: entity.identifier.value,
  }));
};
