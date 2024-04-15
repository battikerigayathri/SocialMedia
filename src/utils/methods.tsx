import lz from 'lzutf8';
import readingDuration from 'reading-duration' 


export const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);

    const options: any = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Kolkata",
    };

    const formattedDate = new Intl.DateTimeFormat("en-IN", options)?.format(date);
    return formattedDate;
  } catch (error) {

  }
};


export const compressJsonToBase64 = (json: any): string => {
  return lz.encodeBase64(lz.compress(json))
}


export const compressBase64ToJson = (content: string): any => {
  return lz.decompress(lz.decodeBase64(content));
}

export async function getBlogReadTime(content: string) {

  const duration = readingDuration(content, {
      emoji: false,
  })
  return duration;
}