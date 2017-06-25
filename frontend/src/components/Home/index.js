import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

export const Home = () =>
    <section>
        <div className="container text-center">
            <RaisedButton
                style={{ marginTop: 50 }}
                label="Countries"
                onClick={(e) => {browserHistory.push("/countries")}}
            />
        </div>
    </section>;
