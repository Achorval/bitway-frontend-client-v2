
import request from "../auth/request";

export const addZeroes = (num) => {
    const dec = String(num).split('.')[1]
    const len = dec && dec.length > 2 ? dec.length : 2
    return Number(num).toFixed(len)
};

export function getAdminByToken(accessToken) {
    return request(`${process.env.REACT_APP_API_URL}/verifyToken`, { 
      method: 'POST', 
      body: {
        accessToken: accessToken
      }
    })
}

export function getUserBalance() {
  return request(`${process.env.REACT_APP_API_URL}/balance`, { 
    method: 'GET'
  })
}