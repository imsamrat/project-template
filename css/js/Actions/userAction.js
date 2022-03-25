// Store user data
export const userData = (userObj) => {
    return {
       type: "userData",
       payload: userObj
     }
 }

// Clear user data 
 export const clearUserData = (userObj) => {
  return {
     type: "clearUserData",
     payload: userObj
   }
}

 