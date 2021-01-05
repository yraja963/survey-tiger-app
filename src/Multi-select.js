import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';
import { surveySlice } from './store/surveySlice';
import { Button } from 'reactstrap';

function MultiSelect() {
	const { surveyId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const [options, setOptions] = useState(['']);
	const [question, setQuestion] = useState(['']);
	const addOption = (optionIdx) => {
		if (options.length < 4) {
			const newOptions = [...options, ''];
			const newOptionIdx = optionIdx + 1;
			let currentOptionIdx = newOptions.length - 1;
			while (newOptionIdx !== currentOptionIdx) {
				newOptionIdx[currentOptionIdx] = newOptions[currentOptionIdx - 1];
				currentOptionIdx--;
				newOptions[currentOptionIdx] = '';
			}

			setOptions([...options, '']);
		}
	};
	const removeOption = (optionIdx) => {
		if (options.length > 1) {
			options.splice(optionIdx, 1);
			setOptions([...options]);
		}
	};
	const setOptionArray = (value, optionIdx) => {
		options[optionIdx] = value;

		setOptions([...options]);
	};
	const disabledquestions = () => question.trim === '' || options.find((opt) => opt.trim === '') !== undefined;
	const addQuestion = () => {
		const payload = { options, question, surveyId, type: 'multiple' };
		dispatch(surveySlice.actions.addQuestion(payload));
		history.push('/create/' + surveyId + '?clear=true');
	};
	return (
		<div className="Question">
			<InputGroup>
				<InputGroupAddon addonType="prepend">
					<InputGroupText>?</InputGroupText>
				</InputGroupAddon>
				<Input placeholder="Your Question" onChange={(e) => setQuestion(e.target.value)} value={question} />
			</InputGroup>
			<p className="option-text">Options</p>
			{options.map((option, optionIdx) => (
				<InputGroup key={optionIdx}>
					<Input
						placeholder={`Option ${optionIdx + 1}`}
						value={option}
						onChange={(e) => setOptionArray(e.target.value, optionIdx)}
					/>
					<InputGroupAddon addonType="append">
						<Button onClick={() => addOption(optionIdx)} disabled={options.length === 4}>
							+
						</Button>
						<Button onClick={() => removeOption(optionIdx)}>-</Button>
					</InputGroupAddon>
				</InputGroup>
			))}

			<div className="question-buttons">
				<Button className="survey-main-btn" disabled={disabledquestions()} onClick={addQuestion}>
					AddQuestion
				</Button>
				<Button className="survey-main-btn" disabled={disabledquestions()}>
					Publish
				</Button>
			</div>
		</div>
	);
}
export default MultiSelect;
