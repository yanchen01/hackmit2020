import React, { useState, useRef } from "react";
import {
  InputGroup,
  Row,
  FormControl,
  Container,
  Button,
  FormGroup,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip } from "@material-ui/core";
import { Typeahead } from "react-bootstrap-typeahead";
import _ from "lodash";

import "react-bootstrap-typeahead/css/Typeahead.css";

import { generateName } from "../../helpers/name";

const TAGS = ["AI", "Community/Connectivity"];

const CreateTeam = () => {
  const [tags, setTags] = useState(TAGS);
  const onSubmit = (data) => {};

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

  const typeaheadRef = useRef(null);

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
              placeholder={generateName()}
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
          <Typeahead
            id="tags-select"
            dropup
            options={["ML", "Health care", "Urban Innovation", "React", "React Native", "iOS", "Android"]}
            onChange={() => {}}
            ref={typeaheadRef}
          />
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
    </section>
  );
};

export default CreateTeam;
