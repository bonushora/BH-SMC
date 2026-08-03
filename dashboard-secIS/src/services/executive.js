import { api } from "./api";

export async function getExecutiveOverview() {

  const response = await api.get(
    "/executive/overview"
  );

  return response.data;

}
