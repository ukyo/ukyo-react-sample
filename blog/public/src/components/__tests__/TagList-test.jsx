/** @jsx React.DOM */

jest.dontMock('../TagList');

describe("TagList", function() {
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var TagList = require('../TagList');

  it("test", function() {
    var Component = TestUtils.renderIntoDocument(<TagList list={['foo', 'bar']}/>);
    var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'div');
    expect(element).toBeDefined();

    var tags = element.getDOMNode().querySelectorAll('a');
    expect(element).toBeDefined();

    expect(tags[0].getAttribute('href')).toEqual('/tags/foo');
    expect(tags[1].getAttribute('href')).toEqual('/tags/bar');
  });
});