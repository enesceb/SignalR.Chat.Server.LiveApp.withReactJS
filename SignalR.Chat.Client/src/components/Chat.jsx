import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@mui/icons-material/Send';
import Container from '@mui/material/Container';
import { useState } from "react";
import { Button } from '@mui/material';
import { useEffect, useRef } from 'react';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
});



const Chat = ({ messages, sendMessage, closeConnection, users }) => {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('')

    const messageRef = useRef();

    const searchHandle = (e) => {
        setSearchTerm(e.target.value);
        
    }

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({
                left: 0, top: scrollHeight - clientHeight,
                behavior: 'smooth'
            });
        }
    }, [messages])

    return (
        <Container component="main" sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '80vh',
            width: '85%',
            mt: 5,
            p: 4,
            backgroundColor: "lightgrey",
        }}
            maxWidth="lg">
            <Grid container spacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              
                <Grid item xs={12} align="right" >
                    <Button variant="contained" color="error" onClick={() => closeConnection()} >
                        <Typography variant="body1" className="header-message">Leave Room</Typography>
                    </Button>
                </Grid>
            </Grid>

            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem button key="Chat">
                            <ListItemText primary="Chat"></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <TextField onChange={searchHandle} id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    <List>
                        {users.map((user, index) =>
                            <ListItem button key={index}>
                                <ListItemText primary={`${user}`}>{user}</ListItemText>
                                <ListItemText secondary="online" align="right"></ListItemText>
                            </ListItem>
                        )}

                    </List>
                </Grid>
                <Grid item xs={9} >
                    <List className={classes.messageArea} ref={messageRef} >
                        {messages.map((m, index) =>
                            <ListItem key={index}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText align="right" primary={m.message}></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText align="right" secondary={m.user}></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        )}
                    </List>
                    <Divider />
                    <form onSubmit={e => { e.preventDefault(); sendMessage(message); setMessage(''); }}>
                        <Grid container style={{ padding: '20px' }}>
                            <Grid item xs={11}>
                                <TextField id="outlined-basic-email" label="Type Something" fullWidth onChange={e => setMessage(e.target.value)} value={message} />
                            </Grid>
                            <Grid xs={1} align="right">
                                <Button type="submit" color="primary" aria-label="add" disabled={!message} ><SendIcon /></Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Chat;