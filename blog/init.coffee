Entry = require './models/entry'
moment = require 'moment'
config = require 'config'
fibrous = require 'fibrous'

mongoose = require('mongoose');
mongoose.connect(config.mongoPath);

momentDate = moment()

entries = [
  {
    title: 'こんにちは世界'
    slug: 'hello_world'
    tags: ['test', 'hello']
    body: """
    ## hello

    * hello

    ### hello

    1. hello

    #### hello      
    
    > hello
    """
  }
  {
    title: 'tables'
    slug: 'tables'
    tags: ['test', 'table']
    body: """
    | Tables        | Are           | Cool  |
    | ------------- |:-------------:| -----:|
    | col 3 is      | right-aligned | $1600 |
    | col 2 is      | centered      |   $12 |
    | zebra stripes | are neat      |    $1 |
    """
  }
  {
    title: 'codes'
    slug: 'codes'
    tags: ['test', 'code']
    body: """
    ```javascript
    var s = "JavaScript syntax highlighting";
    alert(s);
    ```
     
    ```python
    s = "Python syntax highlighting"
    print s
    ```

    ```coffee
    f = (foo) -> {x, y} = foo
    {
      title: 'こんにちは世界'
      slug: 'hello_world'
      tags: ['test', 'hello']
      body: '''
      ## hello

      * hello

      ### hello

      1. hello

      #### hello      

      > hello
      '''
      created: momentDate.toDate()
    }
    ```
    """
  }
]

fibrous.run ->
  entries.map (e) ->
    entry = new Entry e
    entry.created = momentDate.subtract(1, 'day').toDate()
    entry.sync.save()

  [1...100].map (i) ->
    entry = new Entry
      title: '' + i
      slug: '' + i
      tags: ['n', 'test']
      body: 'test' + i
      created: momentDate.subtract(1, 'day').toDate()
    entry.sync.save()

  mongoose.disconnect()