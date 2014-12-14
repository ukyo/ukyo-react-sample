/** @jsx React.DOM */

jest.dontMock('../Link');

describe("Link", function() {
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var Link = require('../Link');

  it("empty", function() {
    var Component = TestUtils.renderIntoDocument(<Link></Link>);
    var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'a');
    expect(element).toBeDefined();

    expect(element.getDOMNode().textContent).toEqual('');
    expect(element.getDOMNode().getAttribute('href')).toEqual('');
  });

  it("to", function() {
    var Component = TestUtils.renderIntoDocument(<Link to={'foo'}></Link>);
    var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'a');
    expect(element).toBeDefined();
    expect(element.getDOMNode().getAttribute('href')).toEqual('foo');
  });

  it("children", function() {
    var Component = TestUtils.renderIntoDocument(<Link>foo</Link>);
    var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'a');
    expect(element).toBeDefined();
    expect(element.getDOMNode().textContent).toEqual('foo');
  });

  it("query", function() {
    var Component = TestUtils.renderIntoDocument(<Link to={'foo'} query={{'bar': 'baz'}}></Link>);
    var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'a');
    expect(element).toBeDefined();
    expect(element.getDOMNode().getAttribute('href')).toEqual('foo?bar=baz');
  });
});