// @flow
import {
  VirtualizedList
} from 'react-native'
import _ from 'lodash'
import moment from 'moment'
import React from 'react'

import styleConstructor from './style'

import DayView from './DayView'

const VIRTUAL_ITEM_COUNT = 1000

export default class EventCalendar extends React.Component {
  constructor (props) {
    super(props)
    this.styles = styleConstructor(props.styles)
    this.state = {
      date: moment()
    }
  }

  _getItemLayout (data, index) {
    const { width } = this.props
    return { length: width, offset: width * index, index }
  };

  _getItem (events, index) {
    const date = moment().add(index - VIRTUAL_ITEM_COUNT / 2, 'days')
    return _.filter(events, event => {
      const eventStartTime = moment(event.start)
      return eventStartTime >= date.clone().startOf('day') && eventStartTime <= date.clone().endOf('day')
    })
  }

  _keyExtractor (item, index) {
    const date = moment().add(index - VIRTUAL_ITEM_COUNT / 2, 'days')
    return date.format('YYYY-MM-DD')
  };

  _renderItem ({ index, item }) {
    const { width, format24h } = this.props
    const date = moment().add(index - VIRTUAL_ITEM_COUNT / 2, 'days')
    return (
      <DayView
        date={date}
        format24h={format24h}
        formatHeader={this.props.formatHeader}
        headerStyle={this.props.headerStyle}
        renderEvent={this.props.renderEvent}
        eventTapped={this.props.eventTapped}
        events={item}
        width={width}
        styles={this.styles}
      />
    )
  };

  render () {
    const {
      width,
      virtualizedListProps,
      events,
      initDate
    } = this.props
    const initialIndex = initDate ? moment(initDate).diff(moment().startOf('day'), 'day') + VIRTUAL_ITEM_COUNT / 2 : VIRTUAL_ITEM_COUNT / 2
    return (
      <VirtualizedList
        ref={ref => (this.horizontalList = ref)}
        windowSize={2}
        initialNumToRender={2}
        initialScrollIndex={initialIndex}
        data={events}
        getItemCount={() => VIRTUAL_ITEM_COUNT}
        getItem={this._getItem.bind(this)}
        keyExtractor={this._keyExtractor.bind(this)}
        getItemLayout={this._getItemLayout.bind(this)}
        horizontal
        pagingEnabled
        renderItem={this._renderItem.bind(this)}
        style={{ width: width }}
        {...virtualizedListProps}
      />
    )
  }
}
