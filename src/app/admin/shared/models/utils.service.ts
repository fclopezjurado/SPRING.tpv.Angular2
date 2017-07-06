/**
 * Created by fran lopez on 03/06/2017.
 */

export class Utils {
    public static formatDate(date: string): string {
        return this.dateToString(new Date(date));
    }

    public static formatDateFromYYYYMMDD(date: string): string {
        return this.dateToString(new Date(parseInt(date.substring(0, 4), 10), (parseInt(date.substring(4, 6), 10) - 1),
            parseInt(date.substring(6, 8), 10)));
    }

    private static dateToString(date: Date): string {
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    };
}