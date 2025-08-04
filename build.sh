#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

# Copy .htaccess to dist folder
echo "Copying .htaccess to dist folder..."
cp public/.htaccess dist/

# Create a simple deployment guide
echo "Creating deployment guide..."
cat > DEPLOYMENT_GUIDE.md << 'EOF'
# Deployment Guide

## Steps to Deploy:

1. Run the build command:
   ```bash
   npm run build
   ```

2. Upload the contents of the `dist` folder to your server's web root directory.

3. Make sure your server has the following configurations:

   ### Apache Configuration:
   - Enable mod_rewrite: `a2enmod rewrite`
   - Enable mod_headers: `a2enmod headers`
   - Enable mod_expires: `a2enmod expires`
   - Enable mod_deflate: `a2enmod deflate`

   ### Nginx Configuration (if using Nginx):
   ```nginx
   location / {
       try_files $uri $uri/ /index.html;
   }
   ```

4. Ensure your server is configured to serve the application from the correct directory.

## Troubleshooting:

- If you still get 404 errors, check that your server is properly configured to handle client-side routing
- Make sure the .htaccess file is in the root directory of your deployed application
- Verify that mod_rewrite is enabled on your Apache server
- Check that the base URL in your router configuration matches your deployment path

## Common Issues:

1. **404 on refresh**: This is usually caused by the server not being configured to handle client-side routing
2. **Assets not loading**: Check that the base URL in vite.config.js matches your deployment path
3. **Authentication redirects**: Ensure your authentication logic properly handles the base URL
EOF

echo "Build completed successfully!"
echo "Please check DEPLOYMENT_GUIDE.md for deployment instructions." 