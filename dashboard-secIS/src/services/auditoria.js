import { api } from "./api";

export async function getAuditoriaOverview() {

  const response = await api.get(
    "/auditoria/overview"
  );

  return response.data;

}
