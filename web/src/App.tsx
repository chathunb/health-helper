import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResultTable from "./component/results";
import { WebsocketContext } from "./contexts/WebsocketContext";
import UploadFiles from "./component/upload-file";



const theme = createTheme();

type MessagePayload = {
  id: number;
  rowId: number;
  error: string;
};

type FinalResultPayload = {
  totalRows: number;
  errorCount: number;
  info: string;
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.healthhelper.co/">
        healthhelper.co
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const App = () => {
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [finalResult, setFinalResult] = useState<FinalResultPayload>();
  const [value, setValue] = useState("");

  const socket = useContext(WebsocketContext);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected!");
    });
    socket.on("onMessage", (newMessage: MessagePayload) => {
      console.log("onMessage event received!");
      console.log(newMessage);
      // setMessages([]);
      setMessages((prev) => [...prev, newMessage]);
    });
    socket.on("onFinal", (newMessage: FinalResultPayload) => {
      console.log("onFinal event received!");
      console.log(newMessage);
      // setMessages([]);
      setFinalResult(newMessage);
    });
    return () => {
      console.log("Un registering Events...");
      socket.off("connect");
      socket.off("onMessage");
    };
  }, []);

  const onSubmit = () => {
    socket.emit("newMessage", value);
    setValue("");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" style={{ background: "#354D54" }}>
        <Toolbar>
          <img src={"/logowhite.png"} alt="Logo" />

          {/* <Typography variant="h6" color="inherit" noWrap>
          Album layout
        </Typography> */}
        </Toolbar>
      </AppBar>
      <main>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0} columns={16}>
            <Grid xs={5}>
              <UploadFiles />
              <Typography
                    component="h3"
                    variant="h4"
                    align="center"
                    color="text.static"
                    gutterBottom
                  >
                    Succeed :   
                   {finalResult !== undefined  ? finalResult.totalRows :   ''}
                  </Typography>

                  <Typography
                    component="h3"
                    variant="h4"
                    align="center"
                    color="text.static"
                    gutterBottom
                  >
                    Error :  
                   {finalResult !== undefined  ? finalResult.errorCount :   ''}
                  </Typography>

                  <Typography
                    component="h3"
                    variant="h4"
                    align="center"
                    color="text.static"
                    gutterBottom
                  >
                   {finalResult !== undefined  ? finalResult.info :   ''}
                  </Typography>

            </Grid>
            <Grid xs={11}>
              {/* Hero unit */}
              <Box
                sx={{
                  bgcolor: "background.paper",
                  pt: 8,
                  pb: 6,
                }}
              >
                <Container maxWidth="md">
                  <Typography
                    component="h3"
                    variant="h4"
                    align="center"
                    color="text.static"
                    gutterBottom
                  >
                    Import Result
                  </Typography>

                  <Typography align="center" color="text.secondary" paragraph>
                    This is your csv upload result below listed result has some
                    validation issues. Please check and re upload
                  </Typography>
                  <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                  >
                    {<ResultTable messages={messages} />}
                  </Stack>
                </Container>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 10 }} component="footer">
        <Typography align="center" gutterBottom>
          HEALTH HELPER DATA IMPORT SERVICE
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Delivering value to patients & providers
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
};

export default App;
