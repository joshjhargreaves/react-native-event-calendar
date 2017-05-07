// @flow
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import type { CalculatedEventDimens, StartEndEvent} from './Packer'
import React from 'react';
import _ from 'lodash';

import Packer from './Packer'

const LEFT_MARGIN = 50 - 1;
const CALENDER_HEIGHT = 1024;
const EVENT_TITLE_HEIGHT = 15;
const TEXT_LINE_HEIGHT = 17;
const MIN_EVENT_TITLE_WIDTH = 20;
const EVENT_PADDING_LEFT = 4;

export default class DayView extends React.PureComponent {
    props: {
        events: StartEndEvent[],
        width: number
    }

    _renderLines = () => {
        const offset = CALENDER_HEIGHT / 24;
        return _.range(0, 25).map((item, i) => {
            let timeText;
            if (i == 0) {
                timeText = `12 AM`;
            } else if (i < 12) {
                timeText = `${i} AM`;
            } else if (i > 12) {
                timeText = `${i - 12} PM`;
            } else {
                timeText = 'Noon';
            }
            const { width } = this.props;
            return (
                [<Text key={`timeLabel${i}`} style={[styles.timeLabel, { top: (offset * i) - 6}]}>{timeText}</Text>,
                <View key={`line${i}`} style={[styles.line, { top: offset * i, width: width - 20}]} />]
            )
        });
    }

    _renderTimeLabels() {
        const offset = 1000 / 24;
        return _.range(0, 24).map((item, i) => {
            return <View key={`line${i}`} style={[styles.line, { top: offset * i }]} />
        });
    }

    _renderEvents() {
        let packer = new Packer(this.props.width - LEFT_MARGIN + 1);
        const packedEvents = packer.populateEvents(this.props.events);
        
        return packedEvents.map((event, i) => {
            const style = {
                left: event.left + LEFT_MARGIN,
                height: event.height,
                width: event.width,
                top: event.top,
            }

            // Fixing the number of lines for the event title makes this calculation easier. 
            // However it would make sense to overflow the title to a new line if needed
            const numberOfLines = Math.floor(event.height / TEXT_LINE_HEIGHT);

            return (
                <View key={i} style={[styles.event, style]} >
                    <Text numberOfLines={1} style={styles.eventTitle}>Event Title</Text>
                    { numberOfLines > 1 ? 
                        <Text numberOfLines={numberOfLines-1} style={[styles.eventSummary]}>London bridge station. Longer amounts of text. More text</Text> : null}
                </View>
            )
        });
    }

    render() {
        return (
            <ScrollView style={{width: this.props.width}}>
                <View style={[styles.container, {width: this.props.width}]}>
                    {this._renderLines()}
                    {this._renderEvents()}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        height: CALENDER_HEIGHT + 10,
        marginTop: 20,
    },
    event: {
        position: 'absolute',
        backgroundColor: 'rgb(19,122,209)',
        // backgroundColor: 'mediumpurple',
        opacity: 0.8,
        borderColor: 'rgb(22,88,176)',
        // borderColor: 'rebeccapurple',
        borderLeftWidth: 3,
        borderRadius: 1,
        paddingLeft: EVENT_PADDING_LEFT,
        minHeight: 25,
        flex: 1,
        paddingTop: 5,
        paddingBottom: 0,
        flexDirection: 'column',
        alignItems: 'flex-start',
        overflow: 'hidden',
    },
    eventTitle: {
        color: 'white',
        fontWeight: '600',
        minHeight: 15,
    },
    eventSummary: {
        color: 'white',
        flexWrap: 'wrap'
    },
    line: {
        height: 1,
        position: 'absolute',
        left: LEFT_MARGIN,
        backgroundColor: 'rgb(216,216,216)'
    },
    timeLabel: {
        position: 'absolute',
        left: 15,
        color: 'rgb(170,170,170)',
        fontSize: 10,
        fontFamily: 'Helvetica Neue',
        fontWeight: '500'
    }
});