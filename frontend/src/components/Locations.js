import React from 'react';

import Location from './Location';


const style = {
    paddingTop: 40,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
    width: 1000,
    maxWidth: "100%",
};

export default class Locations extends React.Component {

    constructor() {
        super();
    
        this.state = {
            locations: [],
            selectedLocations: [],
        }
    }

    componentWillMount() {
        var locations = [];
        this.props.data.forEach((location) => {
            locations.push(
                <Location 
                    data={location} 
                    select={this.onLocationSelected}
                    deselect={this.onLocationDeselected}
                    showButton={true}
                />
            );
        });

        this.setState({
            locations: locations,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
            var locations = [];
            nextProps.data.forEach((location) => {
                locations.push(
                    <Location 
                        data={location} 
                        select={this.onLocationSelected}
                        deselect={this.onLocationDeselected}
                        showButton={true}
                        actionType={this.props.actionType}
                    />
                );
            });

            this.setState({
                locations: locations,
            });
        }
    }

    onLocationSelected = (location) => {
        var locations = this.state.selectedLocations;
        locations.push(location);
        
        this.setState({
            selectedLocations: locations,
        });
    
        this.props.selectionChanged(locations);
    }

    onLocationDeselected = (location) => {
        var locations = this.state.selectedLocations;
        
        const index = locations.indexOf(location);
        if (index != -1) {
            locations.splice(index, 1);
        }

        this.setState({
            selectedLocations: locations,
        });

        this.props.selectionChanged(locations);
    }

    render() {
        return (
            <div style={style}>
                {this.state.locations}       
            </div>
        );
    }
}

Locations.PropTypes = {
    actionType: React.PropTypes.string,
    data: React.PropTypes.array,
    selectionChanged: React.PropTypes.func,
}
