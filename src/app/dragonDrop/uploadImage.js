import React, { useState } from 'react'

const UploadImages = () => {
    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");
    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "itrcloud")
        data.append("cloud_name","duefnpovc")
        fetch("https://api.cloudinary.com/v1_1/duefnpovc/image/upload",{
            method:"post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setUrl(data.url);
                document.getElementById("previu").src = "";
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div>
                <input id="imageFile" type="file" onChange= {(e)=> setImage(e.target.files[0])}></input>
                <button onClick={uploadImage}>Preview image</button>
            </div>
            <div>
                <img style={{maxWidth: "50%" , maxHeight: "50%" }} id="imageCollection" src={url}/>
            </div>
        </div>
    )
}
export default UploadImages;