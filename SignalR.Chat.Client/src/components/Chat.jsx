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

const Chat = ({messages , sendMessage}) => {
  const classes = useStyles();
  const [message, setMessage] = useState('');

  return (
    <Container component="main" sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '80vh',
        width: '75%',
        mt: 10,
        backgroundColor: "gray"
      }}
        maxWidth="lg">
        <Grid container>
            <Grid item xs={12} >
                <Typography  variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemText primary="John Wick"></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                        <ListItemText secondary="online" align="right"></ListItemText>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}>
                    {messages.map((m, index) => 
                        <ListItem key={index}>
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary={m.message}></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="Chat Bot"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    )}
                </List>
                <Divider />
                <form onSubmit={e => {e.preventDefault(); sendMessage(message); setMessage(''); }}>
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth  onChange={e => setMessage(e.target.value)} value={message}/>
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