import axios from 'axios';

const isProduction = process.env.NODE_ENV === "production"
const base_url = isProduction ? "url_de_heroku" : "http://localhost:4000/api";
let  TOKEN = localStorage.getItem("TOKEN");
let  USER = JSON.parse(localStorage.getItem("USER"))?JSON.parse(localStorage.getItem("USER")).num: NaN;



var headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    'TOKEN': TOKEN,
    'USER':USER
};

export const obtieneUsuario = (num) => {
    return axios.get(`${base_url}/public/usuarios?num=${num}`)
    .then(res => 
        res.data 
    )
    .catch(error => {
    
        throw error.response.data;
        
    })
};

export const registerUser = (usr) => {
    return axios.post(`${base_url}/register`, usr)
    .then(res => res.data)
    .catch(error => {
        throw error.response.data
    })
};

export const loginMail =(usr) => {
    return axios.post(`${base_url}/login/mail`, usr)
    .then(res => res.data)
    .catch(error =>{
        throw error.response.data
    })
};

export const loginNum =(usr) => {
    return axios.post(`${base_url}/login/num`, usr)
    .then(res => res.data)
    .catch(error =>{
        throw error.response.data
    })
};

export const obtieneMenus =(token) => {
    
    return axios.get(`${base_url}/menu/menusxusr`,{headers:
    {
        'Content-Type': 'application/x-www-form-urlencoded',
        'TOKEN': token,
        'USER':JSON.parse(localStorage.getItem("USER"))?JSON.parse(localStorage.getItem("USER")).num:2
    }})
    .then(res => res.data)
    .catch(error =>{
        throw error.response.data
    })
 };


 export const obtieneRoles =() =>{
     return axios.get(`${base_url}/roles`, {headers: headers})
     .then (res => res.data)
     .catch(error=>{
         throw error.response.data
     }) 
 };

 export const updateRol = (datos) =>{     
   return  axios.patch (`${base_url}/roles/edit`,`_id=${datos._id}&nom=${datos.nom}`,{headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        'TOKEN': TOKEN,
        'USER':USER
    }})
    
     .then (res => res.data)
     .catch (error=> {throw error.response.data})
 };

 export const deleteRol = (id) =>{
     return axios.delete (`${base_url}/roles/remove/${id}`,  
     {headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        'TOKEN': TOKEN,
        'USER':USER
    }}
     )
     .then (res => res.data)
     .catch (error=> {throw error.response.data})
 };

 export const createRol = nombre =>{
     return axios.post(`${base_url}/roles/create`, `nom=${nombre.nom}`,  {headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        'TOKEN': TOKEN,
        'USER':USER
    }})
    .then (res => res.data)
    .catch (error=> {throw error.response.data})
 }

export const getMenuRol = (perfil) =>{
    return axios.get(`${base_url}/menuxrol`,
   // `perfil=${perfil.perfil}`, 
    
    {headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        'TOKEN': TOKEN,
        'USER':USER,
        'PERFIL':perfil.perfil
    }}
    )
    .then (res => res.data)
    .catch (error=> {throw error.response.data})  
};

export const escribeMenuRol = (informacion)=>{
    /*
    return axios.post(`${base_url}/menuxrol/edit`,
    informacion.datos,
    {headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        'TOKEN': TOKEN,
        'USER':USER,
        'PERFIL':informacion.perfil
    }}
)
*/
return axios({
    method: 'post',
    url: `${base_url}/menuxrol/edit`,
    headers: {
  //      "Content-Type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        'TOKEN': TOKEN,
        'USER':USER,
        'PERFIL':informacion.perfil
    }, 
    data: 
      [...informacion.datos]
  })
.then (res => res.data)
.catch (error=> {throw error.response.data})  
}