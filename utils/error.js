const getError = (err) => err.response  && err.response.data && err.response.data.message ? err.response.data.message : err.response  && err.response.data ? err.response.data : err.message
export {getError};