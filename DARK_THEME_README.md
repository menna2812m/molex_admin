# Dark Theme Implementation

## Overview

The Express Admin Dashboard now includes a comprehensive dark theme implementation with the following features:

### Features

1. **Default Dark Theme**: The application now starts with dark theme enabled by default (forced)
2. **Theme Toggle**: A simple toggle button in the header allows users to switch between light and dark themes
3. **Persistent Settings**: Theme preferences are saved in localStorage and persist across sessions
4. **Comprehensive Styling**: All components, cards, forms, tables, and navigation elements are styled for dark theme

### How to Use

#### Theme Toggle Button

- Located in the header next to the user dropdown
- Click the sun/moon icon to switch between light and dark themes
- The button shows a sun icon in dark mode and moon icon in light mode

#### Manual Theme Switching

You can also use the existing Switcher component (accessible via the theme switcher panel) for more advanced customization options.

### Technical Implementation

#### Files Modified/Created:

1. **`src/main.js`**

   - Added dark theme initialization function
   - Forces dark theme as default for all users
   - Always applies dark theme on app startup

2. **`src/Shared/Components/ThemeToggle/ThemeToggle.vue`** (New)

   - Simple theme toggle component
   - Handles theme switching logic
   - Updates localStorage with user preferences

3. **`src/Shared/Components/Header/Header.vue`**

   - Added ThemeToggle component to header
   - Positioned next to user dropdown

4. **`src/assets/css/dark-theme-vars.css`** (New)

   - CSS custom properties for dark theme colors
   - Dark theme specific overrides for components

5. **`src/style.scss`**
   - Imported dark theme CSS variables

#### CSS Variables Used:

```css
--dark-theme: #1a1a2e; /* Main dark background */
--dark-body: #16213e; /* Body background */
--dark-color: #ffffff; /* Text color */
--dark-border: #2d3748; /* Border color */
--primary-bg-color: #fd601f; /* Primary color (orange) */
--primary-bg-hover: #e55a1c; /* Primary hover color */
```

#### Theme Classes Applied:

- `dark-theme`: Applied to body for overall dark styling
- `dark-menu`: Dark sidebar styling
- `header-dark`: Dark header styling

### Customization

#### Changing Dark Theme Colors

To modify the dark theme colors, edit the CSS variables in `src/assets/css/dark-theme-vars.css`:

```css
:root {
  --dark-theme: #your-dark-bg-color;
  --dark-body: #your-body-bg-color;
  --dark-color: #your-text-color;
  --dark-border: #your-border-color;
}
```

#### Adding Dark Theme Styles

To add dark theme styles for new components, use the `.dark-theme` class:

```css
.dark-theme .your-component {
  background-color: var(--dark-theme);
  color: var(--dark-color);
  border-color: var(--dark-border);
}
```

### Browser Compatibility

The dark theme implementation uses:

- CSS Custom Properties (CSS Variables) - Supported in all modern browsers
- localStorage for persistence - Supported in all modern browsers
- CSS classes for theme switching - Universal browser support

### Future Enhancements

1. **System Theme Detection**: Automatically detect user's system theme preference
2. **Custom Color Schemes**: Allow users to customize dark theme colors
3. **Animation Transitions**: Smooth transitions between theme changes
4. **Component-Level Themes**: Individual component theme customization

### Troubleshooting

#### Theme Not Switching

- Check browser console for JavaScript errors
- Verify localStorage is enabled in browser
- Clear browser cache and reload

#### Styling Issues

- Ensure CSS variables are properly defined
- Check for conflicting CSS rules with `!important`
- Verify component classes are properly applied

#### Performance

- Theme switching is optimized for minimal reflow
- CSS variables provide efficient styling updates
- localStorage operations are minimal and fast
