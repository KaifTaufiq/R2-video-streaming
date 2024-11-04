# HLS Video Transcoder

A proof of concept script to transcode video.

There are three parts.

### Video Chunker

A typescript script to programatically transcode video into:

1. chunked into 4 second chunks
2. available in multiple resolutions each with their own .m3u8 file
3. a master .m3u8 file

## Video Viewer

A sample HTML file using [Media Chrome](https://github.com/muxinc/media-chrome) and [hls-video-element](https://github.com/muxinc/media-elements/tree/main/packages/hls-video-element) to stream and adapt resolution of the above transcoded video

## Cloudflare R2 Deployment

A script to sync the output video files to Cloudflare R2. Currently this script is just `rclone copy ./output/dbngin/ r2demo:streaming-video/dbngin`

## Cloudflare Worker

TODO. A worker to:

1. Limit access to video files
2. Enable CDN cache for the video chunks so it will be fast around the wold

<!--
## commands:

ffmpeg -i ./01\ -\ Tooling\ and\ Setup.mp4 -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls output.m3u8

ffmpeg -i ./input/01\ -\ Tooling\ and\ Setup.mp4 \
 -filter:v:0 scale=w=854:h=480 -c:v:0 libx264 -b:v:0 1400k -hls_time 10 -hls_list_size 0 -f hls output_480p.m3u8 \
 -filter:v:2 scale=w=1920:h=1080 -c:v:2 libx264 -b:v:2 5000k -hls_time 10 -hls_list_size 0 -f hls output_1080p.m3u8

ffmpeg -i hello.mp4 -vf "scale=-2:1080" -c:v libx264 -b:v "8000k" -c:a aac -b:a 128k -preset veryfast -crf 20 -g 48 -keyint*min 48 -sc_threshold 0 -hls_time 4 -hls_playlist_type vod -hls_segment_filename "${output_subdir}/${input_filename}*${resolution}_%03d.ts" "$output_resolution_file"

Chunking without transcoding: ffmpeg -i ./01\ -\ Tooling\ and\ Setup.mp4 -vcodec copy -acodec copy -f segment -muxdelay 0 -segment_list out.m3u8 out%d.ts

-->
