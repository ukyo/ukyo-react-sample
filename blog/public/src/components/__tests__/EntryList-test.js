/** @jsx React.DOM */

jest.dontMock('../EntryList');

describe("EntryList", function() {
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var EntryList = require('../EntryList');
  var moment = require('moment');

  it("one", function() {
    var entries = {
      list: [{
        _id: 'abc',
        title: 'foo',
        slug: 'foo',
        tags: ['foo'],
        created: new Date()
      }],
      page: 1,
      hasNext: false
    };
    var Component = TestUtils.renderIntoDocument(<EntryList entries={entries}/>);
    var element = TestUtils.findRenderedDOMComponentWithClass(Component, 'entry-title');
    expect(element.getDOMNode().textContent).toEqual('foo');
    expect(element.getDOMNode().querySelector('a').getAttribute('href')).toEqual(`/entry/${moment(entries.list[0].created).format('YYYY/MM/DD')}/${entries.list[0].slug}`);
  });

  it('next', function() {
    var entries = {
      list:[],
      page: 1,
      hasNext: true
    };

    var Component = TestUtils.renderIntoDocument(<EntryList entries={entries}/>);
    var element = TestUtils.findRenderedDOMComponentWithClass(Component, 'pagination');
    expect(element.getDOMNode().querySelector('.newer')).toEqual(null);
    expect(element.getDOMNode().querySelector('.older')).toBeDefined();
    expect(element.getDOMNode().querySelector('.older a').getAttribute('href')).toEqual('?page=2');
  });

  it('prev', function() {
    var entries = {
      list:[],
      page: 2,
      hasNext: false
    };

    var Component = TestUtils.renderIntoDocument(<EntryList entries={entries}/>);
    var element = TestUtils.findRenderedDOMComponentWithClass(Component, 'pagination');
    expect(element.getDOMNode().querySelector('.newer')).toBeDefined();
    expect(element.getDOMNode().querySelector('.older')).toEqual(null);
    expect(element.getDOMNode().querySelector('.newer a').getAttribute('href')).toEqual('?page=1');
  });

  it('next prev', function() {
    var entries = {
      list:[],
      page: 2,
      hasNext: true
    };

    var Component = TestUtils.renderIntoDocument(<EntryList entries={entries}/>);
    var element = TestUtils.findRenderedDOMComponentWithClass(Component, 'pagination');
    expect(element.getDOMNode().querySelector('.newer')).toBeDefined();
    expect(element.getDOMNode().querySelector('.older')).toBeDefined();
    expect(element.getDOMNode().querySelector('.newer a').getAttribute('href')).toEqual('?page=1');
    expect(element.getDOMNode().querySelector('.older a').getAttribute('href')).toEqual('?page=3');
  });
});