import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";
import { AutocompletesReturnType } from "types/misc";
import { crunchbaseDataParser } from "utils/parsers";
import { serverErrorHandler } from "utils/error-handlers";
import axios from "config/axios";

const crunchbaseApiURL = `https://${process.env.CRUNCHBASE_API_HOST}`;

const getCompanies = async (req: NextApiRequest, res: NextApiResponse) => {
  const { q } = req.query;

  try {
    const companiesSavedInDB = await prisma.company.findMany({
      where: {
        name: {
          contains: q as string,
        },
      },
    });

    if (companiesSavedInDB.length <= 10) {
      const { data } = await axios.get<AutocompletesReturnType>(
        `${crunchbaseApiURL}/autocompletes`,
        {
          params: {
            query: q,
            collection_ids: "organizations",
            limit: 10 - companiesSavedInDB.length,
          },
          headers: {
            "x-rapidapi-host": process.env.CRUNCHBASE_API_HOST as string,
            "x-rapidapi-key": process.env.RAPIDAPI_KEY as string,
          },
        }
      );

      return res.json([...companiesSavedInDB, ...crunchbaseDataParser(data)]);
    }

    return res.json([...companiesSavedInDB]);
  } catch (error) {
    serverErrorHandler(res, error);
  }
};

export default getCompanies;
