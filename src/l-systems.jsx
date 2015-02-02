var React = require('react');
var encoder = require('./encoder.js');
var parser = require('./parser.js');
var ui = require('./ui.js');
var render = require('./render.js');
var StartUI = require('./ui/start.jsx');

// *** MAIN ***

var data = {
  needsDecode: true,
  needsRulesUIUpdate: true,
  needsInstructionsUIUpdate: true,
  needsParse: true,
  needsRender: true,
  selectedRule: -1,
  emptyRules: 0,
  selectedInstructions: -1,
  emptyInstructions: 0,
  replaceKey: function(obj, oldKey, newKey) {
    return Object.keys(obj).reduce(function(currentObj, key) {
      if (key === oldKey) {
        currentObj[newKey] = obj[key];
      }
      return currentObj;
    }, {});
  }
};

var canvas = document.getElementById('canvas');
var ruleTemplate = ui.getRuleTemplate();
var instructionTemplate = ui.getInstructionTemplate();
ui.initExamples(data);
ui.initRuleButtons(data);
ui.initInstructionButtons(data);

var updateRender = function() {
    var iterations = Math.min(data.parsedRules.length - 1, data.start.iterations);
    render(canvas, data.start, data.parsedRules[iterations], data.instructions);
    data.needsRender = false;
    window.location.hash = encoder.encodeHash(data);
};

var renderStartUI = function() {
  React.render(
    <StartUI
      data={data}
      update={renderStartUI}
    />,
    document.getElementById('start')
  );
};


var update = function() {
  if (data.needsDecode) {
    encoder.decodeHash(data);
    renderStartUI();
    ui.initAxiom(data);
    data.needsDecode = false;
    data.needsRulesUIUpdate = true;
    data.needsParse = true;
  }
  if (data.needsRulesUIUpdate) {
    ui.updateRulesUI(ruleTemplate, data);
    data.needsRulesUIUpdate = false;
  }
  if (data.needsInstructionsUIUpdate) {
    ui.updateInstructionsUI(instructionTemplate, data);
    data.needsInstructionsUIUpdate = false;
  }
  if (data.needsParse) {
    data.parsedRules = parser.parse(data.rules, data.axiom, data.iterations);
    data.needsParse = false;
    data.needsRender = true;
  }
  if (data.needsRender) {
    updateRender();
  }
  requestAnimationFrame(update);
};

requestAnimationFrame(update);
