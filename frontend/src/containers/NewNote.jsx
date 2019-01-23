/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { API } from 'aws-amplify';
import {
  FormGroup, FormControl, Modal, Button,
} from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import './NewNote.css';

export default class NewNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      content: '',
      showModal: false,
      error: { message: '' },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  createNote(note) {
    return API.post('notes', '/notes', {
      body: note,
    });
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleClose() {
    this.setState({ showModal: false, error: { message: '' } });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      await this.createNote({
        content: this.state.content,
      });
      this.props.history.push('/');
    } catch (e) {
      this.setState({ isLoading: false, showModal: true, error: e });
    }
  }

  render() {
    return (
      <div className="NewNote">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Something went wrong</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.state.error.message}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
