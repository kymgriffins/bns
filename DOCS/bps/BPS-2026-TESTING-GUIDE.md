# BPS 2026 Module - Quick Start Testing Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js 18+
- Terminal (zsh recommended)
- Web browser (Chrome, Safari, Firefox, Edge)

### Step 1: Verify Files Were Created

```bash
# Check if all new files exist
ls -la /home/gunzo/Desktop/GR8/bns/app/learn/data/modules/bps-2026/
# Should show:
# - metadata.json
# - slides-stories.json ✅ (NEW)
# - slides-basic.json
# - slides-advanced.json

# Check components
ls -la /home/gunzo/Desktop/GR8/bns/components/learn/ | grep -E "(PopupStory|TransitionWrapper|SlideNavigator|ModuleEditor|SlideEditor)"
# Should show all 5 new components

# Check API routes
ls -la /home/gunzo/Desktop/GR8/bns/app/api/learn/modules/
```

### Step 2: Start the Application

```bash
cd /home/gunzo/Desktop/GR8/bns

# Clear node cache (recommended after updates)
rm -rf .next

# Start dev server
pnpm dev
# or
npm run dev

# Wait for: "✓ Ready in X.XXs"
```

### Step 3: Open in Browser

```
http://localhost:3000/learn
```

You should see the Learning Hub with the BPS 2026 module.

---

## 📚 What to Test

### Test 1: Stories Version (NEW)
1. Go to `/learn`
2. Click on "BPS 2026" module
3. Look for "Stories" tab at the top
4. Click to switch to Stories version
5. **Verify**:
   - ✅ 10 slides load smoothly
   - ✅ Slide transitions are smooth (fade + scale)
   - ✅ Progress bar fills as you advance
   - ✅ Navigation buttons work (Previous/Next)
   - ✅ Quiz question appears at slide 9
   - ✅ CTA at slide 10 offers action buttons

### Test 2: Responsive Design
1. Open Stories version
2. Open browser DevTools (F12 or Cmd+Option+I)
3. Click device toggle for mobile view
4. Test on iPhone 12 (390x844) and iPad (768x1024)
5. **Verify**:
   - ✅ Text is readable at any size
   - ✅ Buttons are touch-friendly
   - ✅ Layout adapts to screen width
   - ✅ Navigation works on mobile
   - ✅ No horizontal scrolling

### Test 3: Smooth Transitions
1. Go through Stories slides slowly
2. Pay attention to slide transitions
3. Watch the progress bar animate
4. **Verify**:
   - ✅ Slides fade in smoothly (not instant)
   - ✅ Content appears with slight delay
   - ✅ Progress bar fills smoothly
   - ✅ Navigation buttons animate on click
   - ✅ No jank or jumpy animations

### Test 4: All Three Levels
1. **Stories** (10 min, 10 slides) - ✅ NEW
   - Tab shows "📖 Stories"
   - Covers: What is BPS, Kenya context, roadmap, chapters, numbers, pillars, risks, quiz, CTA
   
2. **Basic** (10 min, 12 slides)
   - Tab shows "📚 Basics"
   - More detailed concepts and explanations
   
3. **Advanced** (20 min, 20+ slides)
   - Tab shows "🎓 Advanced"
   - Deep dive into BETA Agenda, pillars, fiscal policy

**Verify**: All three load without errors, smooth transitions between tabs

### Test 5: Quiz Functionality
1. Go to Stories slide 9 (Quiz)
2. Try selecting options A, B, C
3. Check if feedback appears
4. **Verify**:
   - ✅ Only one option can be selected
   - ✅ Clicking correct answer shows success message
   - ✅ Clicking wrong answer shows encouragement
   - ✅ Quiz can be retaken

### Test 6: Module Metadata
1. Open browser console (F12)
2. Run:
```javascript
fetch("/api/learn/modules/bps-2026")
  .then(r => r.json())
  .then(console.log)
```

3. **Verify**:
   - ✅ Returns module metadata
   - ✅ Has structure.stories object
   - ✅ Has features.supportsCRUD: true
   - ✅ Status is "published"

### Test 7: API Endpoints

#### Get Stories Slides
```bash
curl http://localhost:3000/api/learn/modules/bps-2026/slides/stories
```
**Verify**: 
- ✅ Returns JSON with 10 slides
- ✅ First slide has type: "cover"
- ✅ Slide 9 has type: "quiz"
- ✅ Last slide has type: "cta"

#### Get Module Info
```bash
curl http://localhost:3000/api/learn/modules/bps-2026
```
**Verify**:
- ✅ Returns complete module metadata
- ✅ Includes all three levels in structure

#### Update Module (Optional)
```bash
curl -X PUT http://localhost:3000/api/learn/modules/bps-2026 \
  -H "Content-Type: application/json" \
  -d '{"status": "published"}'
```
**Verify**:
- ✅ Returns success response
- ✅ updatedAt timestamp changes

### Test 8: Dark/Light Theme
1. Look for theme toggle in navbar
2. Switch between dark and light mode
3. Go through Stories slides in both themes
4. **Verify**:
   - ✅ All text is readable in both modes
   - ✅ Colors maintain contrast
   - ✅ Transitions work in both themes
   - ✅ Theme persists when navigating

---

## 🐛 Troubleshooting

### Issue: "Module not found" 404
**Solution**:
```bash
# Verify metadata.json exists
cat /home/gunzo/Desktop/GR8/bns/app/learn/data/modules/bps-2026/metadata.json

# Verify it's valid JSON
node -e "console.log(require('./app/learn/data/modules/bps-2026/metadata.json'))"
```

### Issue: Stories tab not visible
**Solution**:
1. Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
2. Restart dev server: `pnpm dev`
3. Check console for errors

### Issue: Transitions not smooth
**Solution**:
```bash
# Ensure framer-motion is installed
pnpm ls framer-motion

# If missing, install it
pnpm add framer-motion
```

### Issue: API returns 500 error
**Solution**:
1. Check terminal for error messages
2. Verify file paths are correct
3. Ensure JSON syntax is valid
4. Restart dev server

### Issue: Mobile layout broken
**Solution**:
1. Check DevTools breakpoint (should be 768px for md)
2. Clear CSS cache: `rm -rf .next`
3. Restart dev server

---

## 📊 Testing Checklist

### Functionality
- [ ] All 3 levels load without errors
- [ ] Can navigate between levels
- [ ] Progress bar works correctly
- [ ] Quiz functionality works
- [ ] CTA buttons are clickable

### Responsive Design
- [ ] Mobile (< 768px) layout looks good
- [ ] Tablet (768px - 1024px) layout looks good
- [ ] Desktop (> 1024px) layout looks good
- [ ] Touch interactions work on mobile
- [ ] No horizontal scrolling on any device

### Transitions & Animations
- [ ] Slide entrance animation is smooth
- [ ] Progress bar fills smoothly
- [ ] Button hovers have animations
- [ ] No jank or stuttering
- [ ] Works in both light and dark theme

### API Functionality
- [ ] GET /api/learn/modules/bps-2026 returns 200
- [ ] GET /api/learn/modules/bps-2026/slides/stories returns 200
- [ ] GET /api/learn/modules/bps-2026/slides/basic returns 200
- [ ] GET /api/learn/modules/bps-2026/slides/advanced returns 200
- [ ] PUT endpoints update successfully

### Accessibility
- [ ] Can navigate with keyboard
- [ ] Tab order makes sense
- [ ] Screen reader can read content
- [ ] Color contrast passes WCAG AA

---

## 📸 Screenshots to Verify

After reaching each step, verify the UI matches these descriptions:

### Stories - Slide 1 (Cover)
- Red background with decorative orbs
- Title: "Follow the Budget. Find the Story"
- Gradient progress bar at top
- Next button in bottom right

### Stories - Slide 2 (Concept)
- Dark background
- Yellow tag "What is the BPS?"
- Main question in large text
- 3 bullet points with icons
- Smooth entrance animation

### Stories - Slide 9 (Quiz)
- Teal background
- Question text
- 3 multiple choice options (A, B, C)
- Feedback message (only after selection)

### Stories - Slide 10 (CTA)
- Green background
- Success message
- 3 action buttons with icons

---

## 🎯 Success Criteria

You'll know the refactoring is successful when:

1. ✅ **Stories Version Works**: "Stories" tab appears and loads 10 slides without error
2. ✅ **Responsive**: Looks good on mobile (tested at 390px width)
3. ✅ **Smooth Animations**: Transitions are fluid with no stuttering
4. ✅ **All 3 Levels**: Can switch between Stories, Basic, Advanced smoothly
5. ✅ **API Working**: All endpoints respond with correct data
6. ✅ **Mobile Friendly**: Touch-friendly buttons and readable text on all sizes
7. ✅ **Quiz Works**: Can take quiz and see feedback
8. ✅ **Dark Mode**: Works in both light and dark theme

---

## 📝 Notes

### Content Source
- **Stories**: Converted from `/budgetpolicy.txt`
- **Basic**: Existing 12-slide module
- **Advanced**: Existing 20+ slide deep dive

### Design System
- Uses Tailwind CSS for responsive design
- Framer Motion for animations
- Design tokens for colors (from metadata)
- Mobile-first approach

### Performance
- All slides are pre-loaded as JSON
- Smooth 60fps animations
- No layout shift (CLS optimized)
- Responsive images and fonts

---

## 🤝 Next Steps After Testing

If all tests pass:
1. Consider adding to production
2. Set up analytics tracking
3. Add to admin dashboard
4. Create more modules following same pattern
5. Set up A/B testing for content
6. Gather user feedback

---

**Last Updated**: March 20, 2026  
**Testing Status**: Ready ✅  
**Estimated Test Time**: 10-15 minutes
