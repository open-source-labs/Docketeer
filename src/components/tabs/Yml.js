import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/actions";
import * as helper from "../helper/commands";
import ModalDisplay from "../display/ModalDisplay";
import NetworkChildrenList from "./NetworkChildrenList";

const Yml = () => {
	// cant read add eventlistner of null

	const [filepath, setFilepath] = useState("");
	const [fileList, setfileList] = useState("");
	const [modalValid, setModalValid] = useState(false);
	const [modalErrormessage, setModalErrormessage] = useState("")

	const dispatch = useDispatch();
	const composeymlFiles = (data) => dispatch(actions.composeymlFiles(data));
	const networkList = useSelector((state) => state.lists.networkList);

	useEffect(() => {
		let holder = document.getElementById("drag-file");
		let uploadHolder = document.getElementById("uploadFile");
		holder.ondragover = () => {
			holder.style = "background-color: #EDEDED";
			return false;
		};
		holder.ondragleave = () => {
			holder.style = "background-color: white";
			return false;
		};
		holder.ondragend = () => {
			return false;
		};
		holder.ondrop = (e) => {
			e.preventDefault();
			let fileList = e.dataTransfer.files;
			if (fileList.length > 1) return;
			if (fileList[0].type === "application/x-yaml") {
				let filePath = fileList[0].path.replace(/([\s])+/g, "\\ ");
				const filteredArr = filePath.split("/");
				filteredArr.pop();
				let filteredPath = filteredArr.join("/");
				setFilepath(filteredPath);
				setfileList(fileList[0].name);
			}
			return false;
		};
		uploadHolder.onchange = (e) => {
			e.preventDefault();
			let uploadYmlFile = e.target.files[0].path; //File Path + Yaml File Name
			const filteredUploadYmlArr = uploadYmlFile.split("/");
			let uploadYmlFileName = filteredUploadYmlArr[filteredUploadYmlArr.length -1];
			filteredUploadYmlArr.pop();
			let uploadYmlFilePath = filteredUploadYmlArr.join("/");

			setFilepath(uploadYmlFilePath);
			setfileList(uploadYmlFileName);
		}
	}, []);

  /**
   * networkList is array from the redux store
   * Only display relationship of containers when networkList's length is more than 1
   * networkList file format looks like in this format below
   * 
   * [{
   *  "a": [
   *        {"cid": "1", "name": "conatiner1"}, 
   *        {"cid": "2", "name": "container2"}
   *      ]
   * }, 
   * {
   *  "b": [
   *        {"cid": "3", "name": "container3"}, 
   *        {"cid": "4", "name": "container4"}
   *       ]
   * }]
   */
	const NetworkDisplay = () => {
		if (networkList.length) {
			let newArray = [];

			//First iteration of network List
			for (let i = 0; i < networkList.length; i++) {
				let keys = Object.keys(networkList[i]); // save keys in this format ["parentName"]
				let parent = keys[0];
				newArray.push(
					<div className="yml-boxes" key={`yml-boxes${i}`}>
						<div className="yml-labels" key={`yml-labels${i}`}><p>Network: {parent}</p>
						</div>
						<NetworkChildrenList networkList={networkList[i]} parent={keys[0]} />
					</div>
				);
			}

			return <div>{newArray}</div>;
		} else {
			return <></>
		}

	};

	return (

		<div className="renderContainers">
			<div className="header">
				<span className="tabTitle">Docker Compose</span>
				<span></span>
			</div>
			<div className="drag-container">
				<div className="drag-container-box box-shadow" id="drag-file">
					Drag and drop your Docker Compose file here to run it.
          <p><i className="fas fa-file yml-icon"></i></p>
					<p className="fileList">{fileList}</p>
					<input className="upload-btn" id="uploadFile" type="file" accept=".yml">
					</input>
					<button
						id="btn"
						className="btn"
						onClick={() => {
							helper.connectContainers(filepath, composeymlFiles, setModalValid, setModalErrormessage)
							document.getElementById("drag-file").style = "background-color: white";
							setfileList("");
						}}
					>
						Docker Compose Up
     			 	</button>
				</div>

			</div>

			<ModalDisplay modalValid={modalValid} setModalValid={setModalValid} modalErrormessage modalErrormessage={modalErrormessage} />
			<div className="containers">
				<NetworkDisplay />
			</div>
		</div>
	);
};

export default Yml;