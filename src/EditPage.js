import React, { Component } from 'react';
import './App.css';

class EditPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      brand: "",
      name: "",
      price: 0,
      url: "",
      image: "",
      category: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this._submitForm = this._submitForm.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  _submitForm() {
    const newItem = {
      brand: this.state.brand,
      name: this.state.name,
      price: this.state.price,
      url: this.state.url,
      image: this.state.image,
      category: this.state.category
    };
    this.props.addData(newItem);
    this.props.onComplete(false);
  }

  render() {
    return (
      <div id="form">
      <form>
        <label>
          <labeltext>Brand</labeltext>
          <input
            name="brand"
            type="text"
            value={this.state.brand}
            onChange={this.handleInputChange} />
        </label>
        <br />

          <label>
          <labeltext>Name</labeltext>
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleInputChange} />
          </label>
        <br />

          <label>
          <labeltext>Price</labeltext>
          <input
            name="price"
            type="number"
            value={this.state.price}
            onChange={this.handleInputChange} />
          </label>
        <br />

          <label>
          <labeltext>URL</labeltext>
          <input
            name="url"
            type="text"
            value={this.state.url}
            onChange={this.handleInputChange} />
          </label>
        <br />

          <label>
          <labeltext>Image</labeltext>
          <input
            name="image"
            type="text"
            value={this.state.image}
            onChange={this.handleInputChange} />
          </label>
        <br />

          <label>
          <labeltext>Category</labeltext>
          <input
            name="category"
            type="text"
            value={this.state.category}
            onChange={this.handleInputChange} />
          </label>
        <br />
      </form>

      <button onClick={this._submitForm}>Submit</button>
      </div>
    );
  }

}

export default EditPage;
