const backendDomain = 'http://localhost:8080'

const summaryApi = {
    signUP : {
        url: `${backendDomain}/api/signup`,
        method: 'POST' 
    }
}

export default summaryApi;

// summaryApi.signUP.url
// summaryApi.signUP.method