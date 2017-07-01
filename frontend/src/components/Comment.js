import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import ArrowUp from 'material-ui/svg-icons/action/thumb-up';
import ArrowDown from 'material-ui/svg-icons/action/thumb-down';
import Close from 'material-ui/svg-icons/navigation/close';


import IconButton from 'material-ui/IconButton';

import * as actionCreators from '../actions/auth';

export default class Comment extends Component {

    render() {
        const styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                padding: 10,
                margin: 10,
                width: "100%",
            },
            p: {
                margin: "10px",
            },
        };

        return (
            <Paper style={styles.wrapper}>
                <Chip
                    style={styles.chip}
                >
                    <Avatar src="https://scontent.fbeg1-1.fna.fbcdn.net/v/t1.0-9/11173388_1045240915489523_2355894768946753656_n.jpg?oh=d3fb2c90e13a135986f2cc7b1d9c39c3&oe=59CDD98F" />
                    <a href="#">Ime usera</a>
                </Chip>
                {/*<p>{this.props.data.text}</p>*/}
                <p style={styles.p}>Neki lorem ipsum dolor sit amet...</p>
                <IconButton tooltip="Like">
                    <ArrowUp />
                </IconButton>
                <IconButton tooltip="Disike">
                    <ArrowDown />
                </IconButton>
                <IconButton tooltip="Delete">
                    <Close />
                </IconButton>
            </Paper>
        );
    }
}
