import ffmpeg from 'fluent-ffmpeg';

type Resolution = [width: number, height: number];
export async function getResolution(input: string): Promise<Resolution> {
  const { promise, resolve, reject } = Promise.withResolvers();
  ffmpeg.ffprobe(input, (err, metadata) => {
    if (err) {
      reject(err);
    } else {
      const video_stream = metadata.streams.find(stream => stream.codec_type === 'video');
      resolve([video_stream.width, video_stream.height]);
    }
  });
  return promise;
}
