export const SERVER_URL = 'http://localhost:8081';
// export const SERVER_URL = 'https://backend.cfp-application.click';
// export const SERVER_URL00 = 'https://cfp-application-backend.azurewebsites.net';

export const SALT = "$2a$12$MDnofLJT8LrIILyh8SCle.";
export const REQUEST_HEADERS = {
  'headers': {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
};

export const REQUEST_HEADERS_IMAGE = {
  'headers': {
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  }
};

export const PATH = 'https://cfp-images.s3.eu-central-1.amazonaws.com/cfp-images/';

export const AUTOMATIC_PATH = 'https://cfp-images.s3.eu-central-1.amazonaws.com/images/';
