import { Company } from "@prisma/client";

import axios from "config/axios";

export default class CompanyService {
  public static async searchCompanies(query: string) {
    const { data } = await axios.get(`/api/companies?q=${query}`);

    return data;
  }

  public static async createCompany(companyData: Partial<Company>) {
    const { data } = await axios.post<Company>("/api/companies", companyData);

    return data;
  }
}
