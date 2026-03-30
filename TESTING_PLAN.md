# DrivewayCalc V2 - Testing Plan

## ✅ Repository Created & Ready for Testing!

**GitHub:** https://github.com/uplinkedassitant/driveway-calc-v2  
**Status:** Ready for Vercel deployment  
**Next.js Version:** Fixed to ^15.2.4 (was ^16.2.1)

---

## 🧪 Testing Goals

Before adopting this improved version, we need to verify:

1. **✅ Calculation Accuracy** - Test with known measurements
2. **✅ New Features** - Zoom, undo, keyboard shortcuts work
3. **✅ UI Improvements** - Better save dialog, toasts, etc.
4. **✅ Deployment** - Builds and runs on Vercel

---

## 📐 Test Case 1: Known Area Measurement

**Objective:** Verify calculation accuracy

**Test Steps:**
1. Upload photo of known area (e.g., 20ft × 30ft driveway = 600 sq ft)
2. Include tape measure or known distance in photo
3. Set scale using the known distance
4. Draw perimeter around the area
5. Check if result matches expected ~600 sq ft

**Expected Result:**  
- Should show 580-620 sq ft (±5% for perspective errors)
- Our current version: [record result]
- V2 version: [record result]

---

## 🎯 Test Case 2: Zoom Functionality

**Objective:** Verify zoom controls work correctly

**Test Steps:**
1. Upload image
2. Click zoom in button (+)
3. Click zoom out button (-)
4. Click fit to screen (maximize)
5. Draw perimeter while zoomed in
6. Check if coordinates are accurate at all zoom levels

**Expected Result:**
- Zoom in/out smooth
- Drawing works at all zoom levels
- Coordinates remain accurate
- Points stay in correct positions

---

## ⌨️ Test Case 3: Keyboard Shortcuts

**Objective:** Verify keyboard shortcuts work

**Test Steps:**
1. Upload image
2. Select "Draw Perimeter" tool
3. Click to add points
4. Press `Ctrl+Z` - should undo last point
5. Press `Enter` - should close polygon
6. Press `Esc` - should cancel current tool

**Expected Result:**
- `Ctrl+Z` removes last point only
- `Enter` closes polygon
- `Esc` cancels tool
- Shortcuts work smoothly

---

## 💾 Test Case 4: Save Dialog

**Objective:** Verify improved save functionality

**Test Steps:**
1. Draw a perimeter
2. Click "Save Job"
3. Check if custom modal appears (not browser prompt)
4. Enter job name
5. Save and verify in history

**Expected Result:**
- Clean modal dialog (not browser prompt)
- Name saved correctly
- Job appears in history
- Can reload job

---

## 🔔 Test Case 5: Toast Notifications

**Objective:** Verify user feedback works

**Test Steps:**
1. Perform actions (save, undo, close polygon)
2. Check if toast notifications appear
3. Verify toasts disappear after ~2 seconds

**Expected Result:**
- Toast appears for each action
- Shows clear messages
- Auto-dismisses after 2-3 seconds
- Doesn't block interaction

---

## 📊 Comparison Checklist

After testing, compare:

| Feature | Our Version | V2 Version | Winner |
|---------|-------------|------------|---------|
| **Calculation Accuracy** | [result] | [result] | ? |
| **Zoom Controls** | ❌ No | ✅ Yes | V2 |
| **Undo Function** | Clear all | Undo last | V2 |
| **Save Dialog** | Browser prompt | Custom modal | V2 |
| **Keyboard Shortcuts** | ❌ No | ✅ Yes | V2 |
| **Toast Notifications** | ❌ No | ✅ Yes | V2 |
| **Live Preview Lines** | ❌ No | ✅ Yes | V2 |
| **Smart Polygon Close** | ❌ No | ✅ Yes | V2 |
| **Material Estimates** | 2 types | 4 types | V2 |
| **Code Quality** | Good | Excellent | V2 |

---

## 🚀 Deployment Test

**Vercel Deployment:**

1. Go to https://vercel.com/new
2. Import GitHub repo: `uplinkedassitant/driveway-calc-v2`
3. Deploy with default settings
4. Wait for build (~1-2 min)
5. Test live app

**Expected:**
- ✅ Build succeeds
- ✅ No errors
- ✅ App loads correctly
- ✅ All features work

---

## 📝 Test Results Template

```markdown
## Test Session: [Date]
**Tester:** [Name]
**Device:** [iPhone 12 / Desktop / etc]

### Test 1: Known Area (600 sq ft expected)
- Our version: ___ sq ft
- V2 version: ___ sq ft
- Winner: ___

### Test 2: Zoom
- [ ] Works smoothly
- [ ] Accurate at all levels
- Notes: ___

### Test 3: Keyboard Shortcuts
- [ ] Ctrl+Z works
- [ ] Enter closes polygon
- [ ] Esc cancels
- Notes: ___

### Test 4: Save Dialog
- [ ] Modal appears
- [ ] Name saves correctly
- [ ] History works
- Notes: ___

### Test 5: Toast Notifications
- [ ] Toasts appear
- [ ] Clear messages
- [ ] Auto-dismiss
- Notes: ___

## Final Decision:
- [ ] Adopt V2 (better overall)
- [ ] Hybrid (merge best of both)
- [ ] Keep current (V2 issues found)

## Reasoning:
___
```

---

## 🎯 Next Steps

1. **Deploy to Vercel** - Create test deployment
2. **Run test cases** - Use known measurements
3. **Compare results** - Fill in the checklist
4. **Make decision** - Adopt, adapt, or keep current

---

**Status:** ✅ Ready for testing  
**Repository:** https://github.com/uplinkedassitant/driveway-calc-v2  
**Vercel:** Deploy when ready
