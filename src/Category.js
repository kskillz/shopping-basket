import React, { Component } from 'react';

class Category extends Component {

  constructor(props) {
    super(props);

    this._updateCategory = this._updateCategory.bind(this);
  }

  _updateCategory() {
    this.props.updateCategory(this.props.name);
  }

  render() {
    if (this.props.selected) {
      return <catitem> // <category className="selected">{this.props.name} </category></catitem>
    }
    return <catitem> // <category onClick={this._updateCategory}>{this.props.name}</category></catitem>
  }
}

export default Category;
