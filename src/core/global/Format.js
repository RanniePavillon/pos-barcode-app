export const ParsingAmount = (val) => {
    return (
        parseFloat(val).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    )
}

export const StartUpperCase = (string) => {
    return (
        string.charAt(0).toUpperCase() + string.slice(1)
    )
}

export const TxtNumber = (e, type) => {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
        return
    }
    return false;
}

export const TINNumber = (e, type) => {
    if (!/[0-9-]/.test(e.key)) {
        e.preventDefault();
        return
    }
    return false;
}

export const TxtLetter = (e, type) => {
    if (!/^[a-zA-Z]*$/g.test(e.key)) {
        e.preventDefault();
        return
    }
    return false;
}

export const TxtLetterSpace = (e, type) => {
    if (!/^[a-zA-Z0-9_ ]*$/g.test(e.key)) {
        e.preventDefault();
        return
    }
    return false;
}

export const TxtEmail = (email) => {
    const regEx = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0,9]{1,3}\.[0,9]{1,3}\])|(([a-zA-Z\0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regEx.test(email);

}