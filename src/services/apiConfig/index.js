const apiConfig = {
    HOST: {
        LOCAL_HOST: 'http://127.0.0.1:3001',
        DEV: 'http://10.0.112.1:3050/',
        DEBUG: 'http://10.0.112.2:3050/',
        RELEASE: 'https://repeater.tjinsuo.com/'
    },
    URI: {
        LOCAL: {
            REMAIN_TICKETS: 'getRemainTicketApi',
            RETRIEVE_VERIFICATION_CODE: 'retrieveVerificationCode',
            SUBMIT_FORM: 'submitForm'
        }
    }
}

export default apiConfig;