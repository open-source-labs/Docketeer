import React from 'react';
import { useSelector } from "react-redux";

const Images = () => {

    const imagesList = useSelector((state) => state.lists.imagesList);

    const renderImagesList = imagesList.map(ele => {
        //      let objArray = ['resp', 'tag', 'imgid', 'created', 'size'] 

        return (
            <div>
             <ul>Repository : {ele['reps']}</ul>
             <ul>Tag : {ele['tag']}</ul>
             <ul>Image ID : {ele['imgid']}</ul>
             <ul>Size : {ele['size']}</ul>

            </div>
        )
    });

    return (
        <div>
            I am in images
            <div>
                {renderImagesList}
            </div>
        </div>
    )
}

export default Images;