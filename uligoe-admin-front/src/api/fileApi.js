import { request } from "./request";

export const reqGetFileList = () => request.get('/file');

export const reqInsertFile = (params) => request.post('/file/insert', params);

export const reqDeleteFile = (id, filename) => request.get(`/file/delete/${id}/${filename}`)