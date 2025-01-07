/** Note:
    this file only works correctly after login successfully (use carefully)
    1. only used to create a pages/category/page.jsx with default content
    2. gets all routes from localStorage dynamically
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const menuItems = JSON.parse(localStorage.getItem("userMenuItems"))
const menuItems = [
    {
        "title": "Maintenance",
        "url": "#",
        "icon": "SquareTerminal",
        "isActive": true,
        "items": [
            {
                "menuId": 101,
                "menuDesc": "Super Scheme Maker",
                "screenAction": "super-scheme-maker"
            },
            {
                "menuId": 102,
                "menuDesc": "Super Scheme Author",
                "screenAction": "super-scheme-author"
            },
            {
                "menuId": 103,
                "menuDesc": "Scheme Maker",
                "screenAction": "scheme-maker"
            },
            {
                "menuId": 104,
                "menuDesc": "Scheme Author",
                "screenAction": "scheme-author"
            },
            {
                "menuId": 105,
                "menuDesc": "Product Maker",
                "screenAction": "product-maker"
            },
            {
                "menuId": 106,
                "menuDesc": "Product Author",
                "screenAction": "product-author"
            },
            {
                "menuId": 107,
                "menuDesc": "Template Maker",
                "screenAction": "template-maker"
            },
            {
                "menuId": 108,
                "menuDesc": "Template Author",
                "screenAction": "template-author"
            },
            {
                "menuId": 109,
                "menuDesc": "KYC Maker",
                "screenAction": "kyc-maker"
            },
            {
                "menuId": 110,
                "menuDesc": "KYC Author",
                "screenAction": "kyc-author"
            },
            {
                "menuId": 111,
                "menuDesc": "KYC Document Maker",
                "screenAction": "kyc-document-maker"
            },
            {
                "menuId": 112,
                "menuDesc": "KYC Document Author",
                "screenAction": "kyc-document-author"
            },
            {
                "menuId": 118,
                "menuDesc": "Parameter Maker",
                "screenAction": "parameter-maker"
            },
            {
                "menuId": 119,
                "menuDesc": "Parameter Author",
                "screenAction": "parameter-author"
            }
        ]
    },
    {
        "title": "System Admin",
        "url": "#",
        "icon": "Bot",
        "isActive": false,
        "items": [
            {
                "menuId": 501,
                "menuDesc": "User Maker",
                "screenAction": "user-maker"
            },
            {
                "menuId": 502,
                "menuDesc": "User Author",
                "screenAction": "user-author"
            },
            {
                "menuId": 503,
                "menuDesc": "Device Maker",
                "screenAction": "device-maker"
            },
            {
                "menuId": 504,
                "menuDesc": "Device Author",
                "screenAction": "device-author"
            },
            {
                "menuId": 505,
                "menuDesc": "Country Maker",
                "screenAction": "country-maker"
            },
            {
                "menuId": 506,
                "menuDesc": "Country Author",
                "screenAction": "country-author"
            },
            {
                "menuId": 507,
                "menuDesc": "State Maker",
                "screenAction": "state-maker"
            },
            {
                "menuId": 508,
                "menuDesc": "State Author",
                "screenAction": "state-author"
            },
            {
                "menuId": 509,
                "menuDesc": "City Maker",
                "screenAction": "city-maker"
            },
            {
                "menuId": 510,
                "menuDesc": "City Author",
                "screenAction": "city-author"
            },
            {
                "menuId": 511,
                "menuDesc": "Pincode Maker",
                "screenAction": "pincode-maker"
            },
            {
                "menuId": 512,
                "menuDesc": "Pincode Author",
                "screenAction": "pincode-author"
            },
            {
                "menuId": 513,
                "menuDesc": "Login Audit Trail",
                "screenAction": "login-audit-trail"
            },
            {
                "menuId": 514,
                "menuDesc": "Image Tracker",
                "screenAction": "image-tracker"
            },
            {
                "menuId": 519,
                "menuDesc": "Service Audit Trail",
                "screenAction": "service-audit-trail"
            },
            {
                "menuId": 520,
                "menuDesc": "Corporate Maker",
                "screenAction": "corporate-maker"
            },
            {
                "menuId": 521,
                "menuDesc": "Corporate Author",
                "screenAction": "corporate-author"
            },
            {
                "menuId": 522,
                "menuDesc": "IFSC Master Maker",
                "screenAction": "ifsc-master-maker"
            },
            {
                "menuId": 523,
                "menuDesc": "IFSC Master Author",
                "screenAction": "ifsc-master-author"
            },
            {
                "menuId": 524,
                "menuDesc": "Branch Master Maker ",
                "screenAction": "branch-master-maker-"
            },
            {
                "menuId": 525,
                "menuDesc": "Branch Master Author ",
                "screenAction": "branch-master-author-"
            }
        ]
    }
]
const systemAdminItems = menuItems[1].items

const systemAdminFolder = path.join(__dirname, 'system-admin');

// Create the maintenance folder if it doesn't exist
if (!fs.existsSync(systemAdminFolder)) {
    fs.mkdirSync(systemAdminFolder);
    console.log('Created maintenance folder');
}

// Create files based on the screenAction property
systemAdminItems.forEach(item => {
    const filePath = path.join(systemAdminFolder, `${item.screenAction}.jsx`);

    // Content for the file
    const fileContent = `import PropTypes from \"prop-types\"\n\nfunction ${convertToPascalCase(item.screenAction)}Page({ title }) {\n    return (\n        <div>{title}</div>\n    )\n}\n\n${convertToPascalCase(item.screenAction)}Page.propTypes = {\n    title: PropTypes.string\n}\n\nexport default ${convertToPascalCase(item.screenAction)}Page`;

    fs.writeFileSync(filePath, fileContent);
    console.log(`Created file: ${filePath}`);
});

console.log('All files created successfully!');

function convertToPascalCase(text) {
    return text
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}
