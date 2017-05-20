// @flow

export type StartEndEvent = {
    start: number,
    end: number,
    index?: number
}

export type CalculatedEventDimens = {
    top: number,
    height: number,
    width: number,
    left: number,
    index: number
}

export default class Packer {
    static buildEvent(column: any, left: number, width: number) {
        column.top = column.start,
            column.height = column.end - column.start,
            column.width = width,
            column.left = left
        return column;
    }

    static collision(a: any, b: any) {
        return a.end > b.start && a.start < b.end;
    }

    static expand(ev: any, column: number, columns: any[]) {
        var colSpan = 1;

        for (var i = column + 1; i < columns.length; i++) {
            var col = columns[i];
            for (var j = 0; j < col.length; j++) {
                var ev1 = col[j];
                if (this.collision(ev, ev1)) {
                    return colSpan;
                }
            }
            colSpan++;
        }

        return colSpan;
    }

    static pack(columns: any[], width: number, calculatedEvents: CalculatedEventDimens[]) {
        var colLength = columns.length;

        for (var i = 0; i < colLength; i++) {
            var col = columns[i];
            for (var j = 0; j < col.length; j++) {
                var colSpan = this.expand(col[j], i, columns);
                var L = (i / colLength) * width;
                var W = width * colSpan / colLength - 1;

                calculatedEvents.push(this.buildEvent(col[j], L, W));
            }
        }
    }

    static populateEvents(events: StartEndEvent[], screenWidth: number): CalculatedEventDimens[] {
        let lastEnd: any, columns: any[], self = this;
        let calculatedEvents: CalculatedEventDimens[] = [];

        events = events
        .map((ev: StartEndEvent, index: number) => ({...ev, index: index}))
        .sort(function (a, b) {
            if (a.start < b.start) return -1;
            if (a.start > b.start) return 1;
            if (a.end < b.end) return -1;
            if (a.end > b.end) return 1;
            return 0
        })

        columns = [];
        lastEnd = null;

        events.forEach(function (ev, index) {
            if (lastEnd !== null && ev.start >= lastEnd) {
                self.pack(columns, screenWidth, calculatedEvents);
                columns = [];
                lastEnd = null;
            }

            var placed = false;
            for (var i = 0; i < columns.length; i++) {
                var col = columns[i];
                if (!self.collision(col[col.length - 1], ev)) {
                    col.push(ev);
                    placed = true;
                    break;
                }
            }

            if (!placed) {
                columns.push([ev]);
            }

            if (lastEnd === null || ev.end > lastEnd) {
                lastEnd = ev.end;
            }
        });

        if (columns.length > 0) {
            this.pack(columns, screenWidth, calculatedEvents);
        }
        return calculatedEvents;
    };
}