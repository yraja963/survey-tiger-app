import { Switch, Route, Link, useHistory } from 'react-router-dom';
import logo from './logo.png';
import './App.css';
import { Button } from 'reactstrap';
import CreateSurvey from './Create-Survey';
import { useDispatch } from 'react-redux';
import { createSurvey } from './store/surveySlice';
import { unwrapResult } from '@reduxjs/toolkit';
import TakeSurvey from "./take-survey";
import ConfirmSurvey from './confirm-survey';

function App() {
	const dispatch = useDispatch();
	const history = useHistory();
	const redirectSurvey = () => {
		// console.log('action', surveySlice.acitons.CreateSurvey());
		dispatch(createSurvey())
			.then(unwrapResult)
			.then((newSurveyId) => history.push('/create/' + newSurveyId));
	};
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<Switch>
					<Route path="/create/:surveyId">
						<CreateSurvey />
					</Route>
					<Route path="/confirm/:surveyId">
						<ConfirmSurvey />
					</Route>
					<Route path="/take"><TakeSurvey /></Route>
					<Route path="/">
						<Button className="survey-main-btn" onClick={redirectSurvey}>
							Create Survey
						</Button>
						<Link to="/take">
							<Button className="survey-main-btn">Take Survey</Button>
						</Link>
					</Route>
				</Switch>
			</header>
		</div>
	);
}

export default App;
