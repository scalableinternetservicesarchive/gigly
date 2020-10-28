import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
// import hello from '../../../../../public/assets/julia.jpg';
import { NavBar } from '../nav/NavBar';
import { AppRouteParams } from '../nav/route';

interface PlaygroundPageProps extends RouteComponentProps, AppRouteParams { }

interface TestUser {
  name: string;
  email: string;
  phone: string;
}

interface ListingInfo {
  title: string;
  numPics: number;
}

interface Hour {
  dayIndex: number;
  hourIndex: number;
  checked: number;
}

function getHourBox(h: Hour) {
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

function getDayColumn(d: number, hourBools: number[], earliestTime: number, latestTime: number, abbrev: string) {
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
      {hoursOfDay.map(testhour => getHourBox(testhour))}
    </div>
  )
}

function getSundayColumn(d: number, hourBools: number[], earliestTime: number, latestTime: number, abbrev: string) {
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
      {hoursOfDay.map(testhour => getHourBoxLeft(testhour))}
    </div>
  )
}

function getAvailabilityChart(bools: number[][]) {
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
      <div style={{ flex: '12.5%', width: '100%' }}> {getSundayColumn(0, bools[0], earliest, latest, 'S')} </div>
      <div style={{ flex: '12.5%', width: '100%' }}> {getDayColumn(0, bools[1], earliest, latest, 'M')} </div>
      <div style={{ flex: '12.5%', width: '100%' }}> {getDayColumn(0, bools[2], earliest, latest, 'T')} </div>
      <div style={{ flex: '12.5%', width: '100%' }}> {getDayColumn(0, bools[3], earliest, latest, 'W')} </div>
      <div style={{ flex: '12.5%', width: '100%' }}> {getDayColumn(0, bools[4], earliest, latest, 'R')} </div>
      <div style={{ flex: '12.5%', width: '100%' }}> {getDayColumn(0, bools[5], earliest, latest, 'F')} </div>
      <div style={{ flex: '12.5%', width: '100%' }}> {getDayColumn(0, bools[6], earliest, latest, 'S')} </div>
    </div>
  )
}

export function PlaygroundPage(props: PlaygroundPageProps) {
  const [user] = React.useState<TestUser>({ name: 'Julia B.', email: 'julia@gmail.com', phone: '(123) 456 - 7890' });
  const [listing] = React.useState<ListingInfo>({ title: 'Tutoring Near UCLA', numPics: 3 });
  const [showingImages, setShowImg] = React.useState(true);
  const [curPic, setCurPic] = React.useState(0);

  var pics = ['https://images.unsplash.com/photo-1547567667-1aa64e6f58dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1598647401237-a9387d7ae2da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1748&q=80',
    'https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'];

  var picIndices = [];
  for (var i = 0; i < pics.length; i++) {
    picIndices.push(i);
  }

  var bools = [[0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0]];


  return <>
    {/* <head>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet"> </link>
    </head> */}
    <div style={{ backgroundColor: 'rgb(88,98,111)', display: 'flex', justifyContent: 'center', height: '100vh', width: '100%', padding: '3.5%' }}>
      <NavBar />
      <div style={{ backgroundColor: 'white', display: 'flex', width: '70%', height: '82.5vh', minWidth: '400px', borderRadius: '3%', padding: '4.5%' }}>
        <div style={{ flex: '37.5%', borderRight: '1px solid #E5E5E5', overflow: 'scroll' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5%', marginTop: '2.5%' }}>
            <div style={{ width: '10vh', height: '10vh', WebkitBorderRadius: '10vh', borderRadius: '10vh', border: '0.5px solid #18A0FB', backgroundPositionY: 'center', backgroundSize: 'cover', backgroundImage: "url(" + "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80" + ")" }}>
            </div>
            <h1 style={{ marginLeft: '5%', fontSize: '1.6em' }}>
              {user.name}
            </h1>
          </div>
          <div style={{ display: 'flex', marginLeft: '2%' }}>
            <div style={{ width: '25px', height: '25px', backgroundColor: 'blue' }}></div>
            <h2 style={{ fontSize: '0.9em', marginLeft: '2%' }}>
              {user.phone}
            </h2>
          </div>
          <div style={{ display: 'flex', marginLeft: '2%' }}>
            <div style={{ width: '25px', height: '25px', backgroundColor: 'blue' }}></div>
            <h2 style={{ fontSize: '0.9em', marginLeft: '2%' }}>
              {user.email}
            </h2>
          </div>
          <form>
            <div style={{ width: "60%", border: '1px solid #808080', display: 'flex', borderRadius: '20px', paddingLeft: '5%', paddingTop: '2.5%', paddingBottom: '2.5%', marginTop: '5%' }}>
              <textarea style={{ fontSize: '0.9em', color: '#808080', resize: 'none' }} placeholder='Message Julia' rows={1} />
            </div>
          </form>
          <h1 style={{ fontSize: '0.9em', letterSpacing: '1.25px', marginTop: '10%' }}>
            ABOUT
          </h1>
          <p style={{ fontSize: '0.9em', marginRight: '10%', marginTop: '4%', lineHeight: '1.25em' }}>
            Hi my name is Julia and I am good at tutoring people I have experience in UPE blah blah.
          </p>
          <h1 style={{ fontSize: '0.9em', letterSpacing: '1.25px', marginTop: '10%' }}>
            DESCRIPTION
          </h1>
          <p style={{ fontSize: '0.9em', marginRight: '10%', marginTop: '4%', lineHeight: '1.25em' }}>
            I offer tutoring for the following UCLA classes:
            <br />
            Math: 32A, 33B
            <br />
            CS: 31, 32, 33, 35L
          </p>
          <h1 style={{ fontSize: '0.9em', letterSpacing: '1.25px', marginTop: '10%' }}>
            TAGS
          </h1>
          <p style={{ fontSize: '0.9em', marginRight: '10%', marginTop: '4%', lineHeight: '1.25em' }}>
            tutoring, math, computer science, UCLA
          </p>
        </div>
        <div style={{ flex: '62.5%', paddingLeft: '7.5%', overflow: 'scroll' }}>
          <h2 style={{ fontSize: '0.9em', letterSpacing: '1.25px' }}>
            OFFERING
          </h2>
          <h1 style={{ fontSize: '1.5em', marginTop: '1.5%' }}>
            {listing.title}
          </h1>
          <div style={{ display: 'flex', marginTop: '2.5%' }}>
            <div style={{ flex: '40%', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: 'blue' }}></div>
              <p style={{ marginLeft: '3%' }}>$0/hr</p>
            </div>
            <div style={{ flex: '60%', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: 'blue' }}></div>
              <p style={{ marginLeft: '3%' }}>1 mile away</p>
            </div>
          </div>
          <div style={{ display: 'flex', marginTop: '10%' }}>
            {showingImages ?
              <h2 style={{ fontSize: '0.9em', letterSpacing: '1.25px', WebkitTextStrokeWidth: '1px' }}>
                IMAGES </h2>
              : <h2 onClick={() => setShowImg(true)} style={{ fontSize: '0.9em', letterSpacing: '1.25px' }}>
                IMAGES </h2>}
            {showingImages ?
              <h2 onClick={() => setShowImg(false)} style={{ fontSize: '0.9em', letterSpacing: '1.25px', marginLeft: '10%' }}>
                AVAILABILITY </h2>
              : <h2 style={{ fontSize: '0.9em', letterSpacing: '1.25px', WebkitTextStrokeWidth: '1px', marginLeft: '10%' }}>
                AVAILABILITY </h2>}
          </div>
          {showingImages ?
            <div style={{ width: '100%', marginRight: '10%', marginTop: '5%' }}>
              <div style={{ display: 'flex' }}>
                {picIndices.map((pi) =>
                  (pi == curPic) ?
                    <div onClick={() => setCurPic(pi)} style={{ width: '1.25vh', height: '1.25vh', borderRadius: '1.25vh', marginRight: '2vh', marginBottom: '2vh', backgroundColor: '#808080' }}></div>
                    :
                    <div onClick={() => setCurPic(pi)} style={{ width: '1.25vh', height: '1.25vh', borderRadius: '1.25vh', marginRight: '2vh', marginBottom: '2vh', backgroundColor: '#C4C4C4' }}></div>)}
              </div>
              <div style={{ height: '45vh', width: '100%', backgroundSize: 'cover', backgroundImage: "url(" + pics[curPic] + ")" }}>
              </div>
            </div>
            :
            <div style={{ width: '100%', marginRight: '10%', marginTop: '5%' }}>
              <div style={{ width: '100%', display: 'flex' }}> {getAvailabilityChart(bools)} </div>
            </div>
          }
        </div>
      </div>
    </div>
  </>
}


// function getPlaygroundApp(app?: PlaygroundApp) {
//   if (!app) {
//     return <div>choose an app</div>
//   }
//   switch (app) {
//     case PlaygroundApp.SURVEYS:
//       return <div style={{display: 'flex', height: '100vh', width: '100%'}}>
//           <div style={{flex: '50%', backgroundColor: 'blue'}}>pressure</div>
//           <div style={{flex: '50%', backgroundColor: 'blue'}}>pressure</div>
//       </div>
//     case PlaygroundApp.LOGIN:
//       return <Login />
//     default:
//       throw new Error('no app found')
//   }
// }

