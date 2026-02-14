# User Guide: Profile & Portfolio Management System

Welcome to your enhanced portfolio website! This guide will help you use all the new features.

---

## 🎯 Quick Start

### Accessing the App
- Development: `npm run dev` → Open http://localhost:5173
- Production: `npm run build` → Serve the `dist/` folder

---

## 👤 Profile Management

### Editing Your Profile

1. **Click the "Edit Profile" button** next to your profile section on the home page
2. **Update your information:**
   - Name, Role, Bio, Email
   - Skills (comma-separated, e.g., "React, TypeScript, Figma")
3. **Add a profile photo:**
   - Click to select an image
   - Image will be automatically compressed (800px max width)
   - Preview displays below the input
4. **Save or Cancel:**
   - Click "Save Profile" to persist changes to localStorage
   - Click "Cancel" to discard changes

**Note:** Your profile is saved to `localStorage` under key `profiling_profile`

---

## 🖼️ Portfolio Management

### Adding a New Portfolio

1. **Click "+ Add Project"** button in the Portfolio section
2. **Fill in the details:**
   - **Title** (required)
   - **Images** (optional, up to 7 images)
   - **Description**
   - **Skills** (comma-separated)

### Uploading Images

**Three ways to add images:**

1. **Click "Select Images"** button in the dropzone
2. **Drag & Drop** images directly into the dropzone area
3. **Both methods support multiple files** at once

**Image Limits:**
- Maximum 7 images per portfolio
- Each image is automatically compressed (~100KB)
- First image becomes the portfolio thumbnail

**Image Management:**
- Hover over an image to see the remove button (✕)
- Drag images to reorder them
- Counter shows: "3 / 7 images"

### Saving Portfolio

1. Fill in all desired fields
2. Click "Save Portfolio" button
3. Portfolio is saved to localStorage

**Note:** Portfolios are saved to `localStorage` under key `profiling_portfolios`

### Viewing Portfolio Details

1. Click on a portfolio card in the portfolio grid
2. **Detail page shows:**
   - All uploaded images in a responsive gallery
   - Portfolio title, description, and skills
   - Edit and Delete buttons

### Editing a Portfolio

1. Click the **"Edit" button** on the portfolio detail page
2. The form opens with all existing data pre-filled
3. Modify any fields or images
4. Click "Update Portfolio" to save changes

**Edit Features:**
- Add more images (up to 7 total)
- Remove unwanted images
- Reorder images
- Change title, description, skills

### Deleting a Portfolio

1. Click the **"Delete" button** on the portfolio detail page
2. A confirmation dialog appears asking "Are you sure?"
3. Click "Delete" to confirm removal
4. You'll be redirected to the home page

**Warning:** Deletion is permanent and cannot be undone.

---

## 🌓 Dark Mode

### Toggling Dark Mode

1. Look for the **theme toggle button** in the header (🌙 or ☀️)
2. Click to switch between light and dark themes
3. Theme preference is saved automatically

### Theme Features

- **Automatic system detection:** If your system prefers dark mode, the app starts in dark mode
- **Manual override:** Click the toggle to switch anytime
- **Persistent:** Your theme choice is saved in localStorage
- **Smooth transitions:** Colors fade smoothly when switching themes

---

## 💾 Data Storage

### How Data is Stored

All data is saved locally in your browser's localStorage:
- **Profile:** `profiling_profile` key
- **Portfolios:** `profiling_portfolios` key
- **Theme:** `theme` key

### Important Notes

- **No server required** - Everything works offline
- **Storage limit:** ~5-10MB in most browsers
- **Image compression:** Automatically optimizes images to ~100KB each
- **Data persistence:** Data remains even after closing the browser

### Managing Storage

If you run out of storage:
1. Delete portfolios you no longer need
2. Images are automatically compressed
3. Each portfolio with 7 images takes ~700KB
4. You can store approximately 7-10 portfolios with multiple images

---

## ⌨️ Keyboard Shortcuts

- **Tab:** Navigate through form fields
- **Enter:** Submit form (in form context)
- **Escape:** May close dialogs (if implemented)

---

## 🔍 Troubleshooting

### Images won't upload
- Check file format (supports: JPEG, PNG, GIF, WebP, etc.)
- Ensure file size is reasonable (compression handles large files)
- Try refreshing the page if stuck

### Storage full error
- Delete some portfolios or images
- The app will show a warning if space is low
- Images are automatically compressed to save space

### Changes not saving
- Ensure JavaScript is enabled
- Check browser console for errors (F12 → Console tab)
- Try clearing browser cache if experiencing issues
- Verify localStorage is enabled in browser settings

### Dark mode not persisting
- Check if cookies/storage is enabled
- Try toggling dark mode again
- Clear browser cache and reload

---

## 📱 Mobile Usage

The site is fully responsive and works great on mobile:

### Mobile-specific features:
- Touch-friendly buttons and inputs
- 2-column image grid (vs 3 on desktop)
- Stacked dialog buttons for easier tapping
- Full-width forms

### Tips for mobile:
- Use landscape mode for better form visibility
- Tap the image X button to remove images
- Drag images to reorder (if your browser supports it)
- Theme toggle is in the header (may need to scroll right)

---

## 🎨 Customization Tips

### Changing Colors

To customize colors, edit the CSS variables in `src/index.css`:

```css
:root {
  --color-dark: #272727;        /* Dark color */
  --color-orange: #ff8614;      /* Accent color */
  /* ... other colors ... */
}
```

For dark mode:
```css
[data-theme="dark"] {
  --color-text: #f5f3f0;        /* Light text in dark mode */
  /* ... other colors ... */
}
```

---

## 📊 File Size Information

### Typical Storage Usage

- **Profile with photo:** ~200KB
- **Portfolio card:** ~150KB (without images)
- **Image (7 per portfolio):** ~700KB total (~100KB each compressed)

**Example:**
- 5 portfolios with 7 images each = ~4-5MB total
- 10 portfolios with 7 images each = ~8-10MB total

---

## 🚀 Performance Tips

1. **Compress images before upload** for faster processing
2. **Delete old portfolios** you're no longer showcasing
3. **Clear browser cache** periodically
4. **Use the browser's dev tools** (F12) to monitor performance

---

## 🆘 Getting Help

If you encounter issues:

1. **Check the browser console** (F12 → Console)
2. **Try hard refresh** (Ctrl+Shift+R or Cmd+Shift+R)
3. **Clear localStorage** if severely broken:
   ```javascript
   // In browser console:
   localStorage.clear();
   ```
4. **Report bugs** with error messages from the console

---

## 📋 Feature Checklist

- ✅ Edit profile information
- ✅ Add/remove profile photo
- ✅ Create portfolios with up to 7 images
- ✅ Edit portfolio details and images
- ✅ Delete portfolios with confirmation
- ✅ Reorder portfolio images via drag & drop
- ✅ Dark mode toggle
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Automatic image compression
- ✅ localStorage persistence
- ✅ Error handling and validation

---

## 🎉 You're All Set!

Enjoy managing your professional portfolio. Your data is safely stored locally, and you can make changes anytime without needing a backend server.

**Happy showcasing!** 🚀
