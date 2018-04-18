import React from 'react';
import styled from 'styled-components';

import Popup from './Popup';
import Button from './Button';
import AbsoluteContainer from './AbsoluteContainer';

const ScrollToTopContainer = styled.div`
   right: 10%;
   position: fixed;
   top: 90%;
   zIndex: 1000
`;

export default class ScrollToTopButton extends React.Component {

    constructor() {
        super();
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
        this.setState({show: window.scrollY > 10});
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    };

    render() {
        return (
            <AbsoluteContainer>
                <ScrollToTopContainer>
                    {this.state && this.state.show &&
                    <Popup
                        trigger={<Button onClick={() => window.scrollTo(0, 0)} circular primary size='big'
                                         icon='arrow up'/>}
                        content='scroll.to.top'/>}
                </ScrollToTopContainer>
            </AbsoluteContainer>);
    }
}
