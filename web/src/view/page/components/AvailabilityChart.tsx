import * as React from 'react';

interface Hour {
  dayIndex: number;
  hourIndex: number;
  checked: number;
}

function getHourBox(h: Hour) {
  var [curChecked, setCurChecked] = React.useState(h.checked);
  return (
    <div key={(h.dayIndex) * 24 + h.hourIndex} >
      {
        (curChecked == 1) ?
          <div onClick={() => { setCurChecked(0) }} style={{ backgroundColor: '#78A1E0', borderRight: '1px solid #707070', borderBottom: '1px solid #707070', height: '3vh' }}></div>
          :
          <div onClick={() => { setCurChecked(1) }} style={{ borderRight: '1px solid #707070', borderBottom: '1px solid #707070', height: '3vh' }}></div>
      } </div>
  )
}

function getHourBoxView(h: Hour) {
  return (
    <div key={(h.dayIndex) * 24 + h.hourIndex} >
      {
        (h.checked == 1) ?
          <div style={{ backgroundColor: '#78A1E0', borderRight: '1px solid #707070', borderBottom: '1px solid #707070', height: '3vh' }}></div>
          :
          <div style={{ borderRight: '1px solid #707070', borderBottom: '1px solid #707070', height: '3vh' }}></div>
      } </div>
  )
}

function getHourBoxLeft(h: Hour) {
  var [curChecked, setCurChecked] = React.useState(h.checked);
  return (
    <div key={(h.dayIndex) * 24 + h.hourIndex} >
      {
        (curChecked == 1) ?
          <div onClick={() => { setCurChecked(0) }} style={{ backgroundColor: '#78A1E0', borderRight: '1px solid #707070', borderBottom: '1px solid #707070', height: '3vh' }}></div>
          :
          <div onClick={() => { setCurChecked(1) }} style={{ borderLeft: '1px solid #707070', borderRight: '1px solid #707070', borderBottom: '1px solid #707070', height: '3vh' }}></div>
      } </div>
  )
}

function getHourBoxLeftView(h: Hour) {
  return (
    <div key={(h.dayIndex) * 24 + h.hourIndex} >
      {
        (h.checked == 1) ?
          <div style={{ backgroundColor: '#78A1E0', borderRight: '1px solid #707070', borderBottom: '1px solid #707070', height: '3vh' }}></div>
          :
          <div style={{ borderLeft: '1px solid #707070', borderRight: '1px solid #707070', borderBottom: '1px solid #707070', height: '3vh' }}></div>
      } </div>
  )
}

function getDayColumn(d: number, hourBools: number[], earliestTime: number, latestTime: number, abbrev: string, editingView: boolean) {
  var hoursOfDay: Hour[] = [];
  for (var i = earliestTime; i < latestTime + 1; i++) {
    hoursOfDay.push(
      { dayIndex: d, hourIndex: i, checked: hourBools[i] }
    );
  }
  return (
    <div>
      <div style={{ height: '4vh', borderBottom: '1px solid #707070', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: '0.8em', width: '3vh', height: '3vh', borderRadius: '3vh', backgroundColor: '#6DA1E5', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {abbrev}
        </div>
      </div>
      {editingView ? hoursOfDay.map(testhour => getHourBox(testhour)) : hoursOfDay.map(testhour => getHourBoxView(testhour))}
    </div>
  )
}

function getSundayColumn(d: number, hourBools: number[], earliestTime: number, latestTime: number, abbrev: string, editingView: boolean) {
  var hoursOfDay: Hour[] = [];
  for (var i = earliestTime; i < latestTime + 1; i++) {
    hoursOfDay.push(
      { dayIndex: d, hourIndex: i, checked: hourBools[i] }
    );
  }
  return (
    <div>
      <div style={{ height: '4vh', borderBottom: '1px solid #707070', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: '0.8em', width: '3vh', height: '3vh', borderRadius: '3vh', backgroundColor: '#6DA1E5', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {abbrev}
        </div>
      </div>
      {editingView ? hoursOfDay.map(testhour => getHourBoxLeft(testhour)) : hoursOfDay.map(testhour => getHourBoxLeftView(testhour))}
    </div>
  )
}

export function AvailabilityChart(bools: number[][], editingView: boolean) {
  var earliest = 23; var latest = 0;
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 24; j++) {
      if ((bools[i][j] == 1) && (j < earliest)) {
        earliest = j;
      }
      if ((bools[i][j] == 1) && (j > latest)) {
        latest = j;
      }
    }
  }
  if (editingView) {
    earliest = 0;
    latest = 23;
  }
  var hrs = ['5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM',
    '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM',
    '9 PM', '10 PM', '11 PM', '12 AM', '1 AM', '2 AM', '3 AM', '4 AM'];
  var hours = hrs.slice(earliest, latest + 1);

  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <div style={{ fontSize: '0.8em', letterSpacing: '1.25px', paddingRight: '3px', color: '#707070', textAlign: 'right', flex: '12.5%', width: '100%' }}>
        <div style={{ height: '4vh' }}> </div>
        {hours.map((hr) => <div style={{ height: '3vh' }}>{hr}</div>)}
      </div>
      <div style={{ flex: '12.5%', width: '100%' }}> {getSundayColumn(0, bools[0], earliest, latest, 'S', editingView)} </div>
      <div style={{ flex: '12.5%', width: '100%' }}> {getDayColumn(0, bools[1], earliest, latest, 'M', editingView)} </div>
      <div style={{ flex: '12.5%', width: '100%' }}> {getDayColumn(0, bools[2], earliest, latest, 'T', editingView)} </div>
      <div style={{ flex: '12.5%', width: '100%' }}> {getDayColumn(0, bools[3], earliest, latest, 'W', editingView)} </div>
      <div style={{ flex: '12.5%', width: '100%' }}> {getDayColumn(0, bools[4], earliest, latest, 'R', editingView)} </div>
      <div style={{ flex: '12.5%', width: '100%' }}> {getDayColumn(0, bools[5], earliest, latest, 'F', editingView)} </div>
      <div style={{ flex: '12.5%', width: '100%' }}> {getDayColumn(0, bools[6], earliest, latest, 'S', editingView)} </div>
    </div>
  )
}