// @flow
import { View, Text, ScrollView, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import populateEvents from './Packer';
import React from 'react';
import moment from 'moment';
import _ from 'lodash';

const LEFT_MARGIN = 60 - 1;
// const RIGHT_MARGIN = 10
const CALENDER_HEIGHT = 2400;
// const EVENT_TITLE_HEIGHT = 15
const TEXT_LINE_HEIGHT = 17;
// const MIN_EVENT_TITLE_WIDTH = 20
// const EVENT_PADDING_LEFT = 4

function range(from, to) {
  return Array.from(Array(to), (_, i) => from + i);
}

export default class DayView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.calendarHeight = (props.end - props.start) * 100;
    const width = props.width - LEFT_MARGIN;
    const packedEvents = populateEvents(props.events, width, props.start);
    let initPosition =
      _.min(_.map(packedEvents, 'top')) -
      this.calendarHeight / (props.end - props.start);
    initPosition = initPosition < 0 ? 0 : initPosition;
    this.state = {
      _scrollY: initPosition,
      packedEvents,
    };
  }

  componentWillReceiveProps(nextProps) {
    const width = nextProps.width - LEFT_MARGIN;
    this.setState({
      packedEvents: populateEvents(nextProps.events, width, nextProps.start),
    });
  }

  componentDidMount() {
    this.props.scrollToFirst && this.scrollToFirst();
  }

  scrollToFirst() {
    setTimeout(() => {
      if (this.state && this.state._scrollY && this._scrollView) {
        this._scrollView.scrollTo({
          x: 0,
          y: this.state._scrollY,
          animated: true,
        });
      }
    }, 1);
  }

  _renderRedLine() {
    const offset = 100;
    const { format24h } = this.props;
    const { width, styles } = this.props;
    const timeNowHour = moment().hour();
    const timeNowMin = moment().minutes();
    return (
      <View
        key={`timeNow`}
        style={[
          styles.lineNow,
          {
            top:
              offset * (timeNowHour - this.props.start) +
              (offset * timeNowMin) / 60,
            width: width - 20,
          },
        ]}
      />
    );
  }
  _formatHour({ format24h, hour, start, half='' }) { 
    let timeText;
    if (hour === start && hour!==0 ) {
      timeText = ``;
    } else if (hour === 0) {
      timeText = !format24h ? `12${half || ':00'} AM` : 24;
    } else if (hour < 12) {
      timeText = !format24h ? `${hour}${half || ':00'} AM` : hour;
    } else if (hour === 12) {
      timeText = !format24h ? `${hour}${half || ':00'} PM` : hour;
    } else if (hour === 24) {
      timeText = !format24h ? `12:00 AM` : 0;
    } else {
      timeText = !format24h ? `${hour - 12}${half} PM` : hour;
    }
    return timeText;
  }
  _renderLines() {
    const { format24h, start, end, onPressHour } = this.props;
    const offset = this.calendarHeight / (end - start);

    return range(start, end + 1).map((i, index) => {
      const timeText = this._formatHour({ format24h, hour: i, start });
      const value = { time: timeText, hour: i, start, end, format24h };
      const { width, styles } = this.props;

      const InterbalHour = [
        <Text
          key={`timeLabel${i}`}
          style={[styles.timeLabel, { top: offset * index - 6, marginTop:4 }]}
        >
          {timeText}
        </Text>,
       onPressHour && (<TouchableNativeFeedback onPress={() => onPressHour({...value, minute:':00'})}    key={`touchOne${i}`}>
        <View
          key={`lineHalf${i}`}
          style={[
            {
              height: 50,
              position: 'absolute',
              left: 50 - 1,
            },
            { top: offset * index, width: width - 20, marginTop:4 },
          ]}
          />
      </TouchableNativeFeedback>),
        i === start ? null : (
          <View
            key={`line${i}`}
            style={[styles.line, { top: offset * index, width: width - 20, marginTop:4  }]}
          />
        ),
        <View
          key={`lineHalf${i}`}
          style={[
            styles.line,
            { top: offset * (index + 0.5), width: width - 20,  marginTop:4   },
          ]}
        />,
        onPressHour && (<TouchableNativeFeedback  onPress={() => onPressHour({...value, minute:':30',time:this._formatHour({format24h, hour:i, start, half:':30'})})}     key={`touch${i}`}>
          <View
            key={`lineHalf${i}`}
            style={[
              {
                height: 50,
                position: 'absolute',
                left: 50 - 1,
              },
              { top: offset * (index + 0.5), width: width - 20, marginTop:4  },
            ]}
            />
        </TouchableNativeFeedback>),
      ];

      return InterbalHour
    });
  }

  _renderTimeLabels() {
    const { styles, start, end } = this.props;
    const offset = this.calendarHeight / (end - start);
    return range(start, end).map((item, i) => {
      return (
        <View key={`line${i}`} style={[styles.line, { top: offset * i }]} />
      );
    });
  }

  _onEventTapped(event) {
    this.props.eventTapped(event);
  }

  _renderEvents() {
    const { styles } = this.props;
    const { packedEvents } = this.state;
    let events = packedEvents.map((event, i) => {
      const style = {
        left: event.left,
        height: event.height,
        width: event.width,
        top: event.top,
      };

      const eventColor = {
        backgroundColor: event.color,
      };

      // Fixing the number of lines for the event title makes this calculation easier.
      // However it would make sense to overflow the title to a new line if needed
      const numberOfLines = Math.floor(event.height / TEXT_LINE_HEIGHT);
      const formatTime = this.props.format24h ? 'HH:mm' : 'hh:mm A';
      return (
        <View key={i} style={[styles.event, style, event.color && eventColor, {marginTop:4}]}>
          {this.props.renderEvent ? (
            this.props.renderEvent({...event, numberOfLines})
          ) : (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                this._onEventTapped(this.props.events[event.index])
              }
            >
              <Text numberOfLines={1} style={styles.eventTitle}>
                {event.title || 'Event'}
              </Text>
              {numberOfLines > 1 ? (
                <Text
                  numberOfLines={numberOfLines - 1}
                  style={[styles.eventSummary]}
                >
                  {event.summary || ' '}
                </Text>
              ) : null}
              {numberOfLines > 2 ? (
                <Text style={styles.eventTimes} numberOfLines={1}>
                  {moment(event.start).format(formatTime)} -{' '}
                  {moment(event.end).format(formatTime)}
                </Text>
              ) : null}
            </TouchableOpacity>
          )}
        </View>
      );
    });

    return (
      <View>
        <View style={{ marginLeft: LEFT_MARGIN }}>{events}</View>
      </View>
    );
  }

  render() {
    const { styles, showRedLine } = this.props;
    return (
      <ScrollView
        ref={ref => (this._scrollView = ref)}
        contentContainerStyle={[
          styles.contentStyle,
          { width: this.props.width },
        ]}
      >
        {this._renderLines()}
        {this._renderEvents()}
        {showRedLine && this._renderRedLine()}
      </ScrollView>
    );
  }
}
