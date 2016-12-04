import React, { Component } from 'react';
import './App.css';
import Examples from './ui/Examples';
import Start from './ui/Start';
import Iterations from './ui/Iterations';
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
    this.state = { canvas,
      start: data.start,
      iterations: data.iterations,
      axiom: data.axiom,
      rules: data.rules,
      rewrittenRules: '',
      instructions: data.instructions,
    };
    this.canvasUI = new CanvasUI(canvas, data.start, this.updateStartData.bind(this));
    this.update = this.update.bind(this);
    this.updateStart = this.update.bind(this, App.updateStep.RENDER, 'start');
    this.updateIterationData = this.updateIterationData.bind(this);
    this.updateAxiom = this.update.bind(this, App.updateStep.REWRITE, 'axiom');
    this.updateRules = this.update.bind(this, App.updateStep.REWRITE, 'rules');
    this.updateInstructions = this.update.bind(this, App.updateStep.RENDER, 'instructions');
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
    render(this.state.canvas, data.start, data.rewrittenRules, data.instructions);
    const urlHash = encodeHash.encode(data);
    const stateObj = { data: urlHash };
    history.replaceState(stateObj, 'L-Systems', `index.html${urlHash}`);
    return data;
  }

  updateStartData(data) {
    this.renderData({ ...this.state, start: data });
    this.setState({ start: data });
  }

  updateIterationData(iterations) {
    const data = this.rewriteData({ ...this.state, iterations });
    this.setState(this.renderData(data));
  }

  update(step, propName, propValue) {
    let currentStep = step;
    let newState = this.state;
    if (propName) {
      newState[propName] = propValue;
    }
    while (currentStep < this.updateMethods.length) {
      newState = this.updateMethods[currentStep](newState);
      currentStep++;
    }
    this.canvasUI.setData(newState.start);
    if (propName) {
      this.setState({ [propName]: propValue });
    } else {
      this.setState(newState);
    }
  }

  render() {
    const startProps = { data: this.state.start, update: this.updateStart };
    const iterationsProps = { data: this.state.iterations, update: this.updateIterationData };
    const axiomProps = { data: this.state.axiom, update: this.updateAxiom };
    const rulesProps = { data: this.state.rules, update: this.updateRules };
    const instructionsProps = { data: this.state.instructions, update: this.updateInstructions };
    const exampleProps = { update: this.updateExample };
    return (
      <div>
        <div id="side-bar">
          <h2>L-System Explorer</h2>
          <Start { ...startProps } />
          <Iterations { ...iterationsProps } />
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

