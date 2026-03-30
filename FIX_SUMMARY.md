# Mobile Image Preview Fix Needed

## Issue Identified
On mobile devices, after taking a photo with the camera:
- ✅ Desktop: Image appears and stays visible
- ❌ Mobile: Image captured but not visible on page

## Root Cause Analysis

The issue is likely one of:

1. **Canvas sizing on mobile** - Container dimensions might be 0 or incorrect
2. **Image orientation** - Mobile cameras often rotate images (EXIF orientation)
3. **Large image data** - Mobile photos can be very large, causing slow load
4. **Touch event interference** - Touch events might be preventing proper rendering

## Proposed Fixes

### Fix 1: Add Image Element Fallback
Add a visible `<img>` element behind the canvas to ensure the image is always visible:

```tsx
<div className="relative">
  {/* Fallback image display */}
  {image && !imageLoaded && (
    <img 
      src={image} 
      alt="Loading..." 
      className="w-full h-auto"
      onLoad={() => setImageLoaded(true)}
    />
  )}
  
  {/* Canvas for drawing */}
  <canvas ref={canvasRef} />
</div>
```

### Fix 2: Force Canvas Redraw on Mobile
Add mobile detection and force redraw:

```tsx
useEffect(() => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile && imageObj) {
    // Force canvas redraw on mobile
    setTimeout(() => {
      setZoom(prev => prev * 1.001); // Tiny change to trigger redraw
      setZoom(prev => prev / 1.001);
    }, 300);
  }
}, [imageObj]);
```

### Fix 3: Add Loading State
Show loading indicator while image loads:

```tsx
const [isLoading, setIsLoading] = useState(false);

// In handleImageSelect
setIsLoading(true);
const reader = new FileReader();
reader.onload = (e) => {
  onImageSelect(e.target.result);
  // Image will load in MeasurementCanvas
};
```

## Recommended Fix

Apply **Fix 1** (image fallback) + better logging to diagnose mobile-specific issues.

## Testing on Mobile

After fix:
1. Open on mobile device
2. Click upload
3. Take photo
4. Image should appear immediately
5. Should be able to draw on it

## Files to Modify
- `src/components/MeasurementCanvas.tsx` - Add image fallback + mobile detection
- `src/components/ImageUploader.tsx` - Add loading state
- `src/app/page.tsx` - Add mobile debugging
