import React, { useState, ChangeEvent } from "react";
import { context } from "../http-common";
import ITutorialData from '../types/Tutorial';
import { set } from 'remult/set';

const AddTutorial: React.FC = () => {

  const [{tutorial}, setTutorial] = useState({ tutorial: context.for(ITutorialData).create() });
  
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    set(tutorial, { [name]: value });
    setTutorial({ tutorial });
  };

  const saveTutorial = () => {
    tutorial.save()
      .then(tutorial => {
        setTutorial({ tutorial });
        setSubmitted(true);
        console.log(tutorial);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial({ tutorial: context.for(ITutorialData).create() });
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
