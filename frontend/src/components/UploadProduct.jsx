import { IoIosCloseCircleOutline } from "react-icons/io";

const UploadProduct = ({onClose}) => {

    return (
        <div className="fixed bg-slate-200 bg-opacity-55 w-full h-full top-0 bottom-0 right-0 left-0 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%]">

            <div className="flex justify-between">
                <h2 className="font-bold text-lg">Upload Product</h2>
                <div className="w-fit ml-auto text-red-500 cursor-pointer hover:text-red-800 hover:scale-110 transition-all duration-75" onClick={onClose}>
                    <IoIosCloseCircleOutline size='25'/> 
                </div>
            </div>
            
            </div> 
        </div>
    )
}
export default UploadProduct  