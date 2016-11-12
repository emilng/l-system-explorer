import React, { Component } from 'react';
import './App.css';
import Examples from './ui/Examples';
import Start from './ui/Start';
import Axiom from './ui/Axiom';
import InstructionsContainer from './ui/InstructionsContainer';
import RulesContainer from './ui/RulesContainer';
import CanvasUI from './ui/Canvas';
import * as encodeHash from './encoders/hash';
import * as rewrite from './rewrite';
import render from './render';

class App extends Component {
  static updateStep = {
    DECODE: 0,
    REWRITE: 1,
    RENDER: 2,
  }

  constructor(props) {
    super(props);
    const canvas = document.getElementById('canvas');
    const data = this.decodeData();
    this.state = { canvas, data };
    this.canvasUI = new CanvasUI(canvas, data, this.updateData.bind(this));
    this.update = this.update.bind(this);
    this.updateStart = this.update.bind(this, App.updateStep.RENDER);
    this.updateAxiom = this.update.bind(this, App.updateStep.REWRITE);
    this.updateRules = this.update.bind(this, App.updateStep.REWRITE);
    this.updateInstructions = this.update.bind(this, App.updateStep.RENDER);
    this.updateExample = this.update.bind(this, App.updateStep.DECODE);
    this.decodeData = this.decodeData.bind(this);
    this.rewriteData = this.rewriteData.bind(this);
    this.renderData = this.renderData.bind(this);
    this.updateMethods = [this.decodeData, this.rewriteData, this.renderData];
  }

  componentDidMount() {
    this.update(App.updateStep.DECODE);
  }

  decodeData() {
    let hash = window.location.hash.substr(1);
    // hardcoded default for now if nothing is set
    if (hash === '') {
      hash = 'F/F:F+F-F-F+F/F,d3.5;+,a75;-,a-80/6/x347,y358,a70,i6,z100';
    }
    return encodeHash.decode(hash);
  }

  rewriteData(data) {
    const rewrittenRules = rewrite.write(data.rules, data.axiom, data.iterations);
    return { ...data, rewrittenRules};
  }

  renderData(data) {
    const iterations = Math.min(data.rewrittenRules.length - 1, data.start.iterations);
    render(this.state.canvas, data.start, data.rewrittenRules[iterations], data.instructions);
    const urlHash = encodeHash.encode(data);
    const stateObj = { data: urlHash };
    history.replaceState(stateObj, 'L-Systems', `index.html${urlHash}`);
    return data;
  }

  updateData(data) {
    this.renderData(data);
    this.setState({ data });
  }

  update(step) {
    let currentStep = step;
    let data = this.state.data;
    while (currentStep < this.updateMethods.length) {
      data = this.updateMethods[currentStep](data);
      currentStep++;
    }
    this.canvasUI.setData(data);
    this.setState({ data });
  }

  render() {
    const startProps = { data: this.state.data.start, update: this.updateStart };
    const axiomProps = { data: this.state.data, update: this.updateAxiom };
    const rulesProps = { data: this.state.data.rules, update: this.updateRules };
    const instructionsProps = { data: this.state.data.instructions, update: this.updateInstructions };
    const exampleProps = { update: this.updateExample };
    return (
      <div>
        <div id="side-bar">
          <h2>L-System Explorer</h2>
          <Start { ...startProps } />
          <Axiom { ...axiomProps } />
          <RulesContainer { ...rulesProps } />
          <InstructionsContainer { ...instructionsProps } />
          <Examples { ...exampleProps } />
        </div>
      </div>
    );
  }
}

export default App;

