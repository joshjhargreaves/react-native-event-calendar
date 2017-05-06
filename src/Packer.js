// @flow

export type StartEndEvent = {
    start: number,
    end: number
}

export type CalculatedEventDimens = {
    top: number,
    height: number,
    width: number,
    left: number
}

export default class Packer {
    calculatedEvents: CalculatedEventDimens[];
    screenWidth: number;
    events: any[];

    constructor(screenWidth: number) {
        this.calculatedEvents = [];
        this.screenWidth = screenWidth;
    }

    buildEvent(column: any, left: number, width: number) {
        column.top = column.start,
            column.height = column.end - column.start,
            column.width = width,
            column.left = left
        return column;
    }

    collision(a: any, b: any) {
        return a.end > b.start && a.start < b.end;
    }

    expand(ev: any, column: number, columns: any[]) {
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

    pack(columns: any[], width: number) {
        var colLength = columns.length;

        for (var i = 0; i < colLength; i++) {
            var col = columns[i];
            for (var j = 0; j < col.length; j++) {
                var colSpan = this.expand(col[j], i, columns);
                var L = (i / colLength) * width;
                var W = width * colSpan / colLength - 1;

                this.calculatedEvents.push(this.buildEvent(col[j], L, W));
            }
        }
    }

    populateEvents(events: StartEndEvent[]): CalculatedEventDimens[] {
        let lastEnd: any, columns: any[], self = this;

        events = events.sort(function (a, b) {
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
                self.pack(columns, self.screenWidth);
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
            this.pack(columns, self.screenWidth);
        }
        return this.calculatedEvents;
    };
}