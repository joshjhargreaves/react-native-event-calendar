// @flow
import { StyleSheet } from 'react-native';

const calendarHeight = 1024;
const eventPaddingLeft = 4;
const leftMargin = 50 - 1;

export type DayViewStyle = {
  container: StyleSheet.style,
  event: StyleSheet.style,
  eventTitle: StyleSheet.style,
  eventSummary: StyleSheet.style,
  line: StyleSheet.style,
  timeLabel: StyleSheet.style,
};

export type DayViewStyleProps = {
  container?: StyleSheet.style,
  event?: StyleSheet.style,
  eventTitle?: StyleSheet.style,
  eventSummary?: StyleSheet.style,
  line?: StyleSheet.style,
  timeLabel?: StyleSheet.style,
};

export default function styleConstructor(
  theme: DayViewStyleProps = {}
): DayViewStyle {
  let style: DayViewStyle = {
    container: {
      flex: 1,
      backgroundColor: '#ffff',
      height: calendarHeight + 10,
      marginTop: 20,
      ...theme.container,
    },
    event: {
      position: 'absolute',
      backgroundColor: 'rgb(19,122,209)',
      opacity: 0.8,
      borderColor: 'rgb(22,88,176)',
      borderLeftWidth: 3,
      borderRadius: 1,
      paddingLeft: 4,
      minHeight: 25,
      flex: 1,
      paddingTop: 5,
      paddingBottom: 0,
      flexDirection: 'column',
      alignItems: 'flex-start',
      overflow: 'hidden',
      ...theme.event,
    },
    eventTitle: {
      color: 'white',
      fontWeight: '600',
      minHeight: 15,
      ...theme.eventTitle,
    },
    eventSummary: {
      color: 'white',
      flexWrap: 'wrap',
      ...theme.eventSummary,
    },
    line: {
      height: 1,
      position: 'absolute',
      left: leftMargin,
      backgroundColor: 'rgb(216,216,216)',
      ...theme.line,
    },
    timeLabel: {
      position: 'absolute',
      left: 15,
      color: 'rgb(170,170,170)',
      fontSize: 10,
      fontFamily: 'Helvetica Neue',
      fontWeight: '500',
      ...theme.timeLabel,
    },
  };
  return StyleSheet.create(style);
}
