// // @flow
// import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
// import populateEvents from './Packer';
// import React from 'react';
// import moment from 'moment';
// import _ from 'lodash';

// const LEFT_MARGIN = 60 - 1;
// // const RIGHT_MARGIN = 10
// const CALENDER_HEIGHT = 2400;
// // const EVENT_TITLE_HEIGHT = 15
// const TEXT_LINE_HEIGHT = 17;
// // const MIN_EVENT_TITLE_WIDTH = 20
// // const EVENT_PADDING_LEFT = 4

// function range(from, to) {
//   return Array.from(Array(to), (_, i) => from + i);
// }

// export default class DayView extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.calendarHeight = (props.end - props.start) * 100;
//     const width = props.width - LEFT_MARGIN;
//     const packedEvents = populateEvents(props.events, width, props.start);
//     let initPosition =
//       _.min(_.map(packedEvents, 'top')) -
//       this.calendarHeight / (props.end - props.start);
//     initPosition = initPosition < 0 ? 0 : initPosition;
//     this.state = {
//       _scrollY: initPosition,
//       packedEvents,
//     };
//   }

//   componentWillReceiveProps(nextProps) {
//     const width = nextProps.width - LEFT_MARGIN;
//     this.setState({
//       packedEvents: populateEvents(nextProps.events, width, nextProps.start),
//     });
//   }

//   componentDidMount() {
//     this.props.scrollToFirst && this.scrollToFirst();
//   }

//   scrollToFirst() {
//     setTimeout(() => {
//       if (this.state && this.state._scrollY && this._scrollView) {
//         this._scrollView.scrollTo({
//           x: 0,
//           y: this.state._scrollY,
//           animated: true,
//         });
//       }
//     }, 1);
//   }

//   _renderRedLine() {
//     const offset = 100;
//     const { format24h } = this.props;
//     const { width, styles } = this.props;
//     const timeNowHour = moment().hour();
//     const timeNowMin = moment().minutes();
//     return (
//       <View
//         key={`timeNow`}
//         style={[
//           styles.lineNow,
//           {
//             top:
//               offset * (timeNowHour - this.props.start) +
//               (offset * timeNowMin) / 60,
//             width: width - 20,
//           },
//         ]}
//       />
//     );
//   }

//   _renderLines() {
//     const { format24h, start, end } = this.props;
//     const offset = this.calendarHeight / (end - start);

//     return range(start, end + 1).map((i, index) => {
//       let timeText;
//       if (i === start) {
//         timeText = ``;
//       } else if (i < 12) {
//         timeText = !format24h ? `${i} AM` : i;
//       } else if (i === 12) {
//         timeText = !format24h ? `${i} PM` : i;
//       } else if (i === 24) {
//         timeText = !format24h ? `12 AM` : 0;
//       } else {
//         timeText = !format24h ? `${i - 12} PM` : i;
//       }
//       const { width, styles } = this.props;
//       return [
//         <Text
//           key={`timeLabel${i}`}
//           style={[styles.timeLabel, { top: offset * index - 6 }]}
//         >
//           {timeText}
//         </Text>,
//         i === start ? null : (
//           <View
//             key={`line${i}`}
//             style={[styles.line, { top: offset * index, width: width - 20 }]}
//           />
//         ),
//         <View
//           key={`lineHalf${i}`}
//           style={[
//             styles.line,
//             { top: offset * (index + 0.5), width: width - 20 },
//           ]}
//         />,
//       ];
//     });
//   }

//   _renderTimeLabels() {
//     const { styles, start, end } = this.props;
//     const offset = this.calendarHeight / (end - start);
//     return range(start, end).map((item, i) => {
//       return (
//         <View key={`line${i}`} style={[styles.line, { top: offset * i }]} />
//       );
//     });
//   }

//   _onEventTapped(event) {
//     this.props.eventTapped(event);
//   }

//   _renderEvents() {
//     const { styles } = this.props;
//     const { packedEvents } = this.state;
//     let events = packedEvents.map((event, i) => {
//       const style = {
//         left: event.left,
//         height: event.height,
//         width: event.width,
//         top: event.top,
//       };

//       const eventColor = {
//         backgroundColor: event.color,
//       };

//       // Fixing the number of lines for the event title makes this calculation easier.
//       // However it would make sense to overflow the title to a new line if needed
//       const numberOfLines = Math.floor(event.height / TEXT_LINE_HEIGHT);
//       const formatTime = this.props.format24h ? 'HH:mm' : 'hh:mm A';
//       return (
//         <TouchableOpacity
//           activeOpacity={0.5}
//           onPress={() =>
//             this._onEventTapped(this.props.events[event.index])
//           }
//           key={i} style={[styles.event, style, event.color && eventColor]}
//         >
//           {this.props.renderEvent ? (
//             this.props.renderEvent(event)
//           ) : (
//             <View>
//               <Text numberOfLines={1} style={styles.eventTitle}>
//                 {event.title || 'Event'}
//               </Text>
//               {numberOfLines > 1 ? (
//                 <Text
//                   numberOfLines={numberOfLines - 1}
//                   style={[styles.eventSummary]}
//                 >
//                   {event.summary || ' '}
//                 </Text>
//               ) : null}
//               {numberOfLines > 2 ? (
//                 <Text style={styles.eventTimes} numberOfLines={1}>
//                   {moment(event.start).format(formatTime)} -{' '}
//                   {moment(event.end).format(formatTime)}
//                 </Text>
//               ) : null}
//               </View>
//           )}
//         </TouchableOpacity>
//       );
//     });

//     return (
//       <View>
//         <View style={{ marginLeft: LEFT_MARGIN }}>{events}</View>
//       </View>
//     );
//   }

//   render() {
//     const { styles } = this.props;
//     return (
//       <ScrollView
//         ref={ref => (this._scrollView = ref)}
//         contentContainerStyle={[
//           styles.contentStyle,
//           { width: this.props.width },
//         ]}
//       >
//         {this._renderLines()}
//         {this._renderEvents()}
//         {this._renderRedLine()}
//       </ScrollView>
//     );
//   }
// }
//

// @flow
import {
  View,
  Text,
  ScrollView,
  PanResponder,
  TouchableOpacity
} from "react-native";
import populateEvents from "./Packer";
import React from "react";
import moment from "moment";
import _ from "lodash";

const LEFT_MARGIN = 40 - 1;
// const RIGHT_MARGIN = 10
const CALENDER_HEIGHT = 2400;
// const EVENT_TITLE_HEIGHT = 15
const TEXT_LINE_HEIGHT = 17;
// const MIN_EVENT_TITLE_WIDTH = 20
// const EVENT_PADDING_LEFT = 4

const allTimes = [
  { time: 0 },
  { time: 1 },
  { time: 2 },
  { time: 3 },
  { time: 4 },
  { time: 5 },
  { time: 6 },
  { time: 7 },
  { time: 8 },
  { time: 9 },
  { time: 10 },
  { time: 11 },
  { time: 12 },
  { time: 13 },
  { time: 14 },
  { time: 15 },
  { time: 16 },
  { time: 17 },
  { time: 18 },
  { time: 19 },
  { time: 20 },
  { time: 21 },
  { time: 22 },
  { time: 23 }
];

const getPressedDuration = ({ evt, gestureState, calendarHeight, props }) => {
  const durationHeight = calendarHeight / allTimes.length;
  const minTime = Math.floor(evt.nativeEvent.locationY / 100);
  // if(gestureState)
  // console.log(evt.nativeEvent.locationY)
  // console.log(minTime)
  props.onDurationTap(minTime);
};

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
      _.min(_.map(packedEvents, "top")) -
      this.calendarHeight / (props.end - props.start);
    initPosition = initPosition < 0 ? 0 : initPosition;
    this.state = {
      _scrollY: initPosition,
      packedEvents
    };
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        getPressedDuration({
          evt,
          gestureState,
          calendarHeight: this.calendarHeight,
          props: this.props
        });
        // console.log('event', evt)
        // console.log('gestureState', gestureState)
        // console.log('calandar height', this.calendarHeight)
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const width = nextProps.width - LEFT_MARGIN;
    this.setState({
      packedEvents: populateEvents(nextProps.events, width, nextProps.start)
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
          animated: true
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
            width: width - 20
          }
        ]}
      />
    );
  }

  _renderLines() {
    const { format24h, start, end } = this.props;
    const offset = this.calendarHeight / (end - start);

    return range(start, end + 1).map((i, index) => {
      let timeText;
      if (i === start) {
        timeText = ``;
      } else if (i < 12) {
        timeText = !format24h ? `${i} AM` : i;
      } else if (i === 12) {
        timeText = !format24h ? `${i} PM` : i;
      } else if (i === 24) {
        timeText = !format24h ? `12 AM` : 0;
      } else {
        timeText = !format24h ? `${i - 12} PM` : i;
      }
      const { width, styles } = this.props;
      return [
        <Text
          key={`timeLabel${i}`}
          style={[styles.timeLabel, { top: offset * index - 6 }]}
        >
          {timeText}
        </Text>,
        i === start ? null : (
          <View
            key={`line${i}`}
            style={[styles.line, { top: offset * index, width: width - 20 }]}
          />
        ),
        <View
          key={`lineHalf${i}`}
          style={[
            styles.line,
            { top: offset * (index + 0.5), width: width - 20 }
          ]}
        />
      ];
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
        width: event.width + 10,
        top: event.top
      };

      const eventColor = {
        backgroundColor: event.color
      };

      // Fixing the number of lines for the event title makes this calculation easier.
      // However it would make sense to overflow the title to a new line if needed
      const numberOfLines = Math.floor(event.height / TEXT_LINE_HEIGHT);
      const formatTime = this.props.format24h ? "HH:mm" : "hh:mm A";
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this._onEventTapped(this.props.events[event.index])}
          key={i}
          style={[styles.event, style, event.color && eventColor]}
        >
          {this.props.renderEvent ? (
            this.props.renderEvent(event)
          ) : (
            <View>
              <Text numberOfLines={1} style={styles.eventTitle}>
                {event.title || "Event"}
              </Text>
              {numberOfLines > 1 ? (
                <Text
                  numberOfLines={numberOfLines - 1}
                  style={[styles.eventSummary]}
                >
                  {event.summary || " "}
                </Text>
              ) : null}
              {numberOfLines > 2 ? (
                <Text style={styles.eventTimes} numberOfLines={1}>
                  {moment(event.start).format(formatTime)} -{" "}
                  {moment(event.end).format(formatTime)}
                </Text>
              ) : null}
            </View>
          )}
        </TouchableOpacity>
      );
    });

    return (
      <View>
        <View style={{ marginLeft: LEFT_MARGIN }}>{events}</View>
      </View>
    );
  }

  render() {
    const { styles } = this.props;
    return (
      <ScrollView
        {...this._panResponder.panHandlers}
        ref={ref => (this._scrollView = ref)}
        contentContainerStyle={[
          styles.contentStyle,
          { width: this.props.width }
        ]}
      >
        {this._renderLines()}
        {this._renderEvents()}
        {this._renderRedLine()}
      </ScrollView>
    );
  }
}
