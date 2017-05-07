// @flow
import { View, Dimensions, StyleSheet } from 'react-native';
import VirtualizedList from './rnUpstream/VirtualizedList'
import FlatList from './rnUpstream/FlatList'
import type { CalculatedEventDimens, StartEndEvent} from './Packer'
import React from 'react';
import _ from 'lodash';


import Packer from './Packer';
import DayView from './DayView';

const { width } = Dimensions.get('window');
const CALENDER_HEIGHT = 1024;
const LEFT_MARGIN = 50 - 1;
const VIRTUAL_ITEM_COUNT = 1000;

export default class EventCalendar extends React.Component {
    props: {
        getEventsForIndex: (data: any, index: number) => CalculatedEventDimens,
        events: StartEndEvent[]
    }

    state: {
        events: CalculatedEventDimens[]
    }

    _getItemLayout = (data: any, index: number) => (
        { length: width, offset: width * index, index }
    );

    _getItem = (data: Array<any>, index: number) => {
        return {};
    }

    _renderItem = ({index}) => {
        // return <View style={{width: WIDTH, flex: 1, backgroundColor: 'steelblue'}} />
        return <DayView events={this.props.events} width={width}/>
    }

    render() {
        return (
            <VirtualizedList
                windowSize={2}
                intialNumToRender={2}
                initialScrollIndex={VIRTUAL_ITEM_COUNT/2}
                data={['a','b','c']}
                getItemCount={() => VIRTUAL_ITEM_COUNT}
                getItem={(data, index) => data[index % 3]}
                keyExtractor={(item, index) => String(index)}
                getItemLayout={this._getItemLayout}
                horizontal
                pagingEnabled
                renderItem={this._renderItem}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
  });