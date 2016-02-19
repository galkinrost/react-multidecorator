import expect from 'expect';
import expectJSX from 'expect-jsx';
import React, {Component, Children, PropTypes} from 'react';
import TestUtils from 'react-addons-test-utils';

import multidecorator from '../src/decorator';

expect.extend(expectJSX);

describe('react-multidecorator', ()=> {

    class Wrapper extends Component {
        render() {
            return this.props.children;
        }
    }

    const decorator = (Wrapped) => {
        class Decorator extends Component {
            render() {
                return (
                    <Wrapper>
                        <Wrapped/>
                    </Wrapper>
                )
            }
        }

        return Decorator;
    };

    it('should decorate component', ()=> {
        let Wrapped = () =>(
            <div/>
        );

        const Decorated = multidecorator(
            decorator
        )(Wrapped);

        const renderer = TestUtils.createRenderer();

        renderer.render(<Decorated/>);

        const result = renderer.getRenderOutput();

        expect(result)
            .toEqualJSX(
                <Wrapper>
                    <Wrapped/>
                </Wrapper>
            )
    });
});