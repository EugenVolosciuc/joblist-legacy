import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import prisma from "config/prisma";
import { AutocompletesReturnType } from "types/misc";
import { crunchbaseDataParser } from "utils/parsers";
import { serverErrorHandler } from "utils/error-handlers";

const crunchbaseApiURL = `https://${process.env.CRUNCHBASE_API_HOST}`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { q } = req.query;

    if (req.method === "GET") {
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
    } else if (req.method === "POST") {
      const company = await prisma.company.create({ data: req.body });

      return res.status(201).json(company);
    } else {
      return res.status(404).json({ message: "Route not found" });
    }
  } catch (error) {
    return serverErrorHandler(res, error);
  }
};
