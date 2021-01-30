const axios = require('axios');
const { appConfig } = require('../helpers/config')

var getQuery = async function (url) {
    return await axios.get( `${appConfig.baseUrl}/${url}`);
}

class FusionRest {
    constructor(tc, type='tc') {
        this.tc = tc
        this.type = type
        this.authToken = null;
    }

    async query() {
        if (this.type == 'suite') {

        } else {
            if (this.tc.is_auth_needed) {
                await this.getAuthToken()
            }
            if (this.tc.type == 'GET') {
                return await this.getQuery()
            }
        }

    }

    async getAuthToken() {
        var authToken = await axios.post(`${appConfig.baseUrl}${appConfig.apiAuth}`, {
            "type": "user",
            "user": {
                "password": `${appConfig.authPasswd}`,
                "email": `${appConfig.authEmail}`
            }
        })
        if (authToken && authToken.status == 201) {
            this.authToken = authToken.data.token
        }
    }

    async getQuery() {
        try {
            if (this.tc.is_auth_needed) {
                return await axios.get( `${appConfig.baseUrl}/${this.tc.target}`, {
                    headers: {
                        'Authorization': `Bearer ${this.authToken}`
                    }
                });
            }
            return await axios.get( `${appConfig.baseUrl}/${this.tc.target}`);
        } catch (err) {
            console.log(err)
            return err
        }
    }
    
    async postQuery(url) {
        return await axios.get( `${appConfig.baseUrl}/${url}`);
    }
    async putQuery(url) {
        return await axios.get( `${appConfig.baseUrl}/${url}`);
    }
    async deleteQuery(url) {
        return await axios.get( `${appConfig.baseUrl}/${url}`);
    }
}

module.exports = FusionRest;