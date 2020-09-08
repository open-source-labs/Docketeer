import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/actions";
import * as helper from "../helper/commands"
const Images = (props) => {

	const dispatch = useDispatch();

	const addRunningContainers = (data) => dispatch(actions.addRunningContainers(data));
	const removeImage = (id) => dispatch(actions.removeImage(id));

	const imagesList = useSelector((state) => state.lists.imagesList);
	const runningList = useSelector((state) => state.lists.runningList);
	// const addAdditionalImageContainer = (id) => dispatch(actions.runImages(id))
	const renderImagesList = imagesList.map(ele => {
		//      let objArray = ['resp', 'tag', 'imgid', 'created', 'size'] 

		return (
			<div>
				<ul>Name : {ele['reps']}</ul>
				<ul>Tag : {ele['tag']}</ul>
				<ul>Image ID : {ele['imgid']}</ul>
				<ul>Size : {ele['size']}</ul>
				<button onClick={() => props.runIm(ele['imgid'], runningList, helper.addRunning, addRunningContainers)}>Add Container based on Image</button>
				<button onClick={()=>removeImageHandler(ele['imgid'], removeImage)}>Remove Image</button>
			</div>
		)
	});

	const hello = () => {
		console.log('hello')
	}

	const removeImageHandler = (id, callback) => {
		//props.removeIm(id, callback)
		let p = new Promise((resolve) => {
			let value = props.removeIm(id,callback)
			resolve(value);
		})
		p.then(res => res)
		.then(result => {
			console.log('result', result)
		});

	
		
		//console.log(valid);

	}

	return (
		<div>
			<div className="renderContainers">
				{renderImagesList}
			</div>
		</div>
	)
}

export default Images;