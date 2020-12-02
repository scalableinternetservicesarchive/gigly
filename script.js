import http from 'k6/http'
import { sleep } from 'k6'
import { Counter, Rate } from 'k6/metrics'

export const options = {
  scenarios: {
    example_scenario: {
      // name of the executor to use
      executor: 'ramping-arrival-rate',
      // common scenario configuration
      startRate: '50',
      timeUnit: '1s',
      // executor-specific configuration
      preAllocatedVUs: 50,
      maxVUs: 100,
      stages: [
        { target: 200, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
    },
  },
}

export default function () {
  // recordRates(
  // const resp = http.post(
  //   'http://localhost:3000/graphql',
  //   '{"operationName":"FetchListings","variables":{},"query":"query FetchListings {\n  listings {\n    id\n    username\n    price\n    sellingName\n    __typename\n  }\n}\n"}',
  //   {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // )
  // )
  // http.post(
  //   'http://localhost:3000/graphql',
  //   '{"operationName":"AddListing","variables":{"input":{"username":"Julia Baylon","userId_ref":2,"price":0,"sellingName":"hello","startDate":"","endDate":"","location":"","description":"","image":""}},"query":"mutation AddListing($input: ListingInput!) {\n  addListing(listing: $input) {\n    username\n    price\n    sellingName\n    __typename\n  }\n}\n"}',
  //   {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }
  // )
// let query = `
//   mutation{
//     addComment(
//       comment: {
//         date: "11/26/2020 at 21:50 PM"
//         commentContents: "testing"
//         listingId_ref: 3
//         userId: 2
//         username: "Chelsey Wang"
//         userPic: ""
//       }) {
//       date
//       commentContents
//       listing {
//         id
//       }
//       userId
//       username
//       userPic
//     }
//   }`;
//   const resp = http.post(
//     'http://localhost:3000/graphql',
//     JSON.stringify({ query: query }),
//     // '{"operationName":"AddComment","variables":{"input":{"date":"11/26/2020 at 21:50 PM","commentContents":"test","listingId_ref":4,"userId":2,"username":"Chelsey Wang","userPic":"https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80"}},"query":"mutation AddComment($input: CommentInput!){\n  addComment(comment: $input) {\n    date\n    commentContents\n    listing {\n      id\n      __typename\n    }\n    userId\n    username\n    userPic\n    __typename\n  }\n}\n"}',
//     {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }
//   )
let query = `
  mutation {
    addListing(listing: {
      username: "Julia Baylon"
      userId_ref: 2
      price: 0
      sellingName: "hello10"
      startDate: ""
      endDate: ""
      location: ""
      description: ""
      image: ""
  }) {
      username
      price
      sellingName
    }
  }
  `;
  const resp = http.post(
    'http://localhost:3000/graphql',
    JSON.stringify({ query: query }),
    // '{"operationName":"AddComment","variables":{"input":{"date":"11/26/2020 at 21:50 PM","commentContents":"test","listingId_ref":4,"userId":2,"username":"Chelsey Wang","userPic":"https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80"}},"query":"mutation AddComment($input: CommentInput!){\n  addComment(comment: $input) {\n    date\n    commentContents\n    listing {\n      id\n      __typename\n    }\n    userId\n    username\n    userPic\n    __typename\n  }\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  sleep(1)
  // http.get('http://localhost:3000/')
  recordRates(http.get('http://localhost:3000/app/selling'))
}

const count200 = new Counter('status_code_2xx')
const count300 = new Counter('status_code_3xx')
const count400 = new Counter('status_code_4xx')
const count500 = new Counter('status_code_5xx')

const rate200 = new Rate('rate_status_code_2xx')
const rate300 = new Rate('rate_status_code_3xx')
const rate400 = new Rate('rate_status_code_4xx')
const rate500 = new Rate('rate_status_code_5xx')

function recordRates(res) {
  if (res.status >= 200 && res.status < 300) {
    count200.add(1)
    rate200.add(1)
  } else if (res.status >= 300 && res.status < 400) {
    console.log(res.body)
    count300.add(1)
    rate300.add(1)
  } else if (res.status >= 400 && res.status < 500) {
    count400.add(1)
    rate400.add(1)
  } else if (res.status >= 500 && res.status < 600) {
    count500.add(1)
    rate500.add(1)
  }
}