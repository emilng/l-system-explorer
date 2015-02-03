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
  }
};

module.exports = ui;