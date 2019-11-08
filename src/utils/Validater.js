
const Validater = {
    isPhoneNumberValid(phoneNumber){
        if((/^1[3|4|5|7|8]\d{9}$/.test(phoneNumber))){
            return true
        } else {
            return false
        }
    },
    isVerificationCodeValid(verificationCode){
        if(verificationCode.match(/^\d*$/)){
            return true
        } else {
            return false
        }
    },
    isLoginPwdValid(loginPwd){
        /**
         * 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
         * 
         */
        if(loginPwd.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)){
            return true
        } else {
            return false
        }
    },
    isFormValid(phoneNumber, verificationCode, loginPwd){
        if(this.isPhoneNumberValid(phoneNumber) && this.isVerificationCodeValid(verificationCode) && this.isLoginPwdValid(loginPwd)){
            return true
        } else {
            return false
        }
    }
}


export default Validater