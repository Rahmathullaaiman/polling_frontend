import { base_Url } from "./baseurl"
import { commonAPI } from "./commonapi"


//register
export const registerapi = async(user)=>{
    return await commonAPI('POST',`${base_Url}/user/register`,user,"")
}

//register admin
export const registeradminapi = async(admin)=>{
    return await commonAPI('POST',`${base_Url}/admin/register`,admin,"")
}

//login
export const loginapi = async(user)=>{
    return await commonAPI('POST',`${base_Url}/user/login`,user,"")
}

//loginvadmin
export const adminlogin = async(admin)=>{
    return await commonAPI('POST',`${base_Url}/admin/login`,admin,"")
}


//add property
export const Addproperties = async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${base_Url}/property/add`,reqBody,reqHeader)
}

//add to sellproperties from request colection


//add user property
export const adduserproperties = async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${base_Url}/newuserproperty/new`,reqBody,reqHeader)
}


//allhomeproperty
export const Allhomeproperty = async(searchkey)=>{

    //parameter
    return await commonAPI('GET',`${base_Url}/property/home?search=${searchkey}`)
}


//get all request
export const Allrequests = async()=>{
    return await commonAPI('GET',`${base_Url}/allrequest/user`)
}

//GET RENT REQUEST
export const rentrequests = async()=>{
    return await commonAPI('GET',`${base_Url}/allrentrequest/rentuser`)
}






//getuserproperty
export const Usersproperty = async(reqHeader)=>{
    return await commonAPI('GET',`${base_Url}/property/user`,"",reqHeader)
}



//add rent properties
export const Addrentproperties = async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${base_Url}/rentproperty/add`,reqBody,reqHeader)
}

//adduser rent property
export const Adduserrentproperties = async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${base_Url}/newrentproperty/newrent`,reqBody,reqHeader)
}

//get rent property
export const Getrentpropertys = async(searchkey)=>{
    return await commonAPI('GET',`${base_Url}/rentproperty/home?search=${searchkey}`)
}


//getrentusersproperty
export const Rentusersproperty = async(reqHeader)=>{
    return await commonAPI('GET',`${base_Url}/rentproperty/user`,"",reqHeader)
}

//edit user property
export const Editusersproperty = async(projectId,reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${base_Url}/editproperty/user/${projectId}`,reqBody,reqHeader)
}

//edit rent property
export const Editrentsproperty = async(projectId,reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${base_Url}/editrentproperty/user/${projectId}`,reqBody,reqHeader)
}

//deelete property
export const deleteproperty = async(projectId,reqHeader)=>{
    return await commonAPI('DELETE',`${base_Url}/deleteproperty/user/${projectId}`,{},reqHeader)
}

//delete  rent property
export const deleterentproperty = async(projectId,reqHeader)=>{
    return await commonAPI('DELETE',`${base_Url}/deleterentproperty/user/${projectId}`,{},reqHeader)
}


//add to history
export const buyproperty = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${base_Url}/property/purchase`,reqBody,reqHeader );
};

//get history
export const Gethistory = async(reqHeader)=>{
    return await commonAPI('GET',`${base_Url}/history/user`,"",reqHeader)
}

//delete history
export const deletehistory = async(projectId,reqHeader)=>{
    return await commonAPI('DELETE',`${base_Url}/deletehistory/user/${projectId}`,{},reqHeader)
}
//add to rent history
export const buyrentproperty = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${base_Url}/rentproperty/purchase`,reqBody,reqHeader );
  };
  
//get from rent history
export const Getrenthistory = async(reqHeader)=>{
    return await commonAPI('GET',`${base_Url}/renthistory/user`,"",reqHeader)
}

//delete from rent history
export const deleterenthistory = async(projectId,reqHeader)=>{
    return await commonAPI('DELETE',`${base_Url}/deleterenthistory/user/${projectId}`,{},reqHeader)
}


//get all users
export const Allusers = async()=>{
    return await commonAPI('GET',`${base_Url}/user/details`)
}


export const Getreqs = async(reqHeader)=>{
    return await commonAPI('GET',`${base_Url}/getAllRequestsByworker`,"",reqHeader)
}

export const Getuse = async(reqHeader)=>{
    return await commonAPI('GET',`${base_Url}/getBookingsByUserId`,"",reqHeader)
}
//add to new users property adding when admin approves
export const addtosellpropertiesnewuser = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${base_Url}/addtosell/add`,reqBody,reqHeader );
  };
  

  export const addtorentsnewrent = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${base_Url}/addtorents/renting`,reqBody,reqHeader );
  };
  

//delete user
export const deleteuser = async(projectId,reqHeader)=>{
    return await commonAPI('DELETE',`${base_Url}/delete/user/${projectId}`,{},reqHeader)
}

//reject request
export const rejectrequest = async(projectId,reqHeader)=>{
    return await commonAPI('DELETE',`${base_Url}/reject/request/${projectId}`,{},reqHeader)
}

//reject rent request
export const rejectrentrequest = async(projectId,reqHeader)=>{
    return await commonAPI('DELETE',`${base_Url}/rentreject/rentrequest/${projectId}`,{},reqHeader)
}


export const sendChatMessage = async (reqBody,reqHeader) => {
    return await commonAPI('POST', `${base_Url}/user/sendchat`,reqBody,reqHeader);
}


export const getMessages = async (userId1,userId2,reqHeader) => {
    return await commonAPI('GET',`${base_Url}/getMessages/${userId1}/${userId2}`,"", reqHeader);
}
