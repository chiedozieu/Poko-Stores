const backendDomain = 'http://localhost:8080'

const summaryApi = {
    signUP : {
        url: `${backendDomain}/api/signup`,
        method: 'POST' 
    },
    signIN : {
        url: `${backendDomain}/api/signin`,
        method: 'POST' 
    },
    currentUser: {
        url: `${backendDomain}/api/user-details`,
        method: 'GET' 
    },
    userLogOUT: {
        url: `${backendDomain}/api/logout`,
        method: 'GET' 
    }

}
// summaryApi.signUP.url
// summaryApi.signUP.method

// summaryApi.currentUser.url
// summaryApi.currentUser.method

// summaryApi.userLogOUT.url
// summaryApi.userLogOUT.method






export default summaryApi;
