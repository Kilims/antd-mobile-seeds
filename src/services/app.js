import apiConfig from './apiConfig'
import axios from 'axios'

const api = {
    getRemainTickets() {
        return axios.get(`${apiConfig.HOST.LOCAL_HOST}/${apiConfig.URI.LOCAL.REMAIN_TICKETS}`)
    },
    /**
     * 發送驗證碼 example
     * 
     */
    retrieveVerificationCode(phoneNumber) {
        return axios.get(`${apiConfig.HOST.LOCAL_HOST}/${apiConfig.URI.LOCAL.RETRIEVE_VERIFICATION_CODE}`)
        // Case 1:
        // return axios.get(`${apiConfig.HOST.LOCAL_HOST}/${apiConfig.URI.LOCAL.RETRIEVE_VERIFICATION_CODE}?phoneNumber=${phoneNumber}`)
        // Caase 2:
        // return axios.post(`${apiConfig.HOST.LOCAL_HOST}/${apiConfig.URI.LOCAL.RETRIEVE_VERIFICATION_CODE}`, {
        //     phoneNumber: phoneNumber
        // })
        // Case 3:
        // return axios.get(`${apiConfig.HOST.LOCAL_HOST}/${apiConfig.URI.LOCAL.RETRIEVE_VERIFICATION_CODE}`, {
        //     params: {
        //         phoneNumber: phoneNumber
        //     }
        // })
    },
    submitFormData(phoneNumber, verificationCode, loginPwd){
        return axios.post(`${apiConfig.HOST.LOCAL_HOST}/${apiConfig.URI.LOCAL.SUBMIT_FORM}`, {
            phoneNumber: phoneNumber,
            verificationCode: verificationCode,
            loginPwd: loginPwd
        })
    }
}

export default api;