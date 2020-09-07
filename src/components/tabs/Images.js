import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/actions";
import * as helper from "../helper/commands"
const Images = (props) => {

	const dispatch = useDispatch();

	const addRunningContainers = (data) => dispatch(actions.addRunningContainers(data));

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
			</div>
		)
	});

	return (
		<div>
			<div className="renderContainers">
				{renderImagesList}
			</div>
		</div>
	)
}

export default Images;