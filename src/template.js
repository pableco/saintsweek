import moment from 'moment';

import { escapeForHTML } from './helpers';

export default class Template {

    constructor() {
        this.blockBEM = 'saints-week';
    }

    items(weekData) {
        console.log(weekData);
        function isToday(momentDate) {
            return momentDate.isSame(moment(), 'd');
        }
        return weekData.reduce((a, item) => a + `
        <tr class="${this.blockBEM}__item 
            ${isToday(item) ? `${this.blockBEM}__item--today` : ''}"
            data-id="${item.format('YYYY-MM-DD')}">
                <td class="${this.blockBEM}__item-day">
                <span class="${this.blockBEM}__item-day-str">${item.format('dd')}<span>
                <span class="${this.blockBEM}__item-day-numb">${item.format('D')}<span>
                </td>
                <td></td> 
                <td></td>
                <td></td> 
                <td></td>
        </tr>`, '');
    }

    body(weekData) {
        return (
            `<div class="${this.blockBEM}__body">
            <table class="${this.blockBEM}__table">
            <tr class="${this.blockBEM}__table-header">
                <th class="${this.blockBEM}__table-day">day</th>
                <th class="${this.blockBEM}__table-time">time</th> 
                <th class="${this.blockBEM}__table-description">description</th>
                <th class="${this.blockBEM}__table-task">task</th> 
                <th class="${this.blockBEM}__table-done">done</th>
            </tr>
            ${this.items(weekData)}
            </table>
            </div>`
        )
    }

    header(weekData) {
        const firstDate = weekData[0];
        const lastDate = weekData[6];
        const rangeDatesStr = `${firstDate.get('date')} - ${lastDate.get('date')}`;
        const firstMonth = firstDate.format('MMMM');
        const lastMonth = lastDate.format('MMMM');
        const isSameMonth = firstMonth == lastMonth;
        const firstYear = firstDate.format('YYYY');
        const lastYear = lastDate.format('YYYY');
        const isSameYear = firstYear == lastYear;
        const currentMonthRange = isSameMonth ? `${firstMonth} ${firstYear}` : `${firstMonth} ${firstYear} - ${lastMonth} ${lastYear}`;
        const oddPageHeader = `${rangeDatesStr} <span>${currentMonthRange}</span>`;
        const evenPageHeader = `<span>${currentMonthRange}</span> ${rangeDatesStr}`;
        return(
            `<header class="${this.blockBEM}__header">
            <div class="${this.blockBEM}__header-odd">${oddPageHeader}</div>
            <div class="${this.blockBEM}__header-even">${evenPageHeader}</div>
            </header>`
        )
    }
    footer() {
        return (
            `<div class="${this.blockBEM}__footer">
            Pablo Grillo -${moment().get('year')}
            </div>`
        )
    }

    render(weekData) {
        const header = this.header(weekData);
        const footer = this.footer();
        const body = this.body(weekData)
        return (
            `<section class="${this.blockBEM}">
            ${header}
            ${body}
            ${footer}
            </section>`
        );
    }

}