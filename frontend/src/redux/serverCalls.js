import axios from "axios"
class ServerCalls {
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

    async pausePlans(data) {
        console.log("input pause: ", data);
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
    /*
    async () {
        return await this.request({ endpoint: ``, method: ``});
    };*/

    async getQueue() {
        return await this.request({ endpoint: `queue`, method: `GET`});
    };

    async clearQueue() {
        return await this.request({ endpoint: `queue/clear`, method: `POST`});
    };

    async deletePlanFromQueue(data) {
        console.log("del q: ", data);
        return await this.request({ endpoint: `queue/delete`, method: `POST`, data});
    };

    async movePlanInQueue(data) {
        console.log("move q: ", data);
        return await this.request({ endpoint: `queue/move`, method: `POST`, data});
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

    async getStatus() {
        return await this.request({ endpoint: `status`, method: `GET`});
    };
}

const SERVERDATA = new ServerCalls("http://localhost:3001");

export default SERVERDATA;