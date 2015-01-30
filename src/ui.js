// *** UI ***
var ui = {
  appendChildren: function(element, children) {
    children.map(function(child) {
      element.appendChild(child);
    });
  },
  getInstructionTemplate: function() {
    var createElement = function(elementType, attributeNames, attributeValues) {
      var element = document.createElement(elementType);
      attributeNames.map(function(name, index) {
        element.setAttribute(name, attributeValues[index]);
      });
      return element;
    };
    var createCheckbox = function(value) {
      var checkbox = createElement('input',
        ['type', 'value'], ['checkbox', value]
      );
      return checkbox;
    };
    var createLabel = function(text, className) {
      var label = document.createElement('label');
      if (className !== undefined) {
        label.setAttribute('class', className);
      }
      label.innerHTML = text;
      return label;
    };
    var createRadio = function(className, value) {
      return createElement('input',
        ['class',   'type', 'value'],
        [className, 'radio', value]
      );
    };
    //rule, distance, angle, branch
    var ruleLabel = createLabel('Rule:');
    var rule = document.createElement('input');
    rule.setAttribute('class', 'rule-input');
    var distanceCheckLabel = createLabel('distance','check-label');
    var distanceCheck = createCheckbox('distance');
    var angleCheckLabel = createLabel('angle','check-label');
    var angleCheck = createCheckbox('angle');
    var branchCheckLabel = createLabel('branch','check-label');
    var branchCheck = createCheckbox('branch');
    var checkContainer = createElement('div',['class'],['check-container']);
    this.appendChildren(checkContainer,
      [distanceCheckLabel, distanceCheck,
      angleCheckLabel, angleCheck, branchCheckLabel, branchCheck]);
    var distanceLabel = createLabel('distance:','distance-label');
    var distance = createElement('input',
      ['class',         'type', 'min','max','step','value'],
      ['distance-input','range','0.1','20', '0.1', '4']
    );
    var angleLabel = createLabel('angle:','angle-label');
    var angle = createElement('input',
      ['class',      'type', 'min', 'max','step','value'],
      ['angle-input','range','-360','360','1',   '0']
    );
    var branchPushLabel = createLabel('push');
    var branchPush = createRadio('branchPush-input', 'push');
    var branchPopLabel = createLabel('pop');
    var branchPop = createRadio('branchPop-input', 'pop');
    var branchLabel = createLabel('branch:','branch-label');
    var branchContainer = document.createElement('div');
    branchContainer.setAttribute('class', 'branch-container');
    this.appendChildren(branchContainer,
      [branchPushLabel, branchPush, branchPopLabel, branchPop]
    );
    var instructionContainer = document.createElement('div');
    instructionContainer.setAttribute('class', 'instruction-container');
    this.appendChildren(instructionContainer,
      [ruleLabel, rule, checkContainer, distanceLabel, distance,
      angleLabel, angle, branchLabel, branchContainer]
    );
    return instructionContainer;
  },
  getRuleTemplate: function() {
    var getLabel = function(className, labelText) {
      var label = document.createElement('label');
      label.setAttribute('class', className);
      label.innerHTML = labelText;
      return label;
    };
    var getLabeledInput = function(className, labelText) {
      var fragment = document.createDocumentFragment();
      var label = getLabel(className + '-label', labelText);
      var input = document.createElement('input');
      input.setAttribute('class', className + '-input');
      fragment.appendChild(label);
      fragment.appendChild(input);
      return fragment;
    };
    var indicator = getLabel('inactive-indicator', '&bullet;');
    var rule = getLabeledInput('rule','rule:');
    var transform = getLabeledInput('transform','->');
    var ruleContainer = document.createElement('div');
    ruleContainer.setAttribute('class', 'rule-container');
    this.appendChildren(ruleContainer, [indicator, rule, transform]);
    return ruleContainer;
  },
  initAxiom: function(data) {
    var axiomInput = document.getElementById('axiom');
    axiomInput.value = data.axiom.join('');
    axiomInput.addEventListener('input', function(event) {
      data.axiom = event.currentTarget.value.split('');
      data.needsParse = true;
    });
  },
  initRuleButtons: function(data) {
    var addRule = document.getElementById('add-rule');
    addRule.addEventListener('click', function() {
      data.emptyRules += 1;
      var keys = Object.keys(data.rules);
      data.selectedRule = (keys.length - 1) + data.emptyRules;
      data.needsRulesUIUpdate = true;
    });
    var removeRule = document.getElementById('remove-rule');
    removeRule.addEventListener('click', function() {
      if (data.emptyRules > 0) {
        data.emptyRules -= 1;
      } else {
        var keys = Object.keys(data.rules);
        var ruleCount = Math.max(keys.length - 1, 0);
        var newRules = {};
        while(ruleCount--) {
          var key = keys[ruleCount];
          newRules[key] = data.rules[key];
        }
        data.rules = newRules;
      }
      data.selectedRule = (Object.keys(data.rules).length - 1) + data.emptyRules;
      data.needsRulesUIUpdate = true;
    });
  },
  initInstructionButtons: function(data) {
    var addInstruction = document.getElementById('add-instruction');
    addInstruction.addEventListener('click', function() {
      data.emptyInstructions += 1;
      var keys = Object.keys(data.instructions);
      data.selectedInstructions = (keys.length - 1) + data.emptyInstructions;
      data.needsInstructionsUIUpdate = true;
    });
    var removeInstruction = document.getElementById('remove-instruction');
    removeInstruction.addEventListener('click', function() {
      if (data.emptyInstructions > 0) {
        data.emptyInstructions -= 1;
      } else {
        var keys = Object.keys(data.instructions);
        var instructionCount = Math.max(keys.length - 1, 0);
        var newInstructions = {};
        while(instructionCount--) {
          var key = keys[instructionCount];
          newInstructions[key] = data.instructions[key];
        }
        data.instructions = newInstructions;
      }
      var lastInstructionIndex = Object.keys(data.instructions).length - 1;
      data.selectedInstructions = lastInstructionIndex + data.emptyInstructions;
      data.needsInstructionsUIUpdate = true;
    });
  },
  updateRulesUI: function(ruleTemplate, data) {
    var container = document.getElementById('rules-container');
    var keys = Object.keys(data.rules);
    var ruleElementsToAdd = (keys.length + data.emptyRules) - container.children.length;
    var ruleElement;
    var ruleCount = container.children.length;
    if (ruleElementsToAdd > 0) {
      while(ruleElementsToAdd--) {
        ruleElement = ruleTemplate.cloneNode(true);
        container.appendChild(ruleElement);
      }
    } else {
      var elementsToRemove = -ruleElementsToAdd;
      while(elementsToRemove--) {
        container.removeChild(container.lastElementChild);
      }
    }
    if (container.children.length !== ruleCount) {
      data.needsParse = true;
    }
    Array.prototype.map.call(container.children, function(ruleElement, index) {
      var indicator = ruleElement.children[0];
      if (index < keys.length) {
        var key = keys[index];
        indicator.setAttribute('class', 'active-indicator');

        var ruleInput = ruleElement.querySelector('.rule-input');
        ruleInput.value = key;
        ruleInput.addEventListener('input', function(event) {
          var newKey = event.currentTarget.value;
          if (newKey.length > 0) {
            newKey = newKey[0];
            if (!keys.hasOwnProperty(newKey)) {
              data.rules = data.replaceKey(data.rules, key, newKey);
              data.needsParse = true;
            }
          }
        });
        var ruleTransform = ruleElement.querySelector('.transform-input');
        ruleTransform.value = data.rules[key].join('');
        ruleTransform.addEventListener('input', function(event) {
          data.rules[key] = event.currentTarget.value.split('');
          data.needsParse = true;
        });
      } else {
        indicator.setAttribute('class', 'inactive-indicator');
      }
      if (index === data.selectedRule) {
        ruleElement.setAttribute('class', 'selected-rule-container');
      } else {
        ruleElement.setAttribute('class', 'rule-container');
      }
      ruleElement.addEventListener('click', function() {
        data.selectedRule = index;
        data.needsRulesUIUpdate = true;
      });
    });
  },
  updateInstructionsUI: function(instructionTemplate, data) {
    var container = document.getElementById('instructions-container');
    var keys = Object.keys(data.instructions);
    var instructionElementsToAdd = (keys.length + data.emptyInstructions) - container.children.length;
    var instructionElement;
    if (instructionElementsToAdd > 0) {
      while(instructionElementsToAdd--) {
        instructionElement = instructionTemplate.cloneNode(true);
        container.appendChild(instructionElement);
      }
    } else {
      var elementsToRemove = -instructionElementsToAdd;
      while(elementsToRemove--) {
        container.removeChild(container.lastElementChild);
      }
    }
    Array.prototype.map.call(container.children, function(instructionElement, index) {
      var ruleInput = instructionElement.querySelector('.rule-input');
      var checkboxes = instructionElement.querySelectorAll('input[type="checkbox"]');
      Array.prototype.map.call(checkboxes, function(checkbox) {
        checkbox.setAttribute('name', 'instruction-checkbox-' + index);
      });
      var radios = instructionElement.querySelectorAll('input[type="radio"]');
      Array.prototype.map.call(radios, function(radio) {
        radio.setAttribute('name', 'instruction-radio-' + index);
      });
      var distanceCheck = checkboxes[0];
      var angleCheck = checkboxes[1];
      var branchCheck = checkboxes[2];
      var distanceLabel = instructionElement.querySelector('.distance-label');
      var distanceInput = instructionElement.querySelector('.distance-input');
      var angleLabel = instructionElement.querySelector('.angle-label');
      var angleInput = instructionElement.querySelector('.angle-input');
      var branchLabel = instructionElement.querySelector('.branch-label');
      var branchContainer = instructionElement.querySelector('.branch-container');
      var showDistance = function(state) {
        distanceLabel.style.display = (state) ? 'inline': 'none';
        distanceInput.style.display = (state) ? 'inline': 'none';
        distanceCheck.checked = state;
      };
      var showAngle = function(state) {
        angleLabel.style.display = (state) ? 'inline': 'none';
        angleInput.style.display = (state) ? 'inline': 'none';
        angleCheck.checked = state;
      };
      var showBranch = function(state) {
        branchLabel.style.display = (state) ? 'inline': 'none';
        branchContainer.style.display = (state) ? 'inline': 'none';
        branchCheck.checked = state;
      };
      distanceCheck.addEventListener('change', function(event) {
        showDistance(event.currentTarget.checked);
      });
      angleCheck.addEventListener('change', function(event) {
        showAngle(event.currentTarget.checked);
      });
      branchCheck.addEventListener('change', function(event) {
        showBranch(event.currentTarget.checked);
      });
      distanceInput.addEventListener('input', function(event) {
        // data.needsRender = true;
      });
      if (index < keys.length) {
        var ruleValue = keys[index];
        ruleInput.value = ruleValue;
        var instruction = data.instructions[ruleValue];
        showDistance(instruction.hasOwnProperty('distance'));
        showAngle(instruction.hasOwnProperty('angle'));
        showBranch(instruction.hasOwnProperty('branch'));
      } else {

      }
    });
  },
  initExamples: function(data) {
    var exampleCollection = document.getElementsByClassName('example');
    var i = exampleCollection.length;
    var examples = [];
    while(i--) {
      exampleCollection[i].addEventListener("click", function(event) {
        window.location.hash = event.target.hash;
        data.needsDecode = true;
      });
    }
  },
  initStart: function (data) {
    var startContainer = document.getElementById('start');
    Array.prototype.map.call(startContainer.children, function(input) {
      var splitInput = input.id.split('-');
      var inputType = splitInput[0];
      if (inputType === 'initial') {
        var param = splitInput[1];
        input.value = data.start[param];
        input.addEventListener('input', function(event) {
          data.start[param] = parseInt(event.currentTarget.value);
          data.needsRender = true;
        });
      }
    });
  }
};

module.exports = ui;