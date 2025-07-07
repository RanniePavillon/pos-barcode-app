export const validateEmail = (e) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(e).toLowerCase());
}

export const validateMobile = (e) => {
    if(isNaN(e)){
        return false
    }
    
    if(e.length !== 11){
        return false
    }

    return true
}

export const validateAccount = (e) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(e).toLowerCase())) {
        return 'email'
    } else {
        if(isNaN(e)){
            return 'username'
        }
        
        if(e.length === 10){
            if (e[0]==='9') {
                return 'mobile_num'
            } else {
                return 'username'
            }
        } else if (e.length === 11) {
            if (`${e[0]}${e[1]}`==='09') {
                return 'mobile_num'
            } else {
                return 'username'
            }
        } else {
            return 'username'
        }
    
    }
}

export const validatePassword = (e) => {
    let lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let numbers = /[0-9]/g;
    let specialChar = /^[A-Za-z0-9 ]+$/;
    let countWValidator = 1;
    let countSValidator = 5;

    if(e.length >= 6) {
        countWValidator -=1
    }

    if((e).match(lowerCaseLetters)) {
        countSValidator -=1
    }
    
    if((e).match(upperCaseLetters)) {
        countSValidator -=1
    }

    if((e).match(numbers)) {
        countSValidator -=1
    }

    if(e.length >= 8) {
        countSValidator -=1
    }

    if(!specialChar.test(e)) {
        countSValidator -=1
    }

    return {
        wvalidator: countWValidator,
        svalidator: countSValidator,
    }
}

export const ValidateInt = (e) => {
    if (e.key !== 'Backspace' && e.key !== 'Tab') {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    }
}