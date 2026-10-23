/** A smaller copy of a project image. Cloudinary resizes on the fly (and picks
    AVIF/WebP for the browser); other URLs are returned unchanged. */
export function thumbnail(url: string, width: number) {
  return url.includes("res.cloudinary.com") ? url.replace("/upload/", `/upload/w_${width},q_auto,f_auto/`) : url;
}
