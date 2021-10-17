import React, { useState, useEffect, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';
import { remult } from "../http-common";
import ITutorialData from "../types/Tutorial";

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

const Tutorial: React.FC<Props> = (props: Props) => {

  const [{ currentTutorial }, setCurrentTutorial] = useState({ currentTutorial: remult.repo(ITutorialData).create() });
  const [message, setMessage] = useState<string>("");

  const getTutorial = (id: string) => {
    remult.repo(ITutorialData).findId(id)
      .then(currentTutorial => {
        setCurrentTutorial({ currentTutorial: currentTutorial });
        console.log(currentTutorial);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentTutorial({ currentTutorial: currentTutorial.assign({ [name]: value }) });
  };

  const updatePublished = (status: boolean) => {
    currentTutorial.assign({ published: status }).save()
      .then(currentTutorial => {
        console.log(currentTutorial);
        setCurrentTutorial({ currentTutorial });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    currentTutorial.save()
      .then(response => {
        console.log(response);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    currentTutorial.delete()
      .then(response => {
        console.log(response);
        props.history.push("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTutorial.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
