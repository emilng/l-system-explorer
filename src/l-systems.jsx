var React = require('react');
var encoder = require('./encoder.js');
var parser = require('./parser.js');
var ui = require('./ui.js');
var render = require('./render.js');
var StartUI = require('./ui/start.jsx');
var AxiomUI = require('./ui/axiom.jsx');
var RuleContainerUI = require('./ui/ruleContainer.jsx');
var InstructionContainerUI = require('./ui/instructionContainer.jsx');

var data = {
  needsDecode: true,
  needsParse: true,
  needsRender: true
};

var renderStartUI = function() {
  React.render(
    <StartUI data={data} update={renderStartUI} />,
    document.getElementById('start')
  );
};

var renderAxiomUI = function() {
  React.render(
    <AxiomUI data={data} update={renderAxiomUI} />,
    document.getElementById('axiom')
  );
};

var renderRulesUI = function() {
  React.render(
    <RuleContainerUI data={data} update={renderRulesUI} />,
    document.getElementById('rules')
  );
};

var renderInstructionsUI = function() {
  React.render(
    <InstructionContainerUI data={data} update={renderInstructionsUI} />,
    document.getElementById('instructions')
  );
};

var canvas = document.getElementById('canvas');
ui.initExamples(data);

var update = function() {
  if (data.needsDecode) {
    encoder.decodeHash(data);
    renderStartUI();
    renderAxiomUI();
    renderRulesUI();
    renderInstructionsUI();
    ui.initCanvas(canvas, data, renderStartUI);
    data.needsDecode = false;
    data.needsParse = true;
  }
  if (data.needsParse) {
    data.parsedRules = parser.parse(data.rules, data.axiom, data.iterations);
    data.needsParse = false;
    data.needsRender = true;
  }
  if (data.needsRender) {
    var iterations = Math.min(data.parsedRules.length - 1, data.start.iterations);
    render(canvas, data.start, data.parsedRules[iterations], data.instructions);
    data.needsRender = false;
    var urlHash = encoder.encodeHash(data);
    var stateObj = { data: urlHash };
    history.replaceState(stateObj, 'L-Systems', 'index.html' + urlHash);
  }
  requestAnimationFrame(update);
};

requestAnimationFrame(update);
