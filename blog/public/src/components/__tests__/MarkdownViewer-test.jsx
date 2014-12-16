/** @jsx React.DOM */

jest.dontMock('../MarkdownViewer');

var text = `
# h1

* list

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | \$1600 |
| col 2 is      | centered      |   \$12 |
| zebra stripes | are neat      |    \$1 |

\`\`\`javascript
var a = 1;
\`\`\`
`;

describe("MarkdownViewer", function() {
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var MarkdownViewer = require('../MarkdownViewer');

  it("test", function() {

    var Component = TestUtils.renderIntoDocument(<MarkdownViewer text={text}/>);
    var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'div');
    expect(element).toBeDefined();

    var h1 = element.getDOMNode().querySelector('h1');
    expect(h1).toBeDefined();
    expect(h1.textContent).toEqual('h1');

    var list = element.getDOMNode().querySelector('list');
    expect(list).toBeDefined();

    var table = element.getDOMNode().querySelector('table');
    expect(table).toBeDefined();

    var pre = element.getDOMNode().querySelector('pre');
    expect(pre).toBeDefined();
    expect(pre.querySelector('.hljs')).toBeDefined();
  });
});