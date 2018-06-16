import { request } from '../request';

export function fetchAvatar() {
  return request({
    method: 'personal',
    options: {
      method: 'GET'
    }
  });
}

export function fetchImages(params) {
  return request({
    method: 'uploadImages',
    options: {
      method: 'PUT',
      body: params.formData,
      sign: true
    }
  });
}

export function fetchUploadAvatar(params) {
  return request({
    method: 'uploadAvatar',
    options: {
      method: 'PUT',
      body: params.formData,
      sign: true
    }
  });
}