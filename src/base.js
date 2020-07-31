/**
 * 请求路径配置 用于区分生产环境还是正式环境
 * */
const NODE_ENV = process.env.NODE_ENV;
const PROXY = NODE_ENV == 'production' ? '':'/proxy';
const FZ = '/lmyz';//
const PREFIX = PROXY+`${FZ}?dapi=`;
export const ORIGIN = window.location.origin;
export const BASEURL= NODE_ENV == 'production' ? ORIGIN+SELLER : PREFIX;
export const PPROTOCOl= window.location.protocol;
