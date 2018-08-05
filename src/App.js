import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import { Button, FormGroup, FormControl, Table, Modal } from 'react-bootstrap';
import './App.css';

class App extends Component {
  
  name = "sdsadas";
  
  inputSummary = "";
  
  constructor(props) {
    super(props);
    this.state = { todos: [], summary: "", showModal: false, selectedTodo: {summary: "", done: false}};
  }
  
  handleDelete(toDo) {
    var temp =  this.state.todos;
    var i = temp.indexOf(toDo);
    temp.splice(i, 1);
    this.setState({todos: temp});
  }
  
  handleClick(a) {
    this.setState({summary: a});
    var todos = this.state.todos.slice();
    todos.push({summary: a, done: false});
    this.setState({ todos: todos });
    this.setState({summary: ""});
    ReactDOM.render(<App />, document.getElementById('root'));
  }
  
  handleChange(event) {
    this.inputSummary = event.target.value;
  }
  
  openModal(toDo) {
    this.setState({ showModal: true });
    this.state.selectedTodo = toDo;
  }
  
  closeModal(x) {
    this.setState({ showModal: false });
  }
  
  editApply(a) {
    var temp = this.state.todos.slice();
    var i = temp.indexOf(this.state.selectedTodo);
    temp[i].summary = this.inputSummary;
    this.setState({todos: temp});
    this.closeModal(null);
  }
  
  toggleDone(toDo) {
    var temp = this.state.todos.slice();
    var i = temp.indexOf(toDo);
    temp[i].done = !temp[i].done;
    this.setState({todos: temp});
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="container">
          <div className="container">
            <FormGroup>
              <FormControl onChange={event => this.handleChange(event)} value={this.state.Summary} type="text" placeholder="Summary"/>
              <Button onClick={a => this.handleClick(this.inputSummary)} bsStyle="primary" type="submit">Submit</Button>
            </FormGroup>
          </div>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Summary</th>
                <th>Done</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo, index) =>{
                return(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{todo.summary}</td>
                    <td>
                      <Button onClick={t => this.toggleDone(todo)} bsStyle="success" type="submit">{todo.done.toString()}</Button>
                    </td>
                    <td>
                      <Button onClick={t => this.openModal(todo)} bsStyle="info" type="submit">Edit</Button>
                    </td>
                    <td>
                      <Button onClick={t => this.handleDelete(todo)} bsStyle="danger" type="submit">Delete</Button>
                    </td>
                  </tr>
                )})}
            </tbody>
          </Table>
          <Modal show={this.state.showModal} onHide={x => this.closeModal(this.state.showModal)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit TODO</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <FormControl onChange={event => this.handleChange(event)} defaultValue={this.inputSummary}  type="text" placeholder="Summary"/>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={a => this.editApply(this.inputSummary)} bsStyle="primary">Apply</Button>
            <Button onClick={x => this.closeModal(this.state.showModal)}>Close</Button>
          </Modal.Footer>
        </Modal>
        </div>
      </div>
    );
  }
}

export default App;
