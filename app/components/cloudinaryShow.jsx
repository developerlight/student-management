'use client';

import { CldImage } from "next-cloudinary";

const CloudinaryShowImage = ({ id }) => {
    return ( 
        <div className="">
            <CldImage
                src={id}
                alt="Image"
                width="300"
                height="300"
                style={{ width: "auto", height: "auto" }}
                priority= {true}
                className="rounded-lg shadow-lg"
            />
        </div>
     );
}
 
export default CloudinaryShowImage;