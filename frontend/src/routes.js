/* eslint new-cap: 0 */

import React from 'react';
import { Route } from 'react-router';

/* containers */
import { App } from './containers/App';
import { HomeContainer } from './containers/HomeContainer';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import ProtectedView from './components/ProtectedView';
import Analytics from './components/Analytics';
import NotFound from './components/NotFound';
import CountriesView from './components/CountriesView';
import SearchTours from './components/SearchTours';
import ProfileView from './components/ProfileView';
import FileUpload from './components/FileUpload';
import NewCityDialog from './components/Dialogs/NewCityDialog';
import NewLocationDialog from './components/Dialogs/NewLocationDialog';

import { DetermineAuth } from './components/DetermineAuth';
import { requireAuthentication } from './components/AuthenticatedComponent';
import { requireNoAuthentication } from './components/notAuthenticatedComponent';

export default (
    <Route path="/" component={App}>
        <Route path="main" component={requireAuthentication(ProtectedView)} />
        <Route path="login" component={requireNoAuthentication(LoginView)} />
        <Route path="tours" component={requireNoAuthentication(SearchTours)} />
        <Route path="upload" component={requireAuthentication(FileUpload)} />
        <Route path="register" component={requireNoAuthentication(RegisterView)} />
        <Route path="home" component={requireNoAuthentication(HomeContainer)} />
        <Route path="analytics" component={requireAuthentication(Analytics)} />
        <Route path="countries" component={requireNoAuthentication(CountriesView)} />
        <Route path="new_city" component={requireNoAuthentication(NewCityDialog)} />
        <Route path="new_location" component={requireNoAuthentication(NewLocationDialog)} />
        <Route path="profile" component={requireAuthentication(ProfileView)} />                
        <Route path="*" component={DetermineAuth(NotFound)} />
    </Route>
);
