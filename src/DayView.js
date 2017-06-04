// @flow
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import type { CalculatedEventDimens, StartEndEvent } from './Packer';
import type { DayViewStyle } from './style';
import React from 'react';

import populateEvents from './Packer';

const LEFT_MARGIN = 50 - 1;
const CALENDER_HEIGHT = 1024;
const EVENT_TITLE_HEIGHT = 15;
const TEXT_LINE_HEIGHT = 17;
const MIN_EVENT_TITLE_WIDTH = 20;
const EVENT_PADDING_LEFT = 4;

type Props = {
  events: StartEndEvent[],
  width: number,
  eventTapped: (event: StartEndEvent) => void,
  styles: DayViewStyle,
};

function range(from: number, to: number): number[] {
  return Array.from(Array(to), (_, i) => from + i);
}

export default class DayView extends React.PureComponent<void, Props, void> {
  _renderLines = () => {
    const offset = CALENDER_HEIGHT / 24;

    return range(0, 25).map((item, i) => {
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
      const { width, styles } = this.props;
      return [
        <Text
          key={`timeLabel${i}`}
          style={[styles.timeLabel, { top: offset * i - 6 }]}
        >
          {timeText}
        </Text>,
        <View
          key={`line${i}`}
          style={[styles.line, { top: offset * i, width: width - 20 }]}
        />,
      ];
    });
  };

  _renderTimeLabels() {
    const { styles } = this.props;
    const offset = 1000 / 24;
    return range(0, 24).map((item, i) => {
      return (
        <View key={`line${i}`} style={[styles.line, { top: offset * i }]} />
      );
    });
  }

  _onEventTapped = (event: StartEndEvent) => {
    this.props.eventTapped(event);
  };

  _renderEvents() {
    const { styles } = this.props;
    const width = this.props.width - LEFT_MARGIN;
    const packedEvents = populateEvents(this.props.events, width);

    let events = packedEvents.map((event: CalculatedEventDimens, i) => {
      const style = {
        left: event.left,
        height: event.height,
        width: event.width,
        top: event.top,
      };

      // Fixing the number of lines for the event title makes this calculation easier.
      // However it would make sense to overflow the title to a new line if needed
      const numberOfLines = Math.floor(event.height / TEXT_LINE_HEIGHT);

      return (
        <TouchableOpacity
          activeOpacity={0.5}
          key={i}
          style={[styles.event, style]}
          onPress={() => this._onEventTapped(this.props.events[event.index])}
        >
          <View>
            <Text numberOfLines={1} style={styles.eventTitle}>Event Title</Text>
            {numberOfLines > 1
              ? <Text
                  numberOfLines={numberOfLines - 1}
                  style={[styles.eventSummary]}
                >
                  London bridge station. Longer amounts of text. More text
                </Text>
              : null}
          </View>
        </TouchableOpacity>
      );
    });
    return (
      <View>
        <View style={{ marginLeft: LEFT_MARGIN }}>
          {events}
        </View>
      </View>
    );
  }

  render() {
    const { styles } = this.props;
    return (
      <View style={[styles.container, { width: this.props.width }]}>
        {this._renderLines()}
        {this._renderEvents()}
      </View>
    );
  }
}
