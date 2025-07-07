import swal from "sweetalert";

export const swalConfirm = (title, text, icon) =>{
    return new Promise (resolve =>{
        swal({
            title:title,
            text:text,
            icon:icon,
            buttons:true,
            dangerMode:true,
            allowOutsideClick:false
        }).then((willContinue) =>{
            if (willContinue) {
                return resolve('success')
            }else{
                return resolve('cancelled')
            }
        })
    })
}

export const swalNotif = (title, text, icon, timer = null) =>{
    swal({
        title:title,
        text:text,
        icon:icon,
        button:false,
        allowOutsideClick:false,
        timer:timer
    })
}