let backendHost;
const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

if(hostname === 'dev.localhost') {
  backendHost = 'http://localhost:4000';
} else if(hostname === 'localhost') {
  backendHost = 'http://uci.server:4000';
} else if(/^qa/.test(hostname)) {
  backendHost = 'http://qa.server:4000';
} else {
  backendHost = 'http://uci.server:4000';
}

const API_ROOT = backendHost;

export default API_ROOT;