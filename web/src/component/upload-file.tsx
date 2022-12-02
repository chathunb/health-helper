import React, { useState, useEffect, useContext } from "react";
import UploadService from "../services/upload-files.service";
import { Box, Typography, Button, ListItem } from "@mui/material";

import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
//import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";



const UploadFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);


  

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setFileInfos(response.data);
    });
  }, []);



  const selectFile: any = (event: any) => {
    setSelectedFiles(event.target.files);
  };

  const upload = () => {
    let currentFile =
      selectedFiles !== undefined ? selectedFiles[0] : undefined;
    // console.log(currentFile.name);
    setProgress(0);
    setCurrentFile(currentFile);

    UploadService.upload(currentFile, (event: any) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        // return UploadService.getFiles();
      })
      .then((files:   any) => {
        setFileInfos(files.data);
      })
      .catch(() => {
        setProgress(0);
        setMessage("Could not upload the file!");
        setCurrentFile(undefined);
      });

    setSelectedFiles(undefined);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 4,
          pb: 6,
        }}
      >
        <div>
          {currentFile && (
            <div className="progress">
              {/* <div
          className="progress-bar progress-bar-info progress-bar-striped"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: progress + "%" }}
        >
          {progress}%
        </div> */}
              <Box className="mb25" display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
                <Box minWidth={35}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >{`${progress}%`}</Typography>
                </Box>
              </Box>
            </div>
          )}

          {/* <label className="btn btn-default">
            <input id="btn-upload" name="btn-upload" type="file"  style={{ display: "none" }}  onChange={selectFile} />
          </label> */}
          <Typography variant="h6" className="list-header">
            Upload Your CSV file here
          </Typography>
          <label htmlFor="btn-upload">
            <input
              id="btn-upload"
              name="btn-upload"
              style={{ display: "none" }}
              type="file"
              onChange={selectFile}
            />
            <Button className="btn-choose" variant="outlined" component="span">
              Choose Files
            </Button>
          </label>

          {/* <button
            className="btn btn-success"
            disabled={!selectedFiles}
            onClick={upload}
          >
            Upload
          </button> */}

          <Button
            style={{ margin: 10 }}
            color="primary"
            variant="contained"
            component="span"
            disabled={!selectedFiles}
            onClick={upload}
          >
            Upload
          </Button>
          <div className="file-name">
            {currentFile ? currentFile["name"] : null}
          </div>

          <div className="alert alert-light" role="alert">
            {message}
          </div>

          <div className="card">
            {/* <div className="card-header">List of Files</div> */}
            <ul className="list-group list-group-flush">
              {fileInfos &&
                fileInfos.map((file: any, index) => (
                  <li className="list-group-item" key={index}>
                    <a href={file.url}>{file.name}</a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default UploadFiles;
