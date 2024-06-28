const cloudName = import.meta.env.VITE_CLOUD_NAME_CLOUDINARY;
const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
// const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME_CLOUDINARY}/image/upload`;




const uploadImage = async (image) => {

    const formData = new FormData();   
    formData.append('file', image)
    formData.append('upload_preset', 'mern_product')


    const res = await fetch(url, {
        method: 'POST', 
        body: formData,
        mode: 'cors',
    })

  return res.json()
}

export default uploadImage



