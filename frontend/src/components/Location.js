import React from 'react';

import ActionDone from 'material-ui/svg-icons/action/done';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';

import * as actionCreators from '../actions/auth';


const style = {
    padding: 20,
    margin: 10,
    height: 150,
    width: 300,
    marginRight: "auto",
    marginBottom: 20,
    overflow: 'hidden',
    position: "relative",
};

export default class Location extends React.Component {

    constructor() {
        super();
        this.state = {
            selected: false
        }
    }

    onDeselect = () => {
        this.setState({
            selected: false
        });

        this.props.deselect(this.props.data);
    }

    onSelect = () => {
        this.setState({
            selected: true
        });

        this.props.select(this.props.data);
    }

    render() {
        return (
            <Paper style={style}>
                {/*id: <h2>{this.props.data.id}</h2>*/}
                <a href={"location/" + this.props.data.id}><h3>{this.props.data.name}</h3></a>
                <p>{this.props.data.description}</p>
                {this.props.showButton ?
                    <FloatingActionButton
                        mini
                        secondary={!this.state.selected}
                        onTouchTap={this.state.selected ? this.onDeselect : this.onSelect}
                        style={{margin: 10, right: 0, position: "absolute", bottom: 0}}
                    >

                        {this.state.selected ? <ActionDone /> :
                         this.props.actionType === 'add' ? <ContentAdd /> :
                         this.props.actionType === 'remove' ? <ContentRemove /> : ""
                        }
                    </FloatingActionButton>
                : "" }
            </Paper>
        );
    }
}

Location.PropTypes = {
    actionType: React.PropTypes.string,
    data: React.PropTypes.object,
    deselect: React.PropTypes.func,
    select: React.PropTypes.func,
}
