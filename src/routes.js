import React from 'react';
import {Switch,Route} from 'react-router-dom';

import VolunteerRegister from './components/volunteer/VolunteerRegister';
import VolunteerLogin from './components/volunteer/VolunteerLogin';
import VolunteerProfile from './components/volunteer/VolunteerProfile';
import VolunteerEdit from './components/volunteer/VolunteerEdit';
import EventVolunteerList from './components/event/EventVolunteerList';

import OrganizationRegister from './components/organization/OrganizationRegister';
import OrganizationLogin from './components/organization/OrganizationLogin';
import OrganizationProfile from './components/organization/OrganizationProfile';
import OrganizationEdit from './components/organization/OrganizationEdit';

import AddEvent from './components/event/AddEvent';
import EditEvent from './components/event/EditEvent';
import DetailedEvent from './components/event/DetailedEvent';
import Home from './components/Home';
import Welcome from './components/Welcome';

import Sendgrid from './components/Sendgrid';

import Address from './components/Address';
import Cloudinary from './components/Cloudinary';


export default(
    <Switch>
        <Route exact path="/" component={Welcome}/>
        <Route path="/event/:id/volunteers" component={EventVolunteerList}/>       
        <Route path="/email" component={Sendgrid}/>
        <Route path="/volunteer/register" component={VolunteerRegister}/>
        <Route path="/volunteer/profile"  component={VolunteerProfile}/>
        <Route path="/home" component={Home}/>
        <Route path="/volunteer/login" component={VolunteerLogin}/>
        <Route path="/volunteer/edit"  component={VolunteerEdit}/>
        <Route path="/organization/register"  component={OrganizationRegister}/>
        <Route path="/organization/profile"  component={OrganizationProfile}/>
        <Route path="/organization/edit"  component={OrganizationEdit}/>
        <Route path="/organization/login" component={OrganizationLogin}/>
        <Route path='/event/edit/:id' component={EditEvent}/>
        <Route path="/event/:id" component={DetailedEvent}/>
        <Route path="/add" component={AddEvent}/>
        <Route path="/address" component={Address}/>
        <Route path="/cloudinary" component={Cloudinary}/>
    </Switch>
)
