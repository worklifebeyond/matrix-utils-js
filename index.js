const axios = require('axios');

module.exports = class MatrixUtils {


    constructor(params) {
        this.identifier = params.identity;
        this.baseUrl = params.baseUrl;
        this.debug = params.debug || false;

        if(this.debug){
            console.log('[Matrix Utils] initiate with parameters: ', params);
        }

        const lastChar = this.baseUrl[this.baseUrl.length - 1];
        if (lastChar === '/') {
            this.baseUrl = this.baseUrl.slice(0, -1);
            if(this.debug) console.log('[Matrix Utils] base url contains slash, remove it: ', this.baseUrl);
        }

        this.config = {
            headers: {
                identity: this.identifier
            }
        };
    }

    async signInUser(params) {
        if(this.debug) console.log('[Matrix Utils] sign in user: ', params.id);
        try {
            let data = {
                userId: params.id,
                password: params.password,
                email: params.email,
            };
            const {data: response} = await axios.post(`${this.baseUrl}/users/token`, data, this.config);
            if(this.debug) console.log('[Matrix Utils] sign in success: ', params.id);
            return response;
        } catch (e) {
            if(this.debug) console.log('[Matrix Utils] sign in failed: ', e);
            throw e;
        }
    };


    async logForgotPass(params) {
        if(this.debug) console.log('[Matrix Utils] user: ', params.id);
        try {
            let data = {
                userId: params.id,
            };
            const {data: response} = await axios.post(`${this.baseUrl}/users/forgot-pass`, data, this.config);
            if(this.debug) console.log('[Matrix Utils] forgot pass log success: ', params.id);
            return response;
        } catch (e) {
            if(this.debug) console.log('[Matrix Utils] forgot pass log failed: ', e);
            throw e;
        }
    };

};
