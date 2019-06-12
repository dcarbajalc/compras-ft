export const validaMail =(string)=>{
    let a = string.split('');
    if (a.indexOf('@') >= 0 && 
    a.indexOf(
    '.',a.indexOf('@')
    ) >= 0) {return false}
    else {return true}
    };