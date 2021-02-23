import React, { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupText, Input,Button } from "reactstrap";
import {useParams,useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {surveySlice} from "./store/surveySlice";


function SingleSelect() {
  const {surveyId}=useParams();
  const dispatch=useDispatch();
  const history=useHistory();
  const [options, setOptions] = useState(["", ""]);
  const [question, setQuestion] = useState("");
  const setOptionArray = (value, optionIdx) => {
    options[optionIdx] = value;

    setOptions([...options]);
  };
  const disabledquestions = () =>
    question.trim === "" ||
    options.find((opt) => opt.trim === "") !== undefined;
    const addQuestion=()=>{
      const payload={options,question,surveyId,type:"single"};
      dispatch(surveySlice.actions.addQuestion(payload));
      history.push("/create/"+ surveyId +"?clear=true");
    }
  
    const publishQuestion=()=>
    {
      const payload={
        options,question,surveyId,type:"single"};
        dispatch(surveySlice.actions.addQuestion(payload));
      history.push("/confirm/"+ surveyId +"?clear=true");
  }
    
  return (
    <div className="Question">
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>?</InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder="Your Question"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        />
      </InputGroup>
      <p className="option-text">Options</p>
      <InputGroup>
        <Input
          placeholder="Options1"
          value={options[0]}
          onChange={(e) => setOptionArray(e.target.value, 0)}
        />
        <InputGroupAddon addonType="append">
          <InputGroupText>+</InputGroupText>
          <InputGroupText>-</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <Input
          placeholder="Options2"
          value={options[1]}
          onChange={(e) => setOptionArray(e.target.value, 1)}
        />
        <InputGroupAddon addonType="append">
          <InputGroupText>+</InputGroupText>
          <InputGroupText>-</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <div className="question-buttons">
        <Button className="survey-main-btn" disabled={disabledquestions()} onClick={addQuestion}>
          AddQuestion
        </Button>
        <Button className="survey-main-btn" disabled={disabledquestions()} onClick={publishQuestion}>
          Publish
        </Button>
      </div>
    </div>
  );
}
export default SingleSelect;
