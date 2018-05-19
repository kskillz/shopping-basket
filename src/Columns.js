import React, { Component } from 'react';
import Item from './Item.js'
import Category from './Category.js'

class Columns extends Component {

  constructor(props) {
    super(props);

    let startPrice = 0;
    this.props.items.forEach((item) => {
      if (item.priceInclude && item.price) {
        startPrice += Number(item.price);
      }
    });

    this.state = {
      totalPrice: startPrice,
      category: undefined,
      showPurchased: false,
    };

    this._includePrice = this._includePrice.bind(this);
    this._updateCategory = this._updateCategory.bind(this);
    this._showPurchased = this._showPurchased.bind(this);
    this._addItem = this._addItem.bind(this);
  }

  _includePrice(id, amt) {
    const newPrice = this.state.totalPrice + Number(amt);
    this.setState({
      totalPrice: newPrice
    });
  }

  _updateCategory(name) {
    this.setState({
      category: name
    });
  }

  _showPurchased() {
    const shouldShowPurchased = !this.state.showPurchased;
    this.setState({
      showPurchased: shouldShowPurchased
    });
  }

  renderCategories() {
    const categories = this.props.items
      .map((item) => item.category)
      .filter((v, i, a) => a.indexOf(v) === i)
      .filter((category) => category !== undefined && category !== '');
    categories.unshift("All");
    return categories.map((category) => {
      let selected = category == this.state.category;
      return (
        <Category name={category} updateCategory={this._updateCategory} selected={selected} />
      );
    });
  }

  renderItems() {
    if (this.props.items) {
      let newArray = this.props.items.slice();
      if (this.state.category && this.state.category !== 'All') {
        newArray = newArray.filter((item) =>
          item.category == this.state.category
        );
      }
      return newArray
        .filter((item) => {
          if (item.purchased && this.state.showPurchased) {
            return true;
          } else if (!item.purchased && !this.state.showPurchased) {
            return true;
          }
          return false;
        })
        .map((item) =>
        <Item
          id={item.id}
          brand={item.brand}
          name={item.name}
          price={item.price}
          url={item.url}
          image={item.image}
          priceInclude={item.priceInclude}
          onPriceInclude={this._includePrice}
          saveData={this.props.saveData}
          delete={this.props.delete}
        />
      )
    }
    return null;
  }

  _addItem() {
    this.props.edit(true);
  }

  render() {
    return (
      <div>
        <div id="header">
          <div id="title">
            Shopper <byline>by kskillman</byline>
            <br />
            <byline><blah onClick={this._showPurchased}>{this.state.showPurchased ? "Show Shopping List" : "Show Purchased"}</blah></byline>
            <br />
            <byline>{this.renderCategories()}</byline>
          </div>
          <stats>
            <label>total:</label> ${Math.round(this.state.totalPrice)}
            <br />
            <button onClick={this._addItem}>Add New Item</button>
          </stats>
        </div>
        <div id="columns">
          {this.renderItems()}
        </div>
      </div>
    );
  }
}

export default Columns;
