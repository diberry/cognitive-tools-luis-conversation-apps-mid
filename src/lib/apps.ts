const request = require("requestretry");

// retry recount
const retry = 5;

// 429 - too many requests per second
const retryStrategy = function (err, response) {

  return !!err || response.statusCode === 429;
}

function myDelayStrategy(){
  // set delay of retry to a random number between 500 and 3500 ms
  return 500; //Math.floor(Math.random() * (3500 - 500 + 1) + 500);
}

export class Apps {

  public async list(key, endpoint, skip=0, take=500):Promise<any> {
    
    try {

      let requestOptions = {
        method: "GET",
        url: `https://${endpoint}/luis/api/v2.0/apps?skip=${skip},take=${take}`,
        headers: {
          "Ocp-Apim-Subscription-Key": key
        },
        fullResponse: true,
        maxAttempts: retry,
        retryDelay: myDelayStrategy,
        retryStrategy: retryStrategy
      };
    
      const response = await request(requestOptions);
      return response.body;

    } catch (err) {
      throw err;
    }
  }
}
