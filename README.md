# React multidecorator

Combine decorators for stateless components

## Installation

```bash
npm install --save react-multidecorator
```

## Problem 

If you want decorate regular class it's ok

```javascript
@connect(...)
@anotherDecorator
class Wrapped extends Component {
...
}
```

But with stateless Component there is a problem
```javascript
let WrappedComponent = (...)

WrappedComponent = anotherDecorator(WrappedComponent)
WrappedComponent = connect(...)(WrappedComponent)
```

Instead that use multidecorator

```javascript
let WrappedComponent = (...)

multidecorator(
    connect(...),
    anotherDecorator
)(WrappedComponent)
```

## Example

```javascript
import React from 'react'
import multidecorator from 'react-multidecorator'
import {connect} from 'react-redux'
import {componentWillMount} from 'react-lifecycle-decorators'
import {bindActionCreators} from 'redux'
import {fetchData} from './actions'

const WrappedComponent = (...)

export default multidectorator(
    connect(undefined, ( dispatch )=>({
        fetchData: bindActionCreators( fetchData, dispatch )
    }),
    componentWillMount( props => props.fetchData() )
)(WrappedComponent)

```