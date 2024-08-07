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
    getProductCategory: {
        url: `${backendDomain}/api/get-category-product`,
        method: 'GET' 
    },
     categoryWiseProduct: {
        url: `${backendDomain}/api/category-product`,
        method: 'POST' 
    },
     productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: 'POST' 
    },
     addToCartProduct: {
        url: `${backendDomain}/api/addtocart`,
        method: 'POST' 
    },
     countAddToCartProduct: {
        url: `${backendDomain}/api/count-add-to-cart-product`,
        method: 'GET' 
    },
     addToCartProductView: {
        url: `${backendDomain}/api/view-cart`,
        method: 'GET' 
    },
     updateCartProduct: {
        url: `${backendDomain}/api/update-cart-product`,
        method: 'POST' 
    },
    deleteCartProduct: {
        url: `${backendDomain}/api/delete-cart-product`,
        method: 'POST' 
    },
    searchProduct: {
        url: `${backendDomain}/api/search`,
        method: 'GET' 
    },
 
    filterProduct: {
        url: `${backendDomain}/api/filter-product`,
        method: 'POST' 
    },
 

}

export default summaryApi;


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


// summaryApi.getProductCategory.url
// summaryApi.getProductCategory.method

// summaryApi.categoryWiseProduct.url
// summaryApi.categoryWiseProduct.method

// summaryApi.categoryWiseProduct.url
// summaryApi.categoryWiseProduct.method

// summaryApi.productDetails.url
// summaryApi.productDetails.method

// summaryApi.addToCartProduct.url
// summaryApi.addToCartProduct.method

// summaryApi.countAddToCartProduct.url
// summaryApi.countAddToCartProduct.method

// summaryApi.addToCartProductView.url
// summaryApi.addToCartProductView.method

// summaryApi.updateCartProduct.url
// summaryApi.updateCartProduct.method

// summaryApi.deleteCartProduct.url
// summaryApi.deleteCartProduct.method

// summaryApi.searchProduct.url
// summaryApi.searchProduct.method 

// summaryApi.filterProduct.url
// summaryApi.filterProduct.method






