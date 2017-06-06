# React Native Event Calendar
A React Native iOS style calendar implemented using VirtualizedList.

This is a WIP project and the API is currently being fleshed out.

[View it with Expo](https://getexponent.com/@joshyhargreaves/react-native-event-calendar)

## Demo
<a href="https://raw.githubusercontent.com/joshyhargreaves/react-native-event-calendar/master/demo/demo.mp4"><img src="https://raw.githubusercontent.com/joshyhargreaves/react-native-event-calendar/master/demo/demo.gif" width="360"></a>

## Current API
Proper documentation coming soon...

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

## Proposed API changes
Coming soon...

## TODO
- Accept dates as props for start and end times of events
- Add optional max, end date props
- Add starting date prop
- Add onDateChanged cb prop Accept dates as props
- General API review/clean-up.
- Fix Flow types: the internal flow types in the project haven't been thought out well.
- Fix these and expose sane flow types from the project

## Examples
See Examples dir. 

N.B. the example project won't start in the middle of the VirtualizedList as 
`initialScrollIndex` not in React-native version included in the Expo SDK as of yet. 
This functionality does work with newer versions of react-native. 
