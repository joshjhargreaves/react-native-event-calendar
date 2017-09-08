// @flow
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import populateEvents from './Packer'
import React from 'react'
import moment from 'moment'

const LEFT_MARGIN = 60 - 1
// const RIGHT_MARGIN = 10
const CALENDER_HEIGHT = 2400
// const EVENT_TITLE_HEIGHT = 15
const TEXT_LINE_HEIGHT = 17
// const MIN_EVENT_TITLE_WIDTH = 20
// const EVENT_PADDING_LEFT = 4

function range (from, to) {
  return Array.from(Array(to), (_, i) => from + i)
}

export default class DayView extends React.PureComponent {
  _renderLines () {
    const offset = CALENDER_HEIGHT / 24
    const { format24h } = this.props

    return range(0, 25).map((item, i) => {
      let timeText
      if (i === 0) {
        timeText = ``
      } else if (i < 12) {
        timeText = !format24h ? `${i} AM` : i
      } else if (i === 12) {
        timeText = !format24h ? `${i} PM` : i
      } else if (i === 24) {
        timeText = !format24h ? `12 AM` : 0
      } else {
        timeText = !format24h ? `${i - 12} PM` : i
      }
      const { width, styles } = this.props
      return [
        <Text
          key={`timeLabel${i}`}
          style={[styles.timeLabel, { top: offset * i - 6 }]}
        >
          {timeText}
        </Text>,
        i === 0 ? null : (
          <View
            key={`line${i}`}
            style={[styles.line, { top: offset * i, width: width - 20 }]}
          />
        ),
        <View
          key={`lineHalf${i}`}
          style={[styles.line, { top: offset * (i + 0.5), width: width - 20 }]}
        />
      ]
    })
  };

  _renderTimeLabels () {
    const { styles } = this.props
    const offset = CALENDER_HEIGHT / 24
    return range(0, 24).map((item, i) => {
      return (
        <View key={`line${i}`} style={[styles.line, { top: offset * i }]} />
      )
    })
  }

  _onEventTapped (event) {
    this.props.eventTapped(event)
  };

  _renderEvents () {
    const { styles } = this.props
    const width = this.props.width - LEFT_MARGIN
    const packedEvents = populateEvents(this.props.events, width)

    let events = packedEvents.map((event, i) => {
      const style = {
        left: event.left,
        height: event.height,
        width: event.width,
        top: event.top
      }

      // Fixing the number of lines for the event title makes this calculation easier.
      // However it would make sense to overflow the title to a new line if needed
      const numberOfLines = Math.floor(event.height / TEXT_LINE_HEIGHT)
      const formatTime = this.props.format24h ? 'HH:mm' : 'hh:mm A'
      return (
        <View
          key={i}
          style={[styles.event, style]}
        >
          {this.props.renderEvent ? this.props.renderEvent(event) : (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this._onEventTapped(this.props.events[event.index])}
            >
              <Text numberOfLines={1} style={styles.eventTitle}>{event.title || 'Event'}</Text>
              {numberOfLines > 1
                ? <Text
                  numberOfLines={numberOfLines - 1}
                  style={[styles.eventSummary]}
                >
                  {event.summary || ' '}
                </Text>
                : null}
              {numberOfLines > 2
                ? <Text style={styles.eventTimes} numberOfLines={1}>{moment(event.start).format(formatTime)} - {moment(event.end).format(formatTime)}</Text>
                : null}
            </TouchableOpacity>
          )}
        </View>
      )
    })
    return (
      <View>
        <View style={{ marginLeft: LEFT_MARGIN }}>
          {events}
        </View>
      </View>
    )
  }

  _renderHeader () {
    const { date, styles, formatHeader, headerStyle } = this.props
    const headerText = [styles.headerText, headerStyle]
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={this.props.goNext}><Text style={styles.arrow}>{'〈'}</Text></TouchableOpacity>
        <Text style={headerText}>{date.format(formatHeader || 'DD MMMM YYYY')}</Text>
        <TouchableOpacity onPress={this.props.goPrevious}><Text style={styles.arrow}>{'〉'}</Text></TouchableOpacity>
      </View>
    )
  }

  render () {
    const { styles } = this.props
    return (
      <View style={[styles.container, { width: this.props.width }]}>
        {this._renderHeader()}
        <ScrollView contentContainerStyle={styles.contentStyle}>
          {this._renderLines()}
          {this._renderEvents()}
        </ScrollView>
      </View>
    )
  }
}
