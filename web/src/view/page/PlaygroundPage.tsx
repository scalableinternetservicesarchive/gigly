import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
// import hello from '../../../../../public/assets/julia.jpg';
import { NavBar } from '../nav/NavBar';
import { AppRouteParams } from '../nav/route';
import { AvailabilityChart } from './components/AvailabilityChart';

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

export function PlaygroundPage(props: PlaygroundPageProps) {
  const [user] = React.useState<TestUser>({ name: 'Julia B.', email: 'julia@gmail.com', phone: '(123) 456 - 7890' });
  const [listing] = React.useState<ListingInfo>({ title: 'Tutoring Near UCLA', numPics: 3 });
  const [showingImages, setShowImg] = React.useState(true);
  const [curPic, setCurPic] = React.useState(0);
  const [selling] = React.useState(true);

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

  var edit = false;

  return <>
    {/* <head>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet"> </link>
    </head> */}
    <div style={{ backgroundColor: 'rgb(88,98,111)', display: 'flex', justifyContent: 'center', height: '100vh', width: '100%', padding: '6%' }}>
      <NavBar />
      <div style={{ backgroundColor: 'white', display: 'flex', width: '67.5%', height: '85vh', minWidth: '400px', borderRadius: '3%', padding: '4.5%' }}>
        <div style={{ flex: '37.5%', borderRight: '1px solid #E5E5E5', overflow: 'scroll' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5%', marginTop: '2.5%' }}>
            <div style={{ width: '10vh', height: '10vh', WebkitBorderRadius: '10vh', borderRadius: '10vh', border: '0.5px solid #18A0FB', backgroundPositionY: 'center', backgroundSize: 'cover', backgroundImage: "url(" + "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80" + ")" }}>
            </div>
            <h1 style={{ marginLeft: '5%', fontSize: '1.6em' }}>
              {user.name}
            </h1>
          </div>
          <div style={{ display: 'flex', marginLeft: '2%', marginBottom: '3%', alignItems: 'center' }}>
            <div style={{ width: '20px', height: '20px', marginRight: '5%', backgroundSize: 'cover', backgroundImage: "url(" + "https://i.ibb.co/0Fzs8GN/phone-call.png" + ")" }}></div>
            <h2 style={{ fontSize: '0.9em', marginLeft: '2%' }}>
              {user.phone}
            </h2>
          </div>
          <div style={{ display: 'flex', marginLeft: '2%', alignItems: 'center' }}>
            <div style={{ width: '20px', height: '20px', marginRight: '5%', backgroundSize: 'cover', backgroundImage: "url(" + "https://i.ibb.co/mT7pkQq/email.png" + ")" }}></div>
            <h2 style={{ fontSize: '0.9em', marginLeft: '2%' }}>
              {user.email}
            </h2>
          </div>
          <form>
            <div style={{ width: "60%", border: '1px solid #808080', display: 'flex', borderRadius: '20px', paddingLeft: '5%', paddingTop: '2.5%', paddingBottom: '2.5%', marginTop: '5%' }}>
              <textarea style={{ fontSize: '0.9em', color: '#808080', resize: 'none' }} placeholder='Message Julia' rows={1} />
            </div>
          </form>
          {selling ? <h1 style={{ fontSize: '0.9em', letterSpacing: '1.25px', marginTop: '10%' }}>
            ABOUT
          </h1> : <h1></h1>}
          {selling ? <p style={{ fontSize: '0.9em', marginRight: '10%', marginTop: '4%', lineHeight: '1.25em' }}>
            Hi my name is Julia and I am good at tutoring people I have experience in UPE blah blah.
          </p> : <p></p>}
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
          {selling ?
            <h2 style={{ fontSize: '0.9em', letterSpacing: '1.25px' }}>
              OFFERING
          </h2> : <h2 style={{ fontSize: '0.9em', letterSpacing: '1.25px' }}>
              LOOKING FOR
          </h2>}
          <h1 style={{ fontSize: '1.5em', marginTop: '1.5%' }}>
            {listing.title}
          </h1>
          <div style={{ display: 'flex', marginTop: '2.5%' }}>
            <div style={{ flex: '40%', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '25px', height: '25px', marginRight: '5%', backgroundSize: 'cover', backgroundImage: "url(" + "https://i.ibb.co/r2jKJkQ/price-tag.png" + ")" }}></div>
              <p style={{ marginLeft: '3%' }}>$0/hr</p>
            </div>
            <div style={{ flex: '60%', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '25px', height: '25px', marginRight: '5%', backgroundSize: 'cover', backgroundImage: "url(" + "https://i.ibb.co/4jjpzFb/navigation.png" + ")" }}></div>
              <p style={{ marginLeft: '3%' }}>Westwood</p>
            </div>
          </div>
          {selling ?
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
            </div> : <div style={{ display: 'flex', marginTop: '10%' }}><h2 style={{ fontSize: '0.9em', letterSpacing: '1.25px', WebkitTextStrokeWidth: '1px' }}>
              AVAILABILITY </h2></div>}
          {(selling && showingImages) ?
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
              <div style={{ width: '99%', display: 'flex' }}> {AvailabilityChart(bools, edit)} </div>
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

