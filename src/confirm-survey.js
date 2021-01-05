import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';
import { surveySlice } from './store/surveySlice';

function ConfirmSurvey() {
	const { surveyId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const survey = useSelector((globalStore) => globalStore.surveys.find((s) => s.surveyId === surveyId));
	const confirmAndPublish = () => {
		dispatch(surveySlice.actions.markPublished({ surveyId }));
		history.push('/');
	}
	return (
		<>
			{survey.questions.map((q) => (
                <>
					<h4>{q.question}</h4>
            
					{q.type === "single" ? (
						<>
							<label>{q.options[0]}</label>
							<input type="radio" />
							<label>{q.options[1]}</label>
							<input type="radio" />
						</>
					) : (
						<>
							<label>{q.options[0]}</label>
							<input type="checkbox" />
							<label>{q.options[1]}</label>
							<input type="checkbox" />
							<label>{q.options[2]}</label>
							<input type="checkbox" />
							<label>{q.options[0]}</label>
							<input type="checkbox" />
						</>
					)}
				</>
			))}
			<Button className="survey-main-btn" onClick={confirmAndPublish}>
				confirm survey
			</Button>
		</>
	);
}
export default ConfirmSurvey;
