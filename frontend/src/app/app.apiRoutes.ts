// For netlify development
/*
export const API_GET_PRODUCTS_PATH
  = 'http://localhost:8888/.netlify/functions/getProducts';

export const API_GET_USER_CART_PATH
  = 'http://localhost:8888/.netlify/functions/getUserCart';

export const API_EDIT_USER_CART_PATH
  = 'http://localhost:8888/.netlify/functions/editUserCart';

export const API_DELETE_USER_PRODUCT_PATH
  = 'http://localhost:8888/.netlify/functions/deleteUserCart';

export const API_IMAGE_PATH
  = 'http://localhost:8888/.netlify/functions/serveImage?imageName=';

export const API_PRODUCTS_FILE_LOCATION
  = '';
*/








// For netlify production
export const API_GET_PRODUCTS_PATH
  = '/.netlify/functions/getProducts';

export const API_GET_USER_CART_PATH
  = '/.netlify/functions/getUserCart';

export const API_EDIT_USER_CART_PATH
  = '/.netlify/functions/editUserCart';

export const API_DELETE_USER_PRODUCT_PATH
  = '/.netlify/functions/deleteUserCart';

export const API_IMAGE_PATH
  = 'https://shopco-fs-webmasters.netlify.app/.netlify/functions/serveImage?imageName=';

export const API_PRODUCTS_FILE_LOCATION
  = '/var/task/backend/data/products.json';

export const API_USER_CART_LOCATION
  = '/var/task/backend/data/user-cart.json';
export const API_IMAGES_LOCATION
  = '/var/task/backend/images';


// for node.js ( launching frontend's and backend's package.json
/*
export const API_GET_PRODUCTS_PATH
  = 'http://localhost:3000/products';

export const API_GET_USER_CART_PATH
  = 'http://localhost:3000/user-cart';

export const API_EDIT_USER_CART_PATH
  = 'http://localhost:3000/user-cart';

export const API_DELETE_USER_PRODUCT_PATH
  = 'http://localhost:3000/user-products';

export const API_IMAGE_PATH
  = 'http://localhost:3000/';
*/
