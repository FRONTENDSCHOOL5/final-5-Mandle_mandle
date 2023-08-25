import React, { useState } from 'react';
import { StyledCalendar, SelectedDate } from './ClassReservationCalendarStyle';

export function DatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const removeYearNavigation = (e) => {
    e.preventDefault();
    const yearNavigation = document.querySelector(
      '.react-calendar__navigation__arrow'
    );
    if (yearNavigation) {
      yearNavigation.style.display = 'none';
    }
  };

  const tileDisabled = ({ date }) => {
    const currentDate = new Date();
    const isSaturday = date.getDay() === 6;
    const isSunday = date.getDay() === 0;
    const isTwoDaysAgo = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1
    );
  
    return isSaturday || isSunday || date <= isTwoDaysAgo;
  };
  

  const tileClassName = ({ date }) => {
    const isPrevMonth = date.getMonth() < selectedDate.getMonth();
    const isNextMonth = date.getMonth() > selectedDate.getMonth();
    const isSaturday = date.getDay() === 6;
    const isSunday = date.getDay() === 0;
    const isActiveDate =
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();

    return isPrevMonth || isNextMonth || isSaturday || isSunday
      ? null
      : isActiveDate
      ? 'active-date-tile' // 이 클래스에 원하는 스타일을 추가
      : 'weekday-tile';
  };

  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    return new Intl.DateTimeFormat('ko', options).format(date);
  };

  return (
    <>
      <StyledCalendar
        onChange={handleDateChange}
        // value={selectedDate}
        onClickMonth={removeYearNavigation}
        calendarType='US'
        formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
        tileDisabled={tileDisabled}
        tileClassName={tileClassName}
        minDetail="month"
      />
      <SelectedDate>
        <span className='a11y-hidden'>선택한 날짜: </span>
        {formatDate(selectedDate, 'ko')}
      </SelectedDate>
    </>
  );
}
