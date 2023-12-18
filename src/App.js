import React, { Fragment , useEffect } from 'react';
import { BrowserRouter as Router , Switch , Route , Redirect } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Alert from './components/Alert/Alert';
import Dashboard from './components/Dashboard/Dashboard';
import CreateProfile from './components/Profile-Form/CreateProfile';
import EditProfile from './components/Profile-Form/EditProfile';
import PrivateRoute from './components/Routing/PrivateRoute';
import AddExperience from './components/Profile-Form/AddExperience';
import AddEducation from './components/Profile-Form/AddEducation';
import Profiles from './components/Profiles/Profiles';
import Profile from './components/Profile/Profile';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import Editor from './components/Editor/Editor';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {

	useEffect(() => {
		store.dispatch(loadUser());
	} , []);

    return (
		// <Router>
		// 	<Switch>
		// 		<Route path='/' exact>
		// 			<Redirect to={`/documents/${uuidV4()}`} />
		// 		</Route>
		// 		<Route path='/documents/:id'>
        //             <Home />
		// 		</Route>
		// 	</Switch>
		// </Router>	
		<Provider store={store}>
    		<Router>
			<Fragment>
				<Navbar />
				<Route exact path='/' component={Landing} />
				<section className='container-outer'>
				<Alert />
				<Switch>
					<Route exact path='/register' component={Register} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/profiles' component={Profiles} />
					<Route exact path='/profile/:id' component={Profile} />
					<PrivateRoute exact path='/dashboard' component={Dashboard} />
					<PrivateRoute exact path='/create-profile' component={CreateProfile} />
					<PrivateRoute exact path='/edit-profile' component={EditProfile} />
					<PrivateRoute exact path='/add-experience' component={AddExperience} />
					<PrivateRoute exact path='/add-education' component={AddEducation} />
					
				</Switch>
				</section>
				
			</Fragment>
			<Route exact path='/interview'>
				<Redirect to={`/interview/documents/${uuidV4()}`} />
			</Route>
			<Route path='/interview/documents/:id' component={Home} />
			</Router>
		</Provider>
	);
}

export default App