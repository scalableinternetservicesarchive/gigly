import http from 'k6/http'
import { check, sleep } from 'k6'
import { Counter, Rate } from 'k6/metrics'
export let errorRate = new Rate('errors');
const listings = 100
export const options = {
  scenarios: {
    signup: {
      executor: 'constant-vus',
      exec: 'signup',
      vus: 60,
      duration: '15s',
    },
    createListing: {
      executor: 'per-vu-iterations',
      exec: 'createListing',
      vus: 100,
      iterations: 1,
      startTime: '15s',
      maxDuration: '5s',
    },
    addComments: {
      executor: 'per-vu-iterations',
      exec: 'addComments',
      vus: 150,
      iterations: 5,
      startTime: '20s',
      maxDuration: '10s',
    },
    addTags: {
      executor: 'per-vu-iterations',
      exec: 'addTags',
      vus: 100,
      startTime: '20s',
      maxDuration: '10s',
    },
    selling: {
      executor: 'per-vu-iterations',
      exec: 'selling',
      vus: 50,
      startTime: '40s',
      maxDuration: '20s',
    },
    profile: {
      executor: 'per-vu-iterations',
      exec: 'profile',
      vus: 50,
      startTime: '30s',
      maxDuration: '10s',
    },

  },
}

export default function() {
  signup()
  createListing()
  addComments()
  addTags()
  sleep(1)
  selling()
  profile()
}

export function profile () {
  recordRates(http.get('http://localhost:3000/app/projects')) //my account endpoint
}
export function selling () {
  http.get('http://localhost:3000/app/selling')
}
export function signup () {
  var url = 'http://localhost:3000/auth/createUser';
  var params = {
    headers: {
      // Authorization: 'Token ffc62b27db68502eebc6e90b7c1476d29c581f4d',
      'Content-Type': 'application/json',
    },
  };
  var data = JSON.stringify({
    email: `${__VU}@gmail.com`,
    name: `John`,
    password: `1234`,
    number: `123123123`,
    location: `Westwood`,
  });
  check(http.post(url, data, params), {
    'status is 201': (r) => r.status == 201,
  }) || errorRate.add(1);
  sleep(1);
}

export function createListing () {
  let query = `
    mutation {
      addListing(listing: {
        username: "bobaaaas"
        userId_ref: 2
        price: 0
        sellingName: "boba"
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
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  sleep(1)
}

export function addComments (){
  let query = `
    mutation{
      addComment(
        comment: {
          date: "11/26/2020 at 21:50 PM"
          commentContents: "testing"
          listingId_ref: ${Math.floor((Math.random() * listings + 1))}
          userId: 2
          username: "Chelsey Wang"
          userPic: ""
        }) {
        date
        commentContents
        listing {
          id
        }
        userId
        username
        userPic
      }
    }`;
  const resp = http.post(
    'http://localhost:3000/graphql',
    JSON.stringify({ query: query }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  sleep(1)
}
const tags = ["GROCERIES", "TUTORING", "HAIRCUT", "OTHER"]
//         type: ${tags[Math.floor((Math.random() * 4) + 1)]}


export function addTags (){
  let query = `mutation{
    addTag(
      tag: {
        type: ${tags[Math.floor((Math.random() * 4))]}
        listingId: ${Math.floor((Math.random() * listings + 1))}
      }
    ){
      type
      listing{
        id
      }
    }
  }`;
  const resp = http.post(
    'http://localhost:3000/graphql',
    JSON.stringify({ query: query }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  sleep(1)
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