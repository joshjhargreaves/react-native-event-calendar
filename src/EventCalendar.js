// @flow
import { View, Dimensions, StyleSheet } from 'react-native';
import VirtualizedList from './rnUpstream/VirtualizedList'
import FlatList from './rnUpstream/FlatList'
import type { CalculatedEventDimens } from './Packer'
import React from 'react';


import Packer from './Packer';
import DayView from './DayView';

const { width: WIDTH } = Dimensions.get('window');
const CALENDER_HEIGHT = 1024;
const LEFT_MARGIN = 50 - 1;

export default class EventCalendar extends React.Component {
    state: {
        events: CalculatedEventDimens[]
    }
    constructor() {
        super();
        let packer = new Packer(WIDTH - LEFT_MARGIN + 1);
        let events = [
            { start: 30, end: 150 },
            { start: 540, end: 600 },
            { start: 560, end: 620 },
            { start: 610, end: 670 }
        ];
        this.state = {
            events: packer.populateEvents(events)
        }
    }

    _getItemLayout = (data: any, index: number) => (
        { length: WIDTH, offset: WIDTH * index, index }
    );

    _getItem = (data: Array<any>, index: number) => {
        return null;
    }

    render() {
        return (
            <VirtualizedList
                getItemCount={() => 1e3}
                initialNumToRender={3}
                getItem={() => 1}
                keyExtractor={(item, number) => `page${number}`}
                getItemLayout={this._getItemLayout}
                horizontal
                pagingEnabled
                renderItem={() => <DayView events={this.state.events} width={WIDTH}/>}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
  });