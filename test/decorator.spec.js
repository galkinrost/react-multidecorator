import expect from 'expect';
import React, {Component} from 'react';
import TestUtils from 'react-addons-test-utils';

import multidecorator from '../src/decorator';

describe('react-multidecorator', ()=> {

    class Wrapper extends Component {
        render() {
            return this.props.children;
        }
    }

    const decorator = (order) =>
        (Wrapped) => {
            class Decorator extends Component {
                render() {
                    return (
                        <Wrapper order={order}>
                            <Wrapped/>
                        </Wrapper>
                    )
                }
            }

            return Decorator;
        };

    it('should decorate component with multiple decorators in right order', ()=> {
        let Wrapped = () =>(
            <div/>
        );

        const Decorated = multidecorator(
            decorator(0),
            decorator(1),
            decorator(2)
        )(Wrapped);

        const tree = TestUtils.renderIntoDocument(
            <Decorated/>
        )

        const elements = TestUtils.scryRenderedComponentsWithType(tree, Wrapper);

        expect(elements.length).toEqual(3);

        elements.forEach((element, i)=>
            expect(element.props.order).toEqual(i)
        );
    });
});