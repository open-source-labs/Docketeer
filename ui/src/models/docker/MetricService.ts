import { ddClientRequest} from "../ddClientRequest";
import { ContainerPS, LogObject } from "../../../../types";
export const MetricService = {

  async fetchDates(): Promise<any> {
    try {
      const data = await ddClientRequest(`/api/saveMetricsEntry/date`, 'GET');
      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  async createMetrics(entry: any): Promise<any> {
    try {
      const data = await ddClientRequest(`/api/saveMetricsEntry/`, 'POST', entry);
      return data
    } catch (error) {
      console.error(error);
      return false;
    }
  }

}