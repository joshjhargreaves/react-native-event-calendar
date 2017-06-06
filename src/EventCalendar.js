// @flow
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  VirtualizedList,
  FlatList,
} from 'react-native';
import type { CalculatedEventDimens, StartEndEvent } from './Packer';
import type { DayViewStyle } from './style';
import React from 'react';

import styleConstructor, { type DayViewStyleProps } from './style';

import Packer from './Packer';
import DayView from './DayView';
import Expo from 'expo';

const VIRTUAL_ITEM_COUNT = 1000;

type Props = {
  getItem: (data: any, index: number) => StartEndEvent[],
  events: any,
  eventTapped: (event: StartEndEvent) => void,
  width: number,
  styles?: DayViewStyleProps,
  verticleScrollViewProps?: Object,
  virtualizedListProps?: Object,
};

export default class EventCalendar extends React.Component<void, Props, void> {
  styles: DayViewStyle;
  constructor(props: Props) {
    super(props);
    this.styles = styleConstructor(props.styles);
  }

  _getItemLayout = (data: any, index: number) => {
    const { width } = this.props;
    return { length: width, offset: width * index, index };
  };

  _getItem = (data: Array<any>, index: number) => {
    return {};
  };

  _renderItem = ({ index }) => {
    const events = this.props.getItem(
      this.props.events,
      index - VIRTUAL_ITEM_COUNT / 2
    );
    const { width } = this.props;
    return (
      <DayView
        eventTapped={this.props.eventTapped}
        events={events}
        width={width}
        styles={this.styles}
      />
    );
  };

  _getItem = (data, index) => {
    return -1;
  };

  render() {
    const { width, verticleScrollViewProps, virtualizedListProps } = this.props;
    return (
      <ScrollView {...verticleScrollViewProps}>
        <VirtualizedList
          windowSize={2}
          initialNumToRender={2}
          initialScrollIndex={VIRTUAL_ITEM_COUNT / 2}
          data={['a', 'b', 'c']}
          getItemCount={() => VIRTUAL_ITEM_COUNT}
          getItem={this._getItem}
          keyExtractor={(item, index) => String(index)}
          getItemLayout={this._getItemLayout}
          horizontal
          pagingEnabled
          renderItem={this._renderItem}
          style={{ width: width }}
          {...virtualizedListProps}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
