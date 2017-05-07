// @flow
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EventCalendar from './src/EventCalendar';

export default class App extends React.Component {
  state = {
    events: [
      { start: 30, end: 150 },
      { start: 540, end: 600 },
      { start: 560, end: 620 },
      { start: 610, end: 670 }
    ]
  }

  _getEventsForIndex() {

  }

  render() {
    return (
      <EventCalendar events={this.state.events} getEventsForIndex={this._getEventsForIndex()}/>
    );
  }
}