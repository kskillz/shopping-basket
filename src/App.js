import React, { Component } from 'react';
import './App.css';
import Columns from './Columns.js'
import EditPage from './EditPage.js'

class App extends Component {

  _dbRequest = {};
  _maxId = 0;

  constructor(props) {
    super(props);
    this._loadItems();

    this.state = {
      addItem: false
    };

    this._loadItems = this._loadItems.bind(this);
    this._saveData = this._saveData.bind(this);
    this._toggleEdit = this._toggleEdit.bind(this);
    this._newData = this._newData.bind(this);
    this._delete = this._delete.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderHeader = this.renderHeader.bind(this);

  }

  _loadItems() {
    const req = new XMLHttpRequest();
    req.open('GET', `${process.env.REACT_APP_DATA_URL}/items`);
    req.onreadystatechange = this._getResponseText.bind(this);
    this._dbRequest = req;
    req.send();
  }

  _toggleEdit(editing) {
    this.setState({
      addItem: editing
    });
  }

  _getResponseText() {
    if (this._dbRequest.readyState == 4 && this._dbRequest.status == 200) {
      const itemJson = JSON.parse(this._dbRequest.responseText);
      let newArray = itemJson.slice();
      this.shuffleArray(newArray);
      newArray.forEach((item) => {
        if (item.id > this._maxId) {
          this._maxId = item.id + 1;
        }
      });
      this.setState({items: newArray});
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  _saveData(id, data) {
    const req = new XMLHttpRequest();
    const url = `${process.env.REACT_APP_DATA_URL}/items/${id}`;
    req.open('PATCH', url);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(data));
  }

  _newData(data) {
    const req = new XMLHttpRequest();
    const url = `${process.env.REACT_APP_DATA_URL}/items`;
    req.open('POST', url);
    req.setRequestHeader("Content-Type", "application/json");
    req.onreadystatechange = this._loadItems.bind(this);

    req.send(JSON.stringify(data));
  }

  _delete(id) {
    const req = new XMLHttpRequest();
    const url = `${process.env.REACT_APP_DATA_URL}/items/${id}`;
    req.open('DELETE', url);
    req.setRequestHeader("Content-Type", "application/json");
    req.send();

    const items = this.state.items.slice();
    const filteredItems = items.filter(i => i.id !== id);
    this.setState({items: filteredItems});
  }

  renderHeader() {
    return null;
  }

  renderContent() {
    if (this.state.addItem) {
      return (
        <EditPage onComplete={this._toggleEdit} addData={this._newData} />
      );
    }
    else if (this.state.items) {
      return (
        <Columns items={this.state.items} saveData={this._saveData} edit={this._toggleEdit} delete={this._delete}/>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderContent()}
        {this.renderHeader()}
      </div>
    );
  }
}

export default App;
