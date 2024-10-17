// UTILS
export const isHostNetlify = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.location.hostname.includes('netlify.app');  // Runs only in browser
  }
  return process.env["NETLIFY_HOST"] === 'true';  // Use environment variable for server-side
};

const getApiRoute = (path: string): string => {
  if (isHostNetlify()) {
    return `/.netlify/functions/${path}`;
  } else {
    return `http://localhost:3000/${path}`;
  }
};
// Exporting routes
export const API_GET_PRODUCTS_PATH = isHostNetlify() ? getApiRoute('getProducts') : getApiRoute('getProducts');
export const API_GET_PRODUCT_PATH = isHostNetlify() ? getApiRoute('getProductById') : getApiRoute('getProductById');
export const API_GET_USER_CART_PATH = isHostNetlify() ? getApiRoute('getUserCart') : getApiRoute('user-cart');
export const API_EDIT_USER_CART_PATH = isHostNetlify() ? getApiRoute('editUserCart') : getApiRoute('user-cart');
export const API_DELETE_USER_PRODUCT_PATH = isHostNetlify() ? getApiRoute('deleteUserCart') : getApiRoute('user-cart');
export const API_DELETE_USER_CART_PATH = isHostNetlify() ? getApiRoute('clearCart') : getApiRoute('user-cart');
export const API_IMAGE_PATH = isHostNetlify() ?
  'https://shopco-fs-webmasters.netlify.app/.netlify/functions/serveImage?imageName='
  : 'http://localhost:3000/';

export const API_PRODUCTS_FILE_LOCATION
  = '/var/task/backend/data/products.json';

export const API_IMAGES_LOCATION
  = '/var/task/backend/images';





// For netlify development
/*
export const API_GET_PRODUCTS_PATH
  = 'http://localhost:8888/.netlify/functions/getProducts';

export const API_GET_PRODUCT_PATH
  = 'http://localhost:8888/.netlify/functions/getProductById';

export const API_GET_USER_CART_PATH
  = 'http://localhost:8888/.netlify/functions/getUserCart';

export const API_EDIT_USER_CART_PATH
  = 'http://localhost:8888/.netlify/functions/editUserCart';

export const API_DELETE_USER_PRODUCT_PATH
  = 'http://localhost:8888/.netlify/functions/deleteUserCart';

export const API_DELETE_USER_CART_PATH
  = 'http://localhost:8888/.netlify/functions/clearCart';

export const API_IMAGE_PATH
  = 'http://localhost:8888/.netlify/functions/serveImage?imageName=';

export const API_PRODUCTS_FILE_LOCATION
  = './backend/data/products.json';

export const API_USER_CART_LOCATION
  = './backend/data/user-cart.json';

export const API_IMAGES_LOCATION
  = './backend/images';
*/
