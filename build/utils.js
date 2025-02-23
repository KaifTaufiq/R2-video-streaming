import ffmpeg from 'fluent-ffmpeg';
export async function getResolution(input) {
    const { promise, resolve, reject } = Promise.withResolvers();
    ffmpeg.ffprobe(input, (err, metadata) => {
        if (err) {
            reject(err);
        }
        else {
            const video_stream = metadata.streams.find(stream => stream.codec_type === 'video');
            resolve([video_stream.width, video_stream.height]);
        }
    });
    return promise;
}
