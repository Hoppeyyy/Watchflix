import styled from "styled-components";
import Head from "next/head";
import { React, useEffect, useState, Component } from "react";
import { useTheme, useResult } from "@/utils/provider";

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };

    this.toggleState = this.toggleState.bind(this);
  }

  toggleState() {
    this.setState({
      toggle: !this.state.toggle,
    });
  }

  render() {
    return (
      <form className="switch-field">
        <div className="switch-title">{this.props.title}</div>
        <input
          type="radio"
          id="switch_left"
          name="switchToggle"
          value={this.props.leftLabel}
          onChange={this.toggleState}
          checked={!this.state.toggle}
					onClick={this.props.leftClick}
        />
        <label
          className="switch-bkImg"
          htmlFor="switch_left"
          style={{ backgroundImage: this.props.bkImageL }}
        />

        <input
          type="radio"
          id="switch_right"
          name="switchToggle"
          value={this.props.rightLabel}
          onChange={this.toggleState}
          checked={this.state.toggle}
					onClick={this.props.rightClick}
        />
        <label
          className="switch-bkImg"
          htmlFor="switch_right"
          style={{ backgroundImage: this.props.bkImageR }}
        />
      </form>
    );
  }
}

const ToggleBttn = ({
  bkImageL = 'url("../images/icon_light.svg")',
  bkImageR = 'url("../images/icon_dark.svg")',
	leftClick = () => {},
	rightClick =() => {},

}) => {

	const { theme } = useTheme();

  return (
    <Toggle
      title=""
      bkImageL={bkImageL}
      bkImageR={bkImageR}
			leftClick={leftClick}
			rightClick={rightClick}

    />
  );
};

export default ToggleBttn;
