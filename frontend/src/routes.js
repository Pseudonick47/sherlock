import React from 'react';
import { Route } from 'react-router';

/* containers */
import { App } from './containers/App';
import ChooseLocationsDialog from './components/Dialogs/ChooseLocationsDialog';
import FileUpload from './components/FileUpload';
import { HomeContainer } from './containers/HomeContainer';
import LoginView from './components/LoginView';
import NewCityDialog from './components/Dialogs/NewCityDialog';
import NewLocationDialog from './components/Dialogs/NewLocationDialog';
import NewTour from './components/NewTour';
import NotFound from './components/NotFound';
import ProfileView from './components/ProfileView';
import RegisterView from './components/RegisterView';
import SearchTours from './components/SearchTours';
import SingleTour from './components/SingleTour'

import { determineAuth } from './components/DetermineAuth';
import { requireAuthentication } from './components/AuthenticatedComponent';
import { requireGuideAuthentication } from './components/GuideAuthenticatedComponent'; 
import { requireNoAuthentication } from './components/notAuthenticatedComponent';

export default (
    <Route path="/" component={App}>
        <Route path="home" component={determineAuth(SearchTours)} />
        <Route path="login" component={requireNoAuthentication(LoginView)} />
        <Route path="main" component={determineAuth(SearchTours)} />
        <Route path="profile" component={requireAuthentication(ProfileView)} />
        <Route path="register" component={requireNoAuthentication(RegisterView)} />
        <Route path="tour" component="div">
            <Route path="new" component={requireGuideAuthentication(NewTour)} />
            <Route path=":id" component={determineAuth(SingleTour)} />
        </Route>
        <Route path="tours" component={determineAuth(SearchTours)} />
        <Route path="upload" component={determineAuth(FileUpload)} />
        <Route path="*" component={determineAuth(NotFound)} />
    </Route>
);

/*

*/