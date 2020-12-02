import http from 'k6/http'
import { check, sleep } from 'k6'
import { Counter, Rate } from 'k6/metrics'
export let errorRate = new Rate('errors');
export const options = {
  scenarios: {
    createListing: {
      // name of the executor to use
      executor: 'ramping-arrival-rate',
      // common scenario configuration
      startRate: '50',
      timeUnit: '1s',
      // executor-specific configuration
      preAllocatedVUs: 80,
      maxVUs: 160,
      stages: [
        { target: 100, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
    },
    addComments: {
      // name of the executor to use
      executor: 'ramping-arrival-rate',
      // common scenario configuration
      startRate: '50',
      timeUnit: '1s',
      // executor-specific configuration
      preAllocatedVUs: 120,
      maxVUs: 240,
      stages: [
        { target: 100, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
    },
    signup: {
      // name of the executor to use
      executor: 'ramping-arrival-rate',
      // common scenario configuration
      startRate: '30',
      timeUnit: '1s',
      // executor-specific configuration
      preAllocatedVUs: 30,
      maxVUs: 60,
      stages: [
        { target: 60, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
    },
  },
}

export default function() {
  signup()
  createListing()
  addComments()
  sleep(1)
  recordRates(http.get('http://localhost:3000/app/selling'))
  recordRates(http.get('http://localhost:3000/app/projects')) //my account endpoint
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
          listingId_ref: ${__VU}
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