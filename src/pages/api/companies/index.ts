import type { NextApiRequest, NextApiResponse } from "next";

import getCompanies from "api/handlers/companies/getCompanies";
import createCompany from "api/handlers/companies/createCompany";
import notFound from "api/handlers/notFound";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return await getCompanies(req, res);
    case "POST":
      return await createCompany(req, res);
    default:
      return notFound(res);
  }
};
