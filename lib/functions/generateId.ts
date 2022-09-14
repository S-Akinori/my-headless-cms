const generateId = (len = 20) => {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let rand_str = '';
  for ( var i = 0; i < len; i++ ) {
    rand_str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return rand_str
}

export default generateId