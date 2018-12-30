import React, { Component } from 'react';

class Examples extends Component {
  constructor(props) {
    super(props);
    this.renderExample = this.renderExample.bind(this);
    this.state = {
      data: [
        {
          name: 'Default',
          hash: 'F/F:F+F-F-F+F/F,d3.5;+,a75;-,a-80/6/x347,y358,a70,i6,z100',
        },
        {
          name: 'Koch Curve',
          hash: 'F/F:F+F-F-F+F/F,d3.3;+,a60;-,a-60/4/x853,y276,a180,i4,z100',
        },
        {
          name: 'Sierpinksi Triangle',
          hash: 'F-G-F/F:F-G+F+G-F,G:GG/F,d8;G,d8;+,a120;-,a-120/6/x41,y465,a0,i6,z100',
        },
        {
          name: 'Dragon Curve',
          hash: 'FX/X:X+YF+,Y:-FX-Y/F,d8;+,a90;-,a-90/11/x253,y391,a-194,i11,z100',
        },
        {
          name: 'Fractal Plant',
          hash: 'X/X:F-[[X]+X]+F[+FX]-X,F:FF/F,d4;+,a25;-,a-25;[,b0;],b1/6/x135,y638,a-76,i6,z100',
        },
        {
          name: 'Fractal Plant 2',
          hash: 'XL/X:F-[[U]+X]P+F[+FXL]-X,F:FF,L:X-UXPL/F,d-2.3;+,a25;-,a-17.5;[,b0;],b1;U,d-1.9,b0,a-1.5;P,b1,d-0.1;L,d-5,a38.5/6/x442,y520,a95,i6,z100',
        },
      ],
    }
  }

  updateHash(hash) {
    window.history.replaceState({ data: hash }, 'L-Systems', `index.html#${hash}`);
    this.props.update();
  }

  renderExample({ hash, name }, index) {
    return (
      <li key={index}>
        <a
          className="example"
          href={`#${hash}`}
          onClick={this.updateHash.bind(this, hash)}
        >{name}</a>
      </li>
    );
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div id="examples" className="side-section">
        <h4>Examples</h4>
        <ul>
          {this.state.data.map(this.renderExample)}
        </ul>
      </div>
    )
  }
}

export default Examples;