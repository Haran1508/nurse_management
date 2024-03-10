import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class AddEditForm extends React.Component {
  state = {
    id: 0,
    name: "",
    license_number: "",
    dob: "",
    age: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitFormAdd = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/add-staff", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        license_number: this.state.license_number,
        dob: this.state.dob,
        age: this.state.age,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          this.props.addItemToState(item[0]);
          this.props.toggle();
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  };

  submitFormEdit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/edit-staff", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        license_number: this.state.license_number,
        dob: this.state.dob,
        age: this.state.age,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          this.props.updateState(item[0]);
          this.props.toggle();
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    // if item exists, populate the state with proper data
    if (this.props.item) {
      const { id, name, license_number, dob, age } = this.props.item;
      this.setState({ id, name, license_number, dob, age });
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            onChange={this.onChange}
            value={this.state.name === null ? "" : this.state.name}
          />
        </FormGroup>
        <FormGroup>
          <Label for="license_number">License Number</Label>
          <Input
            type="text"
            name="license_number"
            id="license_number"
            onChange={this.onChange}
            value={
              this.state.license_number === null
                ? ""
                : this.state.license_number
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="dob">Date of Birth</Label>
          <Input
            type="text"
            name="dob"
            id="dob"
            onChange={this.onChange}
            value={this.state.dob === null ? "" : this.state.dob}
          />
        </FormGroup>
        <FormGroup>
          <Label for="age">Age</Label>
          <Input
            type="text"
            name="age"
            id="age"
            onChange={this.onChange}
            value={this.state.age === null ? "" : this.state.age}
            placeholder="ex. 20"
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm;
