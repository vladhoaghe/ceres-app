import React from 'react';
import { ro } from 'date-fns/locale'
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './Calendar.css';

function Calendar(props) {
	// <Calendar handleDate={handleDate}/> 
	const [state, setState] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection'
		}
    ]);
    
    function handleDate(item) {
		setState([item.selection]);
		props.handleDate({
			startDate: item.selection.startDate,
			endDate: item.selection.endDate
		});
	}
	
	return (<DateRange
    	locale = {ro}
    	editableDateInputs={true}
		onChange={item => {handleDate(item)}}
		moveRangeOnFirstSelection={false}
		ranges={state}
		showMonthAndYearPickers={false}
		scroll={{ enabled: true }}
		maxDate = {new Date()}
		showMonthArrow = {false}
		rangeColors = {['#46A346']}
	/>);

}

export default Calendar;