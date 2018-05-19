import React, { Component } from 'react';

class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bought: this.props.bought,
      priceInclude: !!this.props.priceInclude
    };

    this._includePrice = this._includePrice.bind(this);
    this._delete = this._delete.bind(this);
  }

  _includePrice() {
    let priceInclude;
    if (!this.state.priceInclude) {
      priceInclude = true;
      this.props.onPriceInclude(this.props.id, Number(this.props.price));
    } else {
      priceInclude = false;
      this.props.onPriceInclude(this.props.id, -1 * Number(this.props.price));
    }
    this.props.saveData(this.props.id, {...this.props, priceInclude});
    this.setState({priceInclude});
  }

  _delete() {
    this.props.delete(this.props.id);
  }

  render() {
    return (
      <figure>
        <button className="icon" onClick={this._includePrice}>{this.state.priceInclude === false ? "in" : "out"}</button>
        <button className="space"> </button>
        <button className="icon" onClick={this._delete}>x</button>
        <a href={this.props.url}>
          <img src={this.props.image} />
          <figcaption>
            <captionleft><brand>{this.props.brand}</brand><br />{this.props.name}</captionleft>
            <captionright>${Math.round(this.props.price)}</captionright>
          </figcaption>
        </a>
      </figure>
    );
  }
}

export default Item;
