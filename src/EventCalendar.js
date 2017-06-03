// @flow
import { View, Dimensions, StyleSheet, ScrollView} from 'react-native';
import VirtualizedList from './rnUpstream/VirtualizedList'
import FlatList from './rnUpstream/FlatList'
import type { CalculatedEventDimens, StartEndEvent} from './Packer'
import type { DayViewStyle } from './style';
import React from 'react';
import _ from 'lodash';
import styleConstructor, { DayViewStyleProps } from './style'

import Packer from './Packer';
import DayView from './DayView';

const CALENDER_HEIGHT = 1024;
const LEFT_MARGIN = 50 - 1;
const VIRTUAL_ITEM_COUNT = 1000;

type Props = {
    getItem: (data: any, index: number) => StartEndEvent[],
    events: any,
    eventTapped: (event: StartEndEvent) => void,
    width: number,
    theme?: DayViewStyleProps
}

export default class EventCalendar extends React.Component<void, Props, void> {
    styles: DayViewStyle
    constructor(props: Props) {
        super(props);
        this.styles = styleConstructor(props.theme);
    }

    _getItemLayout = (data: any, index: number) => {
        const { width } = this.props;
        return { length: width, offset: width * index, index }
    };

    _getItem = (data: Array<any>, index: number) => {
        return {};
    }

    _renderItem = ({index}) => {
        const events = this.props.getItem(this.props.events, index - VIRTUAL_ITEM_COUNT/2);
        const {width} = this.props;
        return <DayView eventTapped={this.props.eventTapped} events={events} width={width} styles={this.styles}/>
    }

    _getItem = ((data, index) => {
        return -1;
    })

    render() {
        const {width} = this.props;
        return (
            <ScrollView>
                <VirtualizedList
                    windowSize={2}
                    initialNumToRender={2}
                    initialScrollIndex={VIRTUAL_ITEM_COUNT/2}
                    data={['a','b','c']}
                    getItemCount={() => VIRTUAL_ITEM_COUNT}
                    getItem={this._getItem}
                    keyExtractor={(item, index) => String(index)}
                    getItemLayout={this._getItemLayout}
                    horizontal
                    pagingEnabled
                    renderItem={this._renderItem}
                    style={{width: width}}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});