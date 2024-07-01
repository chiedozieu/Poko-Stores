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
    },
    allUsers: {
        url: `${backendDomain}/api/all-users`,
        method: 'GET' 
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: 'POST' 
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: 'POST' 
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: 'GET' 
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: 'POST' 
    },


}
// summaryApi.signUP.url
// summaryApi.signUP.method

// summaryApi.currentUser.url
// summaryApi.currentUser.method

// summaryApi.userLogOUT.url
// summaryApi.userLogOUT.method

// summaryApi.allUsers.url
// summaryApi.allUsers.method

// summaryApi.updateUser.url
// summaryApi.updateUser.method

// summaryApi.uploadProduct.url
// summaryApi.uploadProduct.method

// summaryApi.allProduct.url
// summaryApi.allProduct.method

// summaryApi.updateProduct.url
// summaryApi.updateProduct.method





export default summaryApi;
