# Contact Form Implementation

This document explains how the contact form data is saved and accessed in your Netlify-hosted website.

## How It Works

The contact form implementation uses two complementary methods to save form data:

1. **Netlify Forms**: The primary method for saving form submissions
2. **Browser LocalStorage**: A backup method that stores submissions in the user's browser

This dual approach ensures that your form data is captured even if there are temporary issues with Netlify Forms.

## Netlify Forms Integration

The contact form is configured to work with Netlify's built-in form handling service. When a user submits the form:

1. The data is sent to Netlify's servers
2. Netlify stores the submission and can notify you via email
3. You can view all submissions in your Netlify dashboard

### How to Access Netlify Form Submissions

1. Log in to your Netlify account
2. Go to your site dashboard
3. Click on "Forms" in the top navigation
4. You'll see all form submissions listed there
5. You can also set up email notifications in the Netlify dashboard

## LocalStorage Backup

As a fallback mechanism, form submissions are also saved to the browser's localStorage. This provides:

- A backup in case of connectivity issues
- A way to view submissions directly on the site
- Immediate access to submission data

### How to Access LocalStorage Submissions

We've created an admin page where you can view all submissions saved in localStorage:

1. Navigate to `/admin` on your site (e.g., `https://your-site.netlify.app/admin`)
2. Enter the password: `admin123` (you should change this in production)
3. View all submissions stored in the browser

## Important Notes

1. **LocalStorage Limitations**:
   - LocalStorage is browser-specific (submissions in one browser won't appear in another)
   - LocalStorage has limited capacity (typically 5-10MB)
   - If a user clears their browser data, the submissions will be lost

2. **Security Considerations**:
   - The admin page uses a simple password protection mechanism
   - For production, you should implement proper authentication
   - Consider changing the default password in `src/screens/Admin/AdminPage.tsx`

3. **Netlify Forms Advantages**:
   - More reliable long-term storage
   - Accessible from anywhere (not browser-specific)
   - Can trigger notifications and webhooks

## Customization

You can customize this implementation by:

1. Modifying the form fields in `src/screens/ContactUs/ContactUs.tsx`
2. Changing the admin password in `src/screens/Admin/AdminPage.tsx`
3. Adding additional form validation as needed
4. Styling the form and admin interface to match your brand

## Troubleshooting

If form submissions aren't appearing in your Netlify dashboard:

1. Make sure the hidden form in `index.html` matches your actual form structure
2. Verify that your site has been redeployed after adding the Netlify Forms configuration
3. Check that the form has the correct `data-netlify="true"` and `name="contact"` attributes
4. Test a submission and check the network tab in your browser's developer tools

For any issues with the LocalStorage backup:

1. Open your browser's developer console
2. Type `localStorage.getItem('contactSubmissions')` to see if data is being saved
3. Check for any JavaScript errors in the console when submitting the form