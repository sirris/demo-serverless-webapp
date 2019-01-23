/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { API } from 'aws-amplify';
import { LinkContainer } from 'react-router-bootstrap';
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';
import './Home.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: [],
    };
  }

  async componentDidMount() {
    try {
      const notes = await this.notes();
      this.setState({ notes });
    // eslint-disable-next-line no-empty
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  // eslint-disable-next-line class-methods-use-this
  notes() {
    return API.get('notes', '/notes');
  }

  // eslint-disable-next-line class-methods-use-this
  renderNotesList(notes) {
    return [{}].concat(notes).map(
      (note, i) => (i !== 0
        ? (
          <ListGroupItem
            key={note.noteId}
            to={`/notes/${note.noteId}`}
            header={note.content.trim().split('\n')[0]}
          >
            {`Created: ${new Date(note.createdAt).toLocaleString()}`}
          </ListGroupItem>
        )
        : (
          <LinkContainer
            key="new"
            to="/notes/new"
          >
            <ListGroupItem>
              <h4>
                <b>{'\uFF0B'}</b>
                {' '}
Create a new note
              </h4>
            </ListGroupItem>
          </LinkContainer>
        )),
    );
  }

  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        { this.renderNotes() }
      </div>
    );
  }
}
