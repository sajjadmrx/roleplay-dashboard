import { Request } from "express";

const parser = require('ua-parser-js');
const iplocate = require("node-iplocate");


class DetailRequest {


    getInfoRequest(req: Request) {
        return parser(req.headers['user-agent']);
    }


    async info_ip(req: Request) {
        try {
            return await iplocate(req.ip)
        } catch (error) {
            return {}
        }
    }

}

export default new DetailRequest();