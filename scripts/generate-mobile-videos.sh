#!/bin/bash

# Generate mobile versions of videos (720px width)
# Usage: ./scripts/generate-mobile-videos.sh

VIDEO_DIR="public/video"
MOBILE_WIDTH=720
CRF=28  # Quality: 18-28 recommended, higher = smaller file

echo "🎬 Generating mobile video versions..."
echo "================================================"

for video in "$VIDEO_DIR"/*.mp4; do
    filename=$(basename "$video")

    # Skip if already a mobile version
    if [[ "$filename" == *"-mobile.mp4" ]]; then
        echo "⏭️  Skipping $filename (already mobile version)"
        continue
    fi

    # Output filename
    name="${filename%.mp4}"
    output="$VIDEO_DIR/${name}-mobile.mp4"

    # Check if mobile version already exists
    if [[ -f "$output" ]]; then
        echo "⏭️  Skipping $filename (mobile version exists)"
        continue
    fi

    # Get original dimensions
    original_width=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$video")
    original_height=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$video")
    original_size=$(du -h "$video" | cut -f1)

    echo ""
    echo "📹 Processing: $filename"
    echo "   Original: ${original_width}x${original_height} ($original_size)"

    # Skip if already smaller than target
    if [[ "$original_width" -le "$MOBILE_WIDTH" ]]; then
        echo "   ⏭️  Skipping (already ${original_width}px wide)"
        continue
    fi

    # Generate mobile version
    echo "   🔄 Generating ${MOBILE_WIDTH}px version..."

    ffmpeg -i "$video" \
        -vf "scale=${MOBILE_WIDTH}:-2" \
        -c:v libx264 \
        -crf $CRF \
        -preset slow \
        -profile:v main \
        -movflags +faststart \
        -an \
        -y \
        "$output" 2>/dev/null

    if [[ $? -eq 0 ]]; then
        new_size=$(du -h "$output" | cut -f1)
        new_dimensions=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$output")
        echo "   ✅ Created: ${name}-mobile.mp4 (${new_dimensions}, $new_size)"
    else
        echo "   ❌ Error processing $filename"
    fi
done

echo ""
echo "================================================"
echo "✅ Done! Mobile videos generated in $VIDEO_DIR"
echo ""
echo "📋 Summary:"
ls -la "$VIDEO_DIR"/*.mp4 | awk '{print "   " $9 " (" $5 ")"}'
