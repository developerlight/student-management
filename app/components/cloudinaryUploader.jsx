// 'use client';

// import { useState } from "react";
// import { cloudinaryEnv } from "../env";
// const { CldUploadButton, CldUploadWidget } = require("next-cloudinary");

// const CloudinaryUploader = () => {
//     const [resource, setResource] = useState(undefined);
//     const handleUpload = async (req, { widget }) => {
//         console.log('upload result:', req);

//         console.log('image url:', req.info.secure_url);
//         console.log('publicId:', req.info.public_id);
//         try {
//             const response = req;
//             console.log(response);
//         } catch (error) {
//             console.error("Cloudinary Signature Error:", error);
//         }
//     }

//     return (
//         <div className="">
//             {/* <CldUploadButton
//                 options={{
//                     multiple: false,
//                     sources: ['local', 'url', 'camera', 'google_photos'],
//                 }}
//                 uploadPreset={cloudinaryEnv.PRESET_NAME}
//                 onUploadComplete={handleUpload}
//                 className="bg-green-400 py-2 px-3 rounded border mt-4 text-white
//                             hover:bg-green-500 transition ease-in-out delay-200"
//             >
//                 <span>Upload Image</span>
//             </CldUploadButton> */}

//             <CldUploadWidget
//                 options={{
//                     multiple: false,
//                     sources: ['local', 'url', 'camera', 'google_photos'],
//                 }}
//                 uploadPreset={cloudinaryEnv.PRESET_NAME}
//                 onSuccess={handleUpload}
//                 onQueuesEnd={(result, { widget }) => {
//                     widget.close();
//                 }}
//             >
//                 {({ open }) => {
//                     function handleOnClick() {
//                         setResource(undefined);
//                         open();
//                     }
//                     return (
//                         <button onClick={handleOnClick}>
//                             Upload an Image
//                         </button>
//                     );
//                 }}
//             </CldUploadWidget>
//         </div>
//     );
// }

// export default CloudinaryUploader;

'use client';

import { useState } from "react";
import { cloudinaryEnv } from "../env";
const { CldUploadWidget } = require("next-cloudinary");

const CloudinaryUploader = ({ onUploadComplete }) => {
    const [resource, setResource] = useState(undefined);
    // const handleUpload = async (req, { widget }) => {
    //     console.log('upload result:', req);

    //     console.log('image url:', req.info.secure_url);
    //     console.log('publicId:', req.info.public_id);
    //     try {
    //         const response = req;
    //         console.log(response);
    //     } catch (error) {
    //         console.error("Cloudinary Signature Error:", error);
    //     }
    // }
    const handleUploadComplete = async ( result, {widget}) => {
        // console.log('upload result:', result);
        // const imageUrl = result.info.secure_url;
        // const publicId = result.info.public_id;
        // const signature = result.info.signature;
        onUploadComplete(result);
    }

    return (
        <div>
            <CldUploadWidget
                options={{
                    multiple: false,
                    sources: ['local', 'url', 'camera', 'google_photos'],
                }}
                uploadPreset={cloudinaryEnv.PRESET_NAME}
                onSuccess={handleUploadComplete}
                onQueuesEnd={(result, { widget }) => {
                    widget.close();
                }}
            >
                {({ open }) => {
                    function handleOnClick() {
                        setResource(undefined);
                        open();
                    }
                    return (
                        <button onClick={handleOnClick}>
                            Upload an Image
                        </button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
}

export default CloudinaryUploader;

