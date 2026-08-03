import { api } from "./api";

export async function getSCIMetrics(){

  const response = await api.get(
    "/sci/metrics"
  );

  return response.data;

}
