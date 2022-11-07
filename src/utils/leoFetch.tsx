function updateOptions(options:any) {
  const update = { ...options };
  update.headers = {
    ...update.headers,
    token: localStorage.getItem('token')
  };
  return update;
}

export default function leoFetch(url:any, options:any) {
  return fetch(url, updateOptions(options));
}
