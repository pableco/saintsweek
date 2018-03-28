import moment from 'moment';

import { escapeForHTML } from './helpers';

export default class Template {

    constructor(weekData) {
        this.weekData = weekData;
        this.blockBEM = 'saints-week';
        this.firstDate = weekData[0];
        this.lastDate = weekData[6];
        this.rangeDatesStr = `${this.firstDate.get('date')}-${this.lastDate.get('date')}`;
        this.firstMonth = this.firstDate.format('MMMM');
        this.lastMonth = this.lastDate.format('MMMM');
        this.isSameMonth = this.firstMonth == this.lastMonth;
        this.firstYear = this.firstDate.format('YYYY');
        this.lastYear = this.lastDate.format('YYYY');
        this.isSameYear = this.firstYear == this.lastYear;
        this.currentMonthRange = this.isSameMonth ? `${this.firstMonth} ${this.firstYear}` : `${this.firstMonth} ${this.firstYear} - ${this.lastMonth} ${this.lastYear}`;
    }

    oddPageHeader (){
        return (
            `<span class="${this.blockBEM}__range-date">
                ${this.rangeDatesStr}
            </span>
            <span class="${this.blockBEM}__range-month">
                ${this.currentMonthRange}
            </span>`
        )
    }

    evenPageHeader() {
        return (
            `<span class="${this.blockBEM}__range-month">
                ${this.currentMonthRange}
            </span>
            <span class="${this.blockBEM}__range-date">
                ${this.rangeDatesStr}
            </span>`
        )
    }

    htmlLines (){
        return(
            `<span class="${this.blockBEM}__grid-item-line"></span>
            <span class="${this.blockBEM}__grid-item-line"></span>
            <span class="${this.blockBEM}__grid-item-line"></span>
            <span class="${this.blockBEM}__grid-item-line"></span>`
        );
    }

    isToday(momentDate) {
        return momentDate.isSame(moment(), 'd');
    }

    oddItems() {
        return this.weekData.reduce((a, item) => a + `
        <div class="${this.blockBEM}__grid-item 
            ${this.isToday(item) ? `${this.blockBEM}__grid-item--today` : ''}"
            data-id="${item.format('YYYY-MM-DD')}">
                <div class="${this.blockBEM}__grid-item-day">
                    <span class="${this.blockBEM}__grid-item-day-str">${item.format('ddd')}</span>
                    <span class="${this.blockBEM}__grid-item-day-numb">${item.format('D')}</span>
                </div>
                <div class="${this.blockBEM}__grid-item-time">
                    ${this.htmlLines()}
                </div> 
                <div class="${this.blockBEM}__grid-item-description">
                    ${this.htmlLines()}
                </div>
        </div>`, '');
    }

    evenItems() {
        return this.weekData.reduce((a, item) => a + `
        <div class="${this.blockBEM}__grid-item 
            ${this.isToday(item) ? `${this.blockBEM}__grid-item--today` : ''}"
            data-id="${item.format('YYYY-MM-DD')}">
                <div class="${this.blockBEM}__grid-item-task">
                ${this.htmlLines()}
                </div> 
                <div class="${this.blockBEM}__grid-item-done">
                ${this.htmlLines()}
                </div>
        </div>`, '');
    }

    oddBody() {
        return (
            `<div class="${this.blockBEM}__grid-header">
                <div class="${this.blockBEM}__grid-day">Day</div>
                <div class="${this.blockBEM}__grid-time">Time</div> 
                <div class="${this.blockBEM}__grid-description">Description</div>
            </div>
            ${this.oddItems()}`
        )
    }

    evenBody() {
        return (
            `<div class="${this.blockBEM}__grid-header">
                <div class="${this.blockBEM}__grid-task">Task</div> 
                <div class="${this.blockBEM}__grid-done">Done</div>
            </div>
            ${this.evenItems()}`
        )
    }

    oddPage(){
        return(
            `<article class="${this.blockBEM}__page ${this.blockBEM}__page--odd">
                <header class="${this.blockBEM}__header">
                    ${this.oddPageHeader()}
                </header>
                ${this.oddBody()}
            </article>`
        )
    }

    evenPage() {
        return (
            `<article class="${this.blockBEM}__page ${this.blockBEM}__page--even">
                <header class="${this.blockBEM}__header">
                    ${this.evenPageHeader()}
                </header>
                ${this.evenBody()}
            </article>`
        )
    }

    render() {
        const oddPage = this.oddPage();
        const evenPage = this.evenPage();
        return (
            `<section class="${this.blockBEM}">
            ${oddPage}
            ${evenPage}
            </section>`
        );
    }

}