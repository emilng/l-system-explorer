var React = require('react');
var data = require('./data/data.js');
var hash = require('./data/encodeHash.js');
var rewrite = require('./rewrite.js');
var ui = require('./ui.js');
var render = require('./render.js');
var StartUI = require('./ui/start.jsx');
var AxiomUI = require('./ui/axiom.jsx');
var RuleContainerUI = require('./ui/ruleContainer.jsx');
var InstructionContainerUI = require('./ui/instructionContainer.jsx');

var updateStep = 0;
var UpdateEnum = {
  DECODE: 0,
  REWRITE: 1,
  RENDER: 2
};

var setUpdateStep = function(stepNum) {
  if (stepNum < updateStep) {
    updateStep = stepNum;
  }
};

var renderStartUI = function() {
  React.render(
    <StartUI data={data.start} update={renderStartUI} />,
    document.getElementById('start')
  );
  setUpdateStep(UpdateEnum.RENDER);
};

var renderAxiomUI = function() {
  React.render(
    <AxiomUI data={data} update={renderAxiomUI} />,
    document.getElementById('axiom')
  );
  setUpdateStep(UpdateEnum.PARSE);
};

var renderRulesUI = function() {
  React.render(
    <RuleContainerUI data={data.rules} update={renderRulesUI} />,
    document.getElementById('rules')
  );
  setUpdateStep(UpdateEnum.PARSE);
};

var renderInstructionsUI = function(reset) {
  React.render(
    <InstructionContainerUI reset={reset} data={data.instructions} update={renderInstructionsUI} />,
    document.getElementById('instructions')
  );
  setUpdateStep(UpdateEnum.RENDER);
};

var canvas = document.getElementById('canvas');
var exampleCallback = function() {
  setUpdateStep(UpdateEnum.DECODE);
};
ui.initExamples(data, exampleCallback);

var decodeData = function() {
  hash.decode(data);
  renderStartUI();
  renderAxiomUI();
  renderRulesUI();
  renderInstructionsUI(true);
  ui.initCanvas(canvas, data, renderStartUI);
};

var rewriteData = function() {
  data.rewrittenRules = rewrite.multiple(data.rules, data.axiom, data.iterations);
};

var renderData = function() {
  var iterations = Math.min(data.rewrittenRules.length - 1, data.start.iterations);
  render(canvas, data.start, data.rewrittenRules[iterations], data.instructions);
  var urlHash = hash.encode(data);
  var stateObj = { data: urlHash };
  history.replaceState(stateObj, 'L-Systems', 'index.html' + urlHash);
};

var updateMethods = [decodeData, rewriteData, renderData];

var update = function() {
  while(updateStep < updateMethods.length) {
    updateMethods[updateStep]();
    updateStep++;
  }
  requestAnimationFrame(update);
};

requestAnimationFrame(update);
