/* eslint new-cap: 0 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import { App } from './containers/App';
import { HomeContainer } from './containers/HomeContainer';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import ProtectedView from './components/ProtectedView';
import NotFound from './components/NotFound';
import CountriesView from './components/CountriesView';
import SearchTours from './components/SearchTours';
import ProfileView from './components/ProfileView';
import FileUpload from './components/FileUpload';
import NewCityDialog from './components/Dialogs/NewCityDialog';
import NewLocationDialog from './components/Dialogs/NewLocationDialog';
import AddLocations from './components/Dialogs/AddLocations';
import AddTour from './components/AddTour';
import SingleTour from './components/SingleTour'

import { DetermineAuth } from './components/DetermineAuth';
import { requireAuthentication } from './components/AuthenticatedComponent';
import { requireNoAuthentication } from './components/notAuthenticatedComponent';
import { requireGuideAuthentication } from './components/GuideAuthenticatedComponent'; 

export default (
    <Route path="/" component={App}>
        <Route path="home" component={SearchTours} />
        <Route path="main" component={ProtectedView} />
        <Route path="login" component={requireNoAuthentication(LoginView)} />
        <Route path="tours" component={SearchTours} />
        <Route path="tour" component="div">
            <Route path=":id" component={SingleTour} />
        </Route>
        <Route path="upload" component={FileUpload} />
        <Route path="register" component={requireNoAuthentication(RegisterView)} />
        <Route path="home" component={HomeContainer} />
        <Route path="countries" component={CountriesView} />
        <Route path="new_tour" component={requireGuideAuthentication(AddTour)} />
        <Route path="profile" component={ProfileView} />
        <Route path="*" component={DetermineAuth(NotFound)} />
    </Route>
);
