require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

module.exports = {
    appConfig: {
        baseUrl: process.env.API_BASE_URL,
        apiAuth: process.env.API_AUTH_URL,
        authEmail: process.env.API_AUTH_EMAIL,
        authPasswd: process.env.API_AUTH_PASSWD
    },
    operabase: {
        host: process.env.OPERABASE_DB_HOST,
        db: process.env.OPERABASE_DB_NAME,
        user: process.env.OPERABASE_DB_USER,
        passwd: process.env.OPERABASE_DB_PASSWORD
    },
    fusion: {
        host: process.env.TRUELINKED_DB_HOST,
        db: process.env.TRUELINKED_DB_NAME,
        user: process.env.TRUELINKED_DB_USER,
        passwd: process.env.TRUELINKED_DB_PASSWORD
    },
    bi: {
        host: process.env.BI_SERVER_HOST,
        fusiondb: process.env.BI_SERVER_FUSION_DB,
        opdb: process.env.BI_SERVER_OP_DB,
        user: process.env.BI_SERVER_USER,
        passwd: process.env.BI_SERVER_PASSWORD
    }
}