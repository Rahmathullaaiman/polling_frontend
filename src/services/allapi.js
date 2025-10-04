import { base_Url } from "./baseurl"
import { commonAPI } from "./commonapi"

// API ENPOINTS

export const registerapi = async (user) => {
  return await commonAPI('POST', `${base_Url}/auth/register`, user, "")
}

export const loginapi = async (user) => {
  return await commonAPI('POST', `${base_Url}/auth/login`, user, "")
}

export const getPollsApi = async (reqHeader) => {
  return await commonAPI('GET', `${base_Url}/polls`, "", reqHeader)
}

export const getUsersApi = async (reqHeader) => {
  return await commonAPI('GET', `${base_Url}/auth/users`, "", reqHeader)
}

export const createPollApi = async (poll, reqHeader) => {
  return await commonAPI('POST', `${base_Url}/polls/create`, poll, reqHeader)
}

export const deletePollApi = async (pollId, reqHeader) => {
  return await commonAPI('DELETE', `${base_Url}/polls/${pollId}`, "", reqHeader)
}

export const updatePollApi = async (pollId, updatedPoll, reqHeader) => {
  return await commonAPI("PUT", `${base_Url}/polls/${pollId}`, updatedPoll, reqHeader);
};

export const votePollApi = async (pollId, option, reqHeader) => {
  return await commonAPI("POST", `${base_Url}/polls/${pollId}/vote`, { option }, reqHeader);
};

export const getPollResultsApi = async (reqHeader) => {
  return await commonAPI("GET", `${base_Url}/polls/results`, "", reqHeader)
}