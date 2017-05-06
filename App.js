// @flow
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EventCalendar from './src/EventCalendar';

export default class App extends React.Component {
  render() {
    return (
      <EventCalendar />
    );
  }
}