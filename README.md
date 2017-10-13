# React Native Event Calendar
A React Native iOS style calendar implemented using VirtualizedList.
This package is forked of https://github.com/joshyhargreaves/react-native-event-calendar
allow run without expo and improve somethings

## Demo
<img src="https://raw.githubusercontent.com/duyluonglc/react-native-events-calendar/master/demo/screenshot.png" width="360">

## Current API
Property | Type | Description
------------ | ------------- | -------------
events | PropTypes.array | Array of event
width | PropTypes.number | Container width
format24h | PropTypes.boolean | Use format 24hour or 12hour
formatHeader | PropTypes.string | Header date format
headerStyle | PropTypes.object | Header style
renderEvent | PropTypes.function | Function return a component to render event `renderEvent={(event) => <Text>{event.title}</Text>}`
eventTapped | PropTypes.function | Function on event press
initDate | PropTypes.string | show initial date (default is today)
scrollToFirst | PropTypes.boolean | scroll to first event of the day (default true)
size | PropTypes.number | number of date will render before and after initDate (default is 30 will render 30 day before initDate and 29 day after initDate)
virtualizedListProps | PropTypes.object | prop pass to virtualizedList

`EventCalendar` can be configured through a `style` prop whereby any of the components in the calendar can be styled. 
```
    {
        container: {
            backgroundColor: 'white'
        }, 
        event: {
            opacity: 0.5
        }
    }
```
## Install
`npm i --save react-native-events-calendar`

## Examples
See Examples dir. 

```js
import EventCalendar from 'react-native-events-calendar'

let { width } = Dimensions.get('window')

const events = [
    { start: '2017-09-07 00:30:00', end: '2017-09-07 01:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-07 01:30:00', end: '2017-09-07 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-07 04:10:00', end: '2017-09-07 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-07 01:05:00', end: '2017-09-07 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-07 14:30:00', end: '2017-09-07 16:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-08 01:20:00', end: '2017-09-08 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-08 04:10:00', end: '2017-09-08 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-08 00:45:00', end: '2017-09-08 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-08 11:30:00', end: '2017-09-08 12:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-09 01:30:00', end: '2017-09-09 02:00:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-09 03:10:00', end: '2017-09-09 03:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-09 00:10:00', end: '2017-09-09 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' }
]


render () {
  return (
    <EventCalendar
      eventTapped={this._eventTapped.bind(this)}
      events={this.state.events}
      width={width}
      initDate={'2017-09-08'}
    />
  )
}

```
