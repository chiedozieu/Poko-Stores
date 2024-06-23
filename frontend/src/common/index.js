const backendDomain = 'http://localhost:8080'

const summaryApi = {
    signUP : {
        url: `${backendDomain}/api/signup`,
        method: 'POST' 
    },
    signIN : {
        url: `${backendDomain}/api/signin`,
        method: 'POST' 
    }

}
// summaryApi.signUP.url
// summaryApi.signUP.method






export default summaryApi;
