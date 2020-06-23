const axios = require('axios');

module.exports = class MatrixUtils {


    constructor(params) {
        this.identifier = params.identity;
        this.baseUrl = params.baseUrl;

        const lastChar = this.baseUrl[this.baseUrl.length - 1];
        if (lastChar === '/') {
            this.baseUrl = this.baseUrl.charAt(this.baseUrl.length - 1);
        }

        this.config = {
            headers: {
                identity: this.identifier
            }
        };
    }

    async signInUser(params) {
        try {
            let data = {
                userId: params.id,
                password: params.password
            };
            const {data: response} = await axios.post(`${this.baseUrl}/users/token`, data, this.config);
            return response;
        } catch (e) {
            throw e;
        }
    };

};
