export const checkFileType = (src: string) => {
  const videoExts = new Array('mp4','avi','fiv','mov','wmv');
  const imgExts = new Array('jpg', 'jpeg', 'png', 'svg');
  const pos = src.lastIndexOf('.');
  // check if an extension exists in the file name
	if (pos === -1) return false;

	const ext = src.slice(pos + 1);
  if (videoExts.indexOf(ext) !== -1) return 'video';
  else if(imgExts.indexOf(ext) !== -1) return 'image';
  else return false;
}