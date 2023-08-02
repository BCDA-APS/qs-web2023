import axios from "axios"
import { BACKEND_URL } from "../config";

class ServerCalls {
    //Routes to our backend server

    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl;
    };

    async request({ endpoint, method = `GET`, data = {} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        try {
          const res = await axios({ url, method, data })
          return { data: res.data, error: null }
        } catch (error) {
          console.error({ errorResponse: error.response })
          const message = error?.response?.data?.error?.message
          return { data: null, error: message || String(error) }
        }
    };

    async getPlans() {
        return await this.request({ endpoint: `plans`, method: `GET`});
    };

    async haltPlans() {
        return await this.request({ endpoint: `plans/halt`, method: `POST`});
    };

    async abortPlans() {
        return await this.request({ endpoint: `plans/abort`, method: `POST`});
    };

    async resumePlans() {
        return await this.request({ endpoint: `plans/resume`, method: `POST`});
    };

    async stopPlans() {
        return await this.request({ endpoint: `plans/stop`, method: `POST`});
    };

    async pausePlans(data) {
        return await this.request({ endpoint: `plans/pause`, method: `POST`, data});
    };

    async getDevices() {
        return await this.request({ endpoint: `devices/allowed`, method: `GET`});
    };

    async getConsoleOutput() {
        return await this.request({ endpoint: `console`, method: `GET`});
    };

    async getConsoleOutputUID() {
        return await this.request({ endpoint: `console/uid`, method: `GET`});
    };

    async openEnvironment() {
        return await this.request({ endpoint: `environment/open`, method: `POST`});
    };

    async closeEnvironment() {
        return await this.request({ endpoint: `environment/close`, method: `POST`});
    };

    async destroyEnvironment() {
        return await this.request({ endpoint: `environment/destroy`, method: `POST`});
    };

    async getHistory() {
        return await this.request({ endpoint: `history`, method: `GET`});
    };

    async clearHistory() {
        return await this.request({ endpoint: `history/clear`, method: `POST`});
    };

    async getQueue() {
        return await this.request({ endpoint: `queue`, method: `GET`});
    };

    async clearQueue() {
        return await this.request({ endpoint: `queue/clear`, method: `POST`});
    };

    async deletePlanFromQueue(data) {
        return await this.request({ endpoint: `queue/delete`, method: `POST`, data});
    };

    async switchLoopQueue(data) {
        return await this.request({ endpoint: `queue/loop`, method: `POST`, data});
    };

    async movePlanInQueue(data) {
        return await this.request({ endpoint: `queue/move`, method: `POST`, data});
    };

    async addToQueue(data) {
        return await this.request({ endpoint: `queue/add`, method: `POST`, data});
    };

    async editItem(data) {
        return await this.request({ endpoint: `queue/update`, method: `POST`, data});
    };

    async updateItemInQueue(data) {
        return await this.request({ endpoint: `queue/update`, method: `POST`, data});
    };

    async batchToQueue(data) {
        return await this.request({ endpoint: `queue/add/batch`, method: `POST`, data});
    };

    async executeItemInQueue(data) {
        return await this.request({ endpoint: `queue/execute`, method: `POST`, data});
    };

    async startQueue() {
        return await this.request({ endpoint: `queue/start`, method: `POST`});
    };

    async stopQueue() {
        return await this.request({ endpoint: `queue/stop`, method: `POST`});
    };

    async cancelQueue() {
        return await this.request({ endpoint: `queue/cancel`, method: `POST`});
    };

    async getActiveRuns() {
        return await this.request({ endpoint: `queue/runs/active`, method: `GET`});
    };

    async getStatus() {
        return await this.request({ endpoint: `status`, method: `GET`});
    };
}

const SERVERDATA = new ServerCalls(BACKEND_URL);

export default SERVERDATA;