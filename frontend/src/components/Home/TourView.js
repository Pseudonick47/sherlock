
import React from 'react';
import List from 'material-ui/List';

import Tour from './Tour';

export default class TourView extends React.Component {

    render() {
        return (
            <List>
                <Tour />
            </List>
        );
    }
  
}
