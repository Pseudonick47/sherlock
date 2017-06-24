import React from 'react';
import Paper from 'material-ui/Paper'

const style = {
  height: 100,
  width: 900,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

export default class Tour extends React.Component {
    render() {
        return (
            <div>
                <Paper style={style} zDepth={2} />
            </div>
        );
    }
}
