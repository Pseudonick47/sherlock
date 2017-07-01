/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/auth';
import { validateEmail } from '../utils/misc';
import Comments from './Comments'

import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import RaisedButton from 'material-ui/RaisedButton';


export default class SingleTour extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLigthboxOpen: false,
            currentPhoto: 1,
        };
    }

    openLightbox = (index, event) => {
        event.preventDefault();
        this.setState({ isLigthboxOpen: true, currentPhoto: index });
    }
    closeLightbox = () => this.setState({ isLigthboxOpen: false });
    nextPhoto = () => this.setState({ currentPhoto: this.state.currentPhoto + 1 });
    prevPhoto = () => this.setState({ currentPhoto: this.state.currentPhoto - 1 });

    render() {
        
        alert(this.props.routeParams.id);
        const PHOTO_SET = [
            {
                src: 'http://tilda.center/static/images/album-tilda/01a.jpg',
                width: 1680,
                height: 1050,
                alt: 'image 1',
            },
            {
                src: 'http://tilda.center/static/images/album-tilda/02a.jpg',
                width: 1680,
                height: 1050,
                alt: 'image 1',
            },
            {
                src: 'http://tilda.center/static/images/album-tilda/04a.jpg',
                width: 1680,
                height: 1050,
                alt: 'image 2',
            },
            {
                src: 'http://tilda.center/static/images/album-tilda/05a.jpg',
                width: 1680,
                height: 1050,
                alt: 'image 2',
            },
            {
                src: 'http://tilda.center/static/images/album-tilda/06a.jpg',
                width: 1680,
                height: 1050,
                alt: 'image 2',
            },
            {
                src: 'http://tilda.center/static/images/album-tilda/07a.jpg',
                width: 1680,
                height: 1050,
                alt: 'image 2',
            },
            {
                src: 'http://tilda.center/static/images/album-tilda/08a.jpg',
                width: 1680,
                height: 1050,
                alt: 'image 2',
            },
        ];

        const style = {
            margin: 12,
        };
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Ime</h1>
                        <Divider />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7">
                        <h2>Description:</h2>
                        <p>Corrupti rerum eligendi impedit odit. Quia suscipit soluta qui velit quis. Quasi sit ipsa quisquam. Neque mollitia totam dolores suscipit incidunt ipsum minus. Aut architecto animi quod est voluptas cumque nisi quis.
        Ad perspiciatis aut aut. Facilis rem eos corporis asperiores et soluta quia. Ut quas eum molestias ratione molestiae inventore cupiditate unde. Ipsum rerum laudantium quisquam ex non neque quis. Numquam et nemo officia deleniti.
        Ratione officiis fugiat odio hic. Nihil vel nihil deserunt repellat. Harum blanditiis tempora qui. Enim non dolores mollitia quisquam.
        Omnis dolore explicabo at consectetur molestiae sapiente. Blanditiis recusandae odio delectus eligendi corrupti iusto ex dicta. Modi consequatur est rerum enim possimus sequi. Deserunt consequatur adipisci nisi modi ut saepe consequuntur quibusdam. Et eveniet vel totam facilis debitis necessitatibus minima.</p>
                        <Divider />
                        <h3>Locations:</h3>
                        <ul>
                            <li>Lok 1</li>
                            <li>Lok 1</li>
                            <li>Lok 1</li>
                            <li>Lok 1</li>
                        </ul>
                        <Divider />
                        <RaisedButton label="Rate" style={style} />
                        <RaisedButton label="Book" primary={true} style={style} />
                        <RaisedButton label="Comment" secondary={true} style={style} />   
                        <Divider />
                        <h3>Comments</h3>
                        <Comments />

                    </div>
                    <div className="col-md-4 col-md-offset-1">
                        <Gallery photos={PHOTO_SET}onClickPhoto={this.openLightbox} />
                        <Lightbox
                            images={PHOTO_SET}
                            isOpen={this.state.isLigthboxOpen}
                            onClose={this.closeLightbox}
                            onClickNext={this.nextPhoto}
                            onClickPrev={this.prevPhoto}
                            currentImage={this.state.currentPhoto}
                        />
                    </div>
                        
                </div >
            </div >
        );

    }
}
