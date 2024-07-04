import { useEffect, useState } from 'react'
import image1 from '../banner/img1.webp'
import image2 from '../banner/img2.webp'
import image3 from '../banner/img3.jpg'
import image4 from '../banner/img4.jpg'
import image5 from '../banner/img5.webp'
import image1Mobile  from '../banner/img1_mobile.jpg'
import image2Mobile  from '../banner/img2_mobile.webp'
import image3Mobile  from '../banner/img3_mobile.jpg'
import image4Mobile  from '../banner/img4_mobile.jpg'
import image5Mobile  from '../banner/img5_mobile.png'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";


const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]


    const nextImage = () => {
        if(desktopImages.length -1 > currentImage ) {
            setCurrentImage(prev => prev + 1)
        }
    }
    const previousImage = () => {
        if(currentImage !=0){
            setCurrentImage(prev => prev - 1)
        }
    }

    useEffect(()=> {
        const autoSlide = setInterval(()=> {
            if(desktopImages.length -1 > currentImage ) {
                nextImage();
            }else{
                setCurrentImage(0)
            }
        }, 5000)
        return () => clearInterval(autoSlide)
    }, [currentImage])



  return (
    <div className='container mx-auto px-4 rounded'>
        <div className="bg-slate-200 h-56 w-full md:h-72 relative">
                <div className='absolute z-10 w-full h-full flex items-center'>
                    <div className="md:flex justify-between items-center w-full text-2xl px-2 hidden">
                        <button onClick={previousImage} className='bg-white rounded-full p-1'><FaAngleLeft /></button>
                        <button onClick={nextImage} className='bg-white rounded-full p-1'><FaAngleRight /></button>
                    </div>
                </div>

                  {/* desktop & tablet version */}
                  
                <div className="hidden md:flex h-full w-full overflow-hidden">
                    {
                        desktopImages.map((image, index) => {
                            return (
                                <div className="w-full h-full min-w-full min-h-full transition-all" key={image} style={{ transform: `translateX(-${currentImage * 100}%)`}}>
                                    <img src={image} alt="" className='h-full w-full'/>
                                </div>
                            )
                        })
                    }
                </div>
                  {/* mobile version */}

                <div className="flex h-full w-full overflow-hidden md:hidden">
                    {
                        mobileImages.map((image, index) => {
                            return (
                                <div className="w-full h-full min-w-full min-h-full transition-all" key={image} style={{ transform: `translateX(-${currentImage * 100}%)`}}>
                                    <img src={image} alt="" className='h-full w-full object-cover'/>
                                </div>
                            )
                        })
                    }
                </div>
        </div>
    </div>
  )
}

export default BannerProduct 