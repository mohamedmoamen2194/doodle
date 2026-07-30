import { put, del, list } from '@vercel/blob';

export { put, del, list };

export async function uploadImage(file: File, folder = 'products') {
  const { url } = await put(`${folder}/${Date.now()}-${file.name}`, file, { access: 'public' });
  return url;
}
