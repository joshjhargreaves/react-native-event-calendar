// @flow
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import type { CalculatedEventDimens } from './Packer'
import React from 'react';
import _ from 'lodash';

import Packer from './Packer'

const LEFT_MARGIN = 50 - 1;
const CALENDER_HEIGHT = 1024;

export default class DayView extends React.PureComponent {
    props: {
        events: CalculatedEventDimens[],
        width: number
    }

    renderLines = () => {
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

    renderTimeLabels() {
        const offset = 1000 / 24;
        return _.range(0, 24).map((item, i) => {
            return <View key={`line${i}`} style={[styles.line, { top: offset * i }]} />
        });
    }

    renderEvents() {
        return this.props.events.map((event, i) => {
            const style = {
                left: event.left + LEFT_MARGIN,
                height: event.height,
                width: event.width,
                top: event.top,
            }
            return (
                <View key={i} style={[styles.event, style]} >
                    <Text>Hello World</Text>
                </View>
            )
        });
    }

    render() {
        const {width} = this.props;
        return (
            <ScrollView>
                <View style={[styles.container, {width: width}]}>
                    {this.renderLines()}
                    {this.renderEvents()}
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
        backgroundColor: 'deeppink',
        opacity: 0.8
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