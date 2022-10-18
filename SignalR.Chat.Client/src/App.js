
import { Box } from "@mui/material";
import LoginForm from './components/LoginForm';
import Chat from './components/Chat';
import { useState } from "react";
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';


function App() {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinRoom  = async (user, room) => { 
    try {
        const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:5001/chat")
        .configureLogging(LogLevel.Information)
        .build();

        connection.on("ReceiveMessage", (user, message) => {
         setMessages(messages => [...messages, {user, message}])
        })

        await connection.start();
        await connection.invoke("JoinRoom", {user, room});
        setConnection(connection);
    }
    catch (e) {
      console.error(e);
    }
  }

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    }
    catch (e) { console.error(e); }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '90vh',
      }}
    >
      {!connection 
      ?<LoginForm  joinRoom={joinRoom} />
      :<Chat sendMessage={sendMessage} messages={messages}/>
    }
    </Box>
  );
}

export default App;
