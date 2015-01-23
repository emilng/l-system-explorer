// *** DATA ***
/*
  decode / encode  data to URL hash

  hash is split into the following sections delimited by '/'
  1. axiom
    example: F[A]
    chars: [A-Z]\[\]
  2. rules
    example: F:F+[F-FF]F+
    chars: [A-Z]\[\]\:\+\-
  3. instructions - delimited by ';' then split into parameters: distance(d), angle(a), branch(b):0,1 (push,pop)
    example: F,d10,a25,p0;A,d5,a10,p1
    chars: [0-9],\.dap
  4. iterations - max number of iterations
    example: 3
    chars: [0-9]
  5. starting drawing values - delimited by ',' : x, y, angle, iteration to display
    example: x500,y300,a10,i5
    chars: [0-9]xyamwh
*/
var encoder = {
  decodeHash: function (data) {
    var hash = window.location.hash.substr(1);
    //hardcoded default for now if nothing is set
    if (hash === '') {
      hash = 'F/F:F+F-F-F+F/F,d3.5;+,a75;-,a-80/6/x347,y358,a70,i6';
    }
    var dataStrings = hash.split('/');
    var axiomString = dataStrings[0];
    var rulesString = dataStrings[1];
    var instructionsString = dataStrings[2];
    var iterations = dataStrings[3];
    var startString = dataStrings[4];

    data.axiom = axiomString.split('');
    data.rules = this.decodeRules(rulesString);
    data.instructions = this.decodeInstructions(instructionsString);
    data.iterations = iterations;
    data.start = this.decodeStart(startString);
  },
  decodeRules: function (rulesString) {
    var rulesList = rulesString.split(',');
    return rulesList.reduce(function (rules, ruleString) {
      var splitRule = ruleString.split(':');
      var predecessor = splitRule[0];
      var successor = splitRule[1].split('');
      rules[predecessor] = successor;

      return rules;
    }, {});
  },
  decodeInstructions: function (instructionsString) {
    var instructionsList = instructionsString.split(';');
    return instructionsList.reduce(function (instructions, instructionParamString) {
      var instructionParams = instructionParamString.split(',');
      var instructionName = instructionParams.shift();

      // decode instruction params
      instructions[instructionName] = instructionParams.reduce(function (params, paramString) {
        var keyChar = paramString[0];
        var keyLookup = {
          'd':'distance',
          'a':'angle',
          'b':'branch'
        };
        var key = keyLookup[keyChar];
        var value = parseFloat(paramString.substr(1));
        params[key] = value;
        return params;
      }, {});

      return instructions;
    }, {});
  },
  decodeStart: function (startString) {
    var startList = startString.split(',');
    return startList.reduce(function (params, paramString) {
      var keyChar = paramString[0];
      var keyLookup = {
        'x':'x',
        'y':'y',
        'a':'angle',
        'i':'iterations'
      };
      var key = keyLookup[keyChar];
      var value = parseFloat(paramString.substr(1));
      params[key] = value;
      return params;
    }, {});
  },
  encodeHash: function (data) {
    var axiom = data.axiom.join('');
    var rules = this.encodeRules(data.rules);
    var instructions = this.encodeInstructions(data.instructions);
    var iterations = data.iterations;
    var start = this.encodeStart(data.start);
    return '#' +
        [axiom,
         rules,
         instructions,
         iterations,
         start].join('/');
  },
  encodeRules: function (rules) {
    var keys = Object.keys(rules);
    var ruleList = keys.reduce(function(ruleList, rule) {
      ruleList.push(rule + ':' + rules[rule].join(''));
      return ruleList;
    }, []);
    return ruleList.join(',');
  },
  encodeInstructions: function(instructions) {
    var instructionKeys = Object.keys(instructions);
    var instructionList = instructionKeys.reduce(function(instructionList, instructionKey) {
      var instructionObj = instructions[instructionKey];
      var paramKeys = Object.keys(instructionObj);
      var paramLookup = {
          'distance':'d',
          'angle':'a',
          'branch':'b'
      };
      var paramString = paramKeys.reduce(function(paramString, paramKey) {
        return paramString + ',' + paramLookup[paramKey] + instructionObj[paramKey];
      }, '');
      instructionList.push(instructionKey + paramString);
      return instructionList;
    }, []);
    return instructionList.join(';');
  },
  encodeStart: function(start) {
    var startKeys = Object.keys(start);
    var keyLookup = {
      'angle':'a',
      'x':'x',
      'y':'y',
      'iterations':'i'
    };
    var startList = startKeys.reduce(function(startList, paramKey) {
      var startString = keyLookup[paramKey] + start[paramKey];
      startList.push(startString);
      return startList;
    }, []);
    return startList.join(',');
  }
};

// *** PARSING ***
var parseRules = function (rules, axiom, max_iter) {
  var generatedOutput = [axiom];
  var input = axiom;
  for (var i = 0; i < max_iter; i++) {
    var generated = input.reduce(function(output, char) {
      var result = (rules[char] !== undefined) ? rules[char] : char;
      return output.concat(result);
    }, []);
    generatedOutput.push(generated);
    input = generated.concat();
  }
  return generatedOutput;
};

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
    var createLabel = function(text) {
      var label = document.createElement('label');
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
    var distanceLabel = createLabel('Distance:');
    var distance = createElement('input',
      ['class',         'type', 'min','max','step','value'],
      ['distance-input','range','0.1','20', '0.1', '4']
    );
    var angleLabel = createLabel('Angle:');
    var angle = createElement('input',
      ['class',      'type', 'min', 'max','step','value'],
      ['angle-input','range','-360','360','1',   '0']
    );
    var branchNoneLabel = createLabel('none');
    var branchNone = createRadio('branchNone-input', '');
    var branchPushLabel = createLabel('push');
    var branchPush = createRadio('branchPush-input', 'push');
    var branchPopLabel = createLabel('pop');
    var branchPop = createRadio('branchPop-input', 'pop');
    var branchLabel = createLabel('Branch:');
    var branchContainer = document.createElement('div');
    branchContainer.setAttribute('class', 'branch-container');
    this.appendChildren(branchContainer,
      [branchNoneLabel, branchNone, branchPushLabel,
      branchPush, branchPopLabel, branchPop]
    );
    var instructionContainer = document.createElement('div');
    instructionContainer.setAttribute('class', 'instruction-container');
    this.appendChildren(instructionContainer,
      [ruleLabel, rule, distanceLabel, distance,
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
    console.log('updateInstructionsUI');
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

// *** RENDERING ***
var render = function (canvas, start, rules, instructions) {
  var ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var x = start.x;
  var y = start.y;
  var angle = start.angle;
  var stack = [];
  var forward = 5;
  var radians = Math.PI/180;
  ctx.moveTo(x,y);
  ctx.beginPath();
  for (var i = 0, len = rules.length; i < len; i++) {
    var rule = rules[i];
    if (instructions.hasOwnProperty(rule)) {
      var instruction = instructions[rule];
      if (instruction.hasOwnProperty('angle')) {
        angle += instruction.angle;
      }
      if (instruction.hasOwnProperty('distance')) {
        forward = instruction.distance;
        x += Math.cos(angle * radians) * forward;
        y += Math.sin(angle * radians) * forward;
        ctx.lineTo(x, y);
      }
      if (instruction.hasOwnProperty('branch')) {
        if (instruction.branch === 0) {
          stack.push({angle: angle, x: x, y: y});
        } else if (instruction.branch === 1) {
          if (stack.length > 0) {
            var settings = stack.pop();
            angle = settings.angle;
            x = settings.x;
            y = settings.y;
            ctx.moveTo(x, y);
          }
        }
      }
    }
  }
  ctx.stroke();
  ctx.closePath();
};

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

var update = function() {
  if (data.needsDecode) {
    encoder.decodeHash(data);
    ui.initStart(data);
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
    data.parsedRules = parseRules(data.rules, data.axiom, data.iterations);
    data.needsParse = false;
    data.needsRender = true;
  }
  if (data.needsRender) {
    var iterations = Math.min(data.parsedRules.length - 1, data.start.iterations);
    render(canvas, data.start, data.parsedRules[iterations], data.instructions);
    data.needsRender = false;
    window.location.hash = encoder.encodeHash(data);
  }
  requestAnimationFrame(update);
};

requestAnimationFrame(update);
