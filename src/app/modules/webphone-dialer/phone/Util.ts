export class Util {
    /**
     *
     * @returns {string}
     */
    public static currentTime(separator: string): string {
        var today: any = new Date();
        var hh = today.getHours();
        var ii = today.getMinutes();
        var ss = today.getSeconds();
        today = hh + ':' + ii + ':' + ss;
        if (typeof separator !== "undefined") {
            today = hh + separator + ii + separator + ss;
        }
        return today;
    }
    public static currentDate() {
        var today: any = new Date();
        var dd: any = today.getDate();
        var mm: any = today.getMonth() + 1;
        var yyyy = today.getFullYear().toString().substr(-2);
        var hh = today.getHours();
        var ii = today.getMinutes();
        var ss = today.getSeconds();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = dd + '-' + mm + '-' + yyyy + ' ' + hh + ':' + ii + ':' + ss;
        return today;
    }
}
