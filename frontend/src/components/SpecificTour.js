import React from 'react';

import ActionDone from 'material-ui/svg-icons/action/done';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';


const style = {
    padding: 20,
    margin: 10,
    marginRight: "auto",
    marginBottom: 20,
    overflow: 'hidden',
    position: "relative",
};

export default class SpecificTour extends React.Component {

    onSelect = () => {
        this.props.select();
    }

    render() {
        return (
            <Paper>
                <div style={style}>
                    <p><strong><i>Starts:  </i></strong>{this.props.startDate}</p>
                    <p><strong><i>Ends:  </i></strong>{this.props.endDate}</p>
                    {this.props.showButton ?
                        <FloatingActionButton
                            mini
                            secondary
                            onTouchTap={!this.props.booked ? this.onSelect : function() {}}
                            style={{ position: "absolute", right: 0, bottom: 0, margin: 20 }}
                        >
                        
                        {this.props.booked ? <ActionDone /> : <ContentAdd />}
                        </FloatingActionButton>
                        : ""
                    }
                </div>
            </Paper>
        );
    }
}

SpecificTour.PropsType = {
    endDate: React.PropTypes.object,
    showButton: React.PropTypes.bool,
    startDate: React.PropTypes.object,
}