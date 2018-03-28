import moment from 'moment';

import Template from "./template";
import { $on, qs } from "./helpers";

export default class SaintsWeek {

    constructor(domElementSelector){
        const weekData = this.buildWeekData();
        const domElement = qs(domElementSelector);
        domElement.innerHTML = this.init(weekData);
    }

    buildWeekData(indexDate){
        const validDate = moment(indexDate).isValid()
        const idexDay = validDate ? moment(indexDate) : moment();
        const firstDayOfTheWeek = idexDay.startOf('isoWeek'); 
        const week = Array.apply(null, Array(7)).map(function (_, i) {
            return moment(firstDayOfTheWeek, 'e').startOf('isoWeek').isoWeekday(i + 1);
        });
        return (
            week
        )
    }

    init(weekData){
        const template = new Template(weekData);
        return template.render();
    }

}

// $on(window, 'load', setView);
// $on(window, 'hashchange', setView);