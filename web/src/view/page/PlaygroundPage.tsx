import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { NavBar } from '../nav/NavBar';
import { AppRouteParams } from '../nav/route';
// import { AppRouteParams } from '../nav/route';
// import { toast } from '../toast/toast';
// import { AvailabilityChart } from './components/AvailabilityChart';
import { Popup } from './components/Popup';

// import { addComment } from './mutateComments';

interface PlaygroundPageProps extends RouteComponentProps, AppRouteParams { }

// function getNewCommentArea(userProfPic: string) {
//   const [comment, editComment] = React.useState<Comment>({
//     commenter: 'uMMMMM plcholder',
//     date: '11/4/2020',
//     commenterPic: userProfPic,
//     comment: '',
//   })

//   return (
//     <div style={{ width: '100%', display: 'flex', marginTop: '5%' }}>
//       <div style={{ flex: '10%' }}> {getCommenterPhoto(userProfPic)} </div>
//       <form style={{ width: "100%", flex: '90%', display: 'flex' }}>
//         <div style={{ flex: '90%', marginLeft: '5%', marginTop: '2vh', borderBottom: '1.5px solid #18A0FB', display: 'flex', paddingBottom: '5px' }}>
//          {/* <textarea rows={1} style={{ maxHeight: '500px', width: "100%", fontSize: '0.9em', color: '#808080', resize: 'none' }} placeholder='Add a comment...' /> */}
//          <TextareaAutosize
//          placeholder='Add a comment...'
//          style={{ width: "100%", fontSize: '0.9em', color: '#808080', resize: 'none' }}
//          onChange={e =>
//           editComment({
//             commenter: comment.commenter,
//             date: comment.date,
//             commenterPic: comment.commenterPic,
//             comment: e.target.value,
//           })
//          }
//          />
//         </div>
//         <CommentPostButton
//           type="submit"
//           onClick={() => {
//              handleSubmit(679, comment.commenter, comment.comment);
//           }}
//         >
//           POST
//         </CommentPostButton>
//       </form>
//     </div>
//   )
// }


export function PlaygroundPage(props: PlaygroundPageProps) {

  var listingId = 1;

  return <>
    <NavBar />
    <Popup listingId={listingId} />
     <div style={{ backgroundColor: 'rgb(88,98,111)', display: 'flex', justifyContent: 'center', height: '100vh', width: '100%', padding: '6%' }}></div>
  </>
}
