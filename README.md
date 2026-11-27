# AK STAR GLOBAL — Official Website V1.0 Starter

## Brand and design
- Premium Black & Gold
- Modern Futuristic Corporate
- Tagline: ONE BRAND. EVERY POSSIBILITY.
- Responsive pages: Home, About, Services, Portfolio, Contact, Privacy, Terms

## Run locally
1. Extract the ZIP.
2. Open the folder in VS Code.
3. Use the Live Server extension and open `index.html`.
4. The contact form remains in demo mode until Firebase is configured.

## Firebase setup
1. Create a Firebase project and register a Web App.
2. Enable Realtime Database.
3. Copy the web app config into `js/firebase-config.js`.
4. Replace every `YOUR_...` placeholder.
5. Deploy using Firebase Hosting or your preferred static host.

The form writes to `/publicEnquiries`. Do not deploy with permissive public write/read rules.
Use Firebase App Check, validation, rate limiting (preferably via Cloud Functions), and tightly scoped Realtime Database Rules before production. Do not store private API keys or service-account credentials in frontend code.

## Proposed Realtime Database structure
```json
{
  "site": {
    "settings": {
      "brandName": "AK STAR GLOBAL",
      "tagline": "ONE BRAND. EVERY POSSIBILITY.",
      "theme": "black-gold",
      "maintenanceMode": false
    },
    "pages": {
      "home": { "heroTitle": "One brand. Every possibility.", "heroDescription": "..." }
    }
  },
  "services": {
    "serviceId": {
      "title": "Photo Studio",
      "slug": "photo-studio",
      "category": "creative",
      "summary": "...",
      "description": "...",
      "active": true,
      "sortOrder": 1,
      "imageUrl": ""
    }
  },
  "portfolio": {
    "projectId": {
      "title": "Project title",
      "category": "design",
      "description": "...",
      "coverUrl": "",
      "gallery": [],
      "published": false,
      "createdAt": 0
    }
  },
  "publicEnquiries": {
    "enquiryId": {
      "name": "Customer",
      "email": "customer@example.com",
      "service": "Web Development",
      "message": "...",
      "status": "new",
      "createdAt": 0,
      "source": "website"
    }
  },
  "users": {
    "uid": {
      "displayName": "Customer",
      "email": "customer@example.com",
      "role": "customer",
      "createdAt": 0,
      "active": true
    }
  },
  "orders": {
    "orderId": {
      "customerUid": "uid",
      "serviceId": "serviceId",
      "title": "Project",
      "status": "pending",
      "quotedAmount": 0,
      "currency": "INR",
      "createdAt": 0
    }
  },
  "siteContent": {
    "announcements": {},
    "testimonials": {},
    "faqs": {}
  }
}
```

## Important data/security rules
- Firebase Authentication for customers and staff.
- Admin role must be assigned only by trusted server/Admin SDK, never by a client-side form.
- Customers may read/update only their own allowed profile fields and orders.
- Public visitors should not be able to read enquiries, users, orders or admin data.
- Prefer Cloud Functions for contact submissions, order creation, payment verification, email notifications and privileged operations.
- Add validation, spam protection, App Check, backups and audit logs before public launch.

## V1.0 build sequence
1. Approve logo, exact brand copy, contact details and service list.
2. Finalize homepage and responsive page layouts.
3. Connect Firebase config and secure enquiry workflow.
4. Add CMS-driven services, portfolio and FAQs.
5. Build Firebase Authentication and customer dashboard.
6. Build protected admin panel: services, enquiries, customers, orders, content and settings.
7. Add file uploads, quotes/invoices, payment gateway and notifications.
8. QA mobile/desktop, accessibility, SEO, analytics, backups and deployment.

## Current starter limitations
This is the public-facing website UI and a Firebase-ready enquiry-form starter. Customer login, admin panel, payment processing, upload workflows and production security rules are intentionally not enabled yet.
