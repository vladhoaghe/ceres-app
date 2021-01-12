import React from "react";
import { ro } from "date-fns/locale";
import { useState } from "react";
import "./Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calendar(props) {
    // <Calendar handleDate={handleDate}/>
    const [date, setDate] = useState(props.selectedDate);

    function handleDate(item) {
        setDate(item);
        props.changeSelectedDate(item);
    }

    return (
        <DatePicker
            locale={ro}
            selected={date}
            editableDateInputs={true}
            onChange={(item) => {
                handleDate(item);
            }}
            moveRangeOnFirstSelection={false}
            showMonthAndYearPickers={false}
            scroll={{ enabled: true }}
            maxDate={new Date()}
            showMonthArrow={false}
            rangeColors={["#46A346"]}
            open={props.datePickerIsOpen}
        />
    );
}

export default Calendar;
