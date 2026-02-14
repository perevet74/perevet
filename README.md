# Webcrack Landing Page

A modern, responsive landing page for showcasing premium PHP/Laravel scripts bundle. Built with vanilla HTML, CSS, and JavaScript.

## Features

- 🎨 Modern, responsive design
- 💳 Multi-currency support (NGN, KES, XAF, GHC)
- 📱 Mobile-friendly interface
- ⚡ Smooth animations and transitions
- 🔄 Interactive FAQ accordion
- 📋 Copy-to-clipboard functionality
- 💬 WhatsApp integration
- 🎯 Scroll-to-top button
- 🎄 Floating promotional banner

## File Structure

```
webpulse/
├── index.html      # Main HTML structure
├── styles.css      # All styling and responsive design
├── script.js       # Interactive features and functionality
└── README.md       # This file
```

## Setup Instructions

1. **Clone or download** this repository to your local machine

2. **Open the project** in your code editor

3. **View the page** by opening `index.html` in your web browser
   - Simply double-click `index.html`, or
   - Use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (with http-server)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

4. **Access the page** at `http://localhost:8000` (or the port you specified)

## Customization

### Update Currency Rates

Edit the `currencyRates` object in `script.js`:

```javascript
const currencyRates = {
    NGN: { rate: 1, symbol: '₦', amount: 10000 },
    KES: { rate: 0.075, symbol: 'KES', amount: 750 },
    // Add more currencies...
};
```

### Change Contact Information

Update the phone number and WhatsApp links in:
- `index.html` - Footer and WhatsApp buttons
- `script.js` - WhatsApp message handlers

### Modify Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #10b981;
    /* ... */
}
```

### Update Content

- Edit text content directly in `index.html`
- Modify script cards, reviews, FAQ items, etc.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Breakdown

### Interactive Elements

1. **Currency Selector**: Switch between different currencies with dynamic price updates
2. **FAQ Accordion**: Click to expand/collapse FAQ items
3. **Copy Buttons**: Click to copy account numbers and amounts
4. **Smooth Scrolling**: Smooth navigation to page sections
5. **Floating Banner**: Promotional banner with close functionality
6. **Scroll to Top**: Button appears when scrolling down

### Responsive Design

- Mobile-first approach
- Breakpoints at 768px and 480px
- Flexible grid layouts
- Touch-friendly buttons and interactions

## Deployment

### Static Hosting

This is a static website and can be deployed to:

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repository
- **GitHub Pages**: Push to a repository and enable Pages
- **Any web hosting**: Upload files via FTP

### Server Requirements

No server-side requirements needed. This is a pure client-side application.

## Notes

- Update WhatsApp links with your actual phone number
- Replace Selar payment link with your actual product link
- Customize currency rates based on current exchange rates
- Add your actual payment processing backend if needed

## License

This is a template/example project. Customize it for your needs.

## Support

For questions or issues, please contact:
- Phone: +234 810 608 1318
- WhatsApp: [Click here](https://wa.me/2348106081318)

---

Built with ❤️ for Webcrack Web Solutions

