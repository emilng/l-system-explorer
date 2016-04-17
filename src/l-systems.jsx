const React = require('react');
const ReactDOM = require('react-dom');
const encodeHash = require('./data/encodeHash.js');
const rewrite = require('./rewrite.js');
const ui = require('./ui.js');
const render = require('./render.js');
const StartUI = require('./ui/start.jsx');
const AxiomUI = require('./ui/axiom.jsx');
const RuleContainerUI = require('./ui/ruleContainer.jsx');
const InstructionContainerUI = require('./ui/instructionContainer.jsx');

const UpdateEnum = {
  DECODE: 0,
  REWRITE: 1,
  RENDER: 2,
};
const canvas = document.getElementById('canvas');
const updateMethods = [decodeData, rewriteData, renderData];

let data = require('./data/data.js');
let updateStep = 0;

function setUpdateStep(stepNum) {
  if (stepNum < updateStep) {
    updateStep = stepNum;
  }
}

function renderStartUI() {
  ReactDOM.render(
    <StartUI data={data.start} update={renderStartUI} />,
    document.getElementById('start')
  );
  setUpdateStep(UpdateEnum.RENDER);
}

function renderAxiomUI() {
  ReactDOM.render(
    <AxiomUI data={data} update={renderAxiomUI} />,
    document.getElementById('axiom')
  );
  setUpdateStep(UpdateEnum.REWRITE);
}

function renderRulesUI() {
  ReactDOM.render(
    <RuleContainerUI data={data.rules} update={renderRulesUI} />,
    document.getElementById('rules')
  );
  setUpdateStep(UpdateEnum.REWRITE);
}

function renderInstructionsUI(reset) {
  ReactDOM.render(
    <InstructionContainerUI reset={reset} data={data.instructions} update={renderInstructionsUI} />,
    document.getElementById('instructions')
  );
  setUpdateStep(UpdateEnum.RENDER);
}


function exampleCallback() {
  setUpdateStep(UpdateEnum.DECODE);
}
ui.initExamples(data, exampleCallback);

function decodeData() {
  let hash = window.location.hash.substr(1);
  // hardcoded default for now if nothing is set
  if (hash === '') {
    hash = 'F/F:F+F-F-F+F/F,d3.5;+,a75;-,a-80/6/x347,y358,a70,i6,z100';
  }
  data = encodeHash.decode(hash);
  renderStartUI();
  renderAxiomUI();
  renderRulesUI();
  renderInstructionsUI(true);
  ui.initCanvas(canvas, data, renderStartUI);
}

function rewriteData() {
  data.rewrittenRules = rewrite.write(data.rules, data.axiom, data.iterations);
}

function renderData() {
  const iterations = Math.min(data.rewrittenRules.length - 1, data.start.iterations);
  render(canvas, data.start, data.rewrittenRules[iterations], data.instructions);
  const urlHash = encodeHash.encode(data);
  const stateObj = { data: urlHash };
  history.replaceState(stateObj, 'L-Systems', `index.html${urlHash}`);
}

function update() {
  while (updateStep < updateMethods.length) {
    updateMethods[updateStep]();
    updateStep++;
  }
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
