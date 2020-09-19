import React, { useState, useRef, useEffect } from "react";
import {
  InputGroup,
  Row,
  FormControl,
  Container,
  Button,
  FormGroup,
  ButtonToolbar,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip, Snackbar } from "@material-ui/core";
import { AsyncTypeahead, Typeahead } from "react-bootstrap-typeahead";
import { useSnackbar, withSnackbar } from "notistack";
import _ from "lodash";

import "react-bootstrap-typeahead/css/Typeahead.css";

const TAGS = ["AI", "Community/Connectivity"];

const CreateTeam = () => {
  const [tags, setTags] = useState(TAGS);
  const [tagToAdd, setTagToAdd] = useState([]);
  const onSubmit = (data) => {};
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { register, handleSubmit, watch, errors } = useForm();

  // temp
  const MAX_MEMBERS = 4;

  const onDeleteTag = (tag) => {
    let currentTags = [...tags];
    if (currentTags.includes(tag)) {
      currentTags = currentTags.filter((e) => e !== tag);
    }
    setTags(currentTags);
  };

  const typeaheadRef = useRef();

  const onAddTag = (tag) => {
    if (tag[0].length > 30) {
      enqueueSnackbar("Tag must be shorter!", {
        variant: "error",
        onClick: () => closeSnackbar(),
      });
    }
    if (tag[0].length > 0 && tags.length < 10 && tag[0].length < 30) {
      let currentTags = [...tags];
      const doesHaveTag = currentTags.includes(tag[0]);
      if (!doesHaveTag) {
        currentTags = [...tags, ...tag];
        setTags(currentTags);
        typeaheadRef.current.clear();
      }
    }
  };

  return (
    <section className="create-event-page m-xl-5">
      <Container>
        <h1>Create Team</h1>

        <div className="mt-lg-3 mb-lg-3">
          <label>Enter team name</label>
          <InputGroup>
            <FormControl
              name="team"
              ref={register({ min: 1, required: true, maxLength: 25 })}
              placeholder="Your team"
              aria-label="team"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          {errors.team && (
            <span className="text-danger">
              This field is required (1-25 characters)
            </span>
          )}
        </div>

        {/* conditionally based on current event's max team member size */}
        <div className="mt-lg-3 mt-lg-3">
          <label>Max members</label>
          <InputGroup>
            <FormControl
              name="maxMembers"
              type="number"
              min={0}
              ref={register({ min: 2, max: MAX_MEMBERS, required: true })}
              placeholder="4"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          {errors.maxMembers && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <div className="mt-lg-3 mb-lg-3">
          <label>Current team size</label>
          <InputGroup>
            <FormControl
              name="currentTeamSize"
              type="number"
              min={0}
              ref={register({ min: 2, max: MAX_MEMBERS, required: true })}
              placeholder="4"
              aria-label="usersPerTeam"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          {errors.currentTeamSize && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <div className="mt-lg-3 mb-lg-3">
          <label>Add tags</label>
          <AsyncTypeahead
            clearButton
            id="tags-select"
            dropup
            isLoading={false}
            minLength={1}
            onSearch={(e) => {
              setTagToAdd([e]);
            }}
            onSubmit={() => onAddTag(tagToAdd)}
            options={[
              "ML",
              "Health care",
              "Urban Innovation",
              "React",
              "React Native",
              "iOS",
              "Android",
            ]}
            onChange={(e) => {
              setTagToAdd(e);
            }}
            ref={typeaheadRef}
          />
          <ButtonToolbar style={{ marginTop: "10px" }}>
            <Button
              onClick={() => onAddTag(tagToAdd)}
              variant="outline-secondary"
            >
              Add
            </Button>
          </ButtonToolbar>
        </div>

        <div className="mt-lg-3 mb-lg-3">
          {tags.map((e, i) => (
            <Chip
              className="mr-2"
              label={e}
              key={`${e}-${i}`}
              variant="outlined"
              onDelete={() => onDeleteTag(e)}
            />
          ))}
        </div>

        <div className="mt-lg-3 mb-lg-3">
          <Button onClick={handleSubmit(onSubmit)} variant="primary" size="lg">
            Create Team
          </Button>
        </div>
      </Container>
      <Snackbar />
    </section>
  );
};

export default CreateTeam;
