# 🏢 Restaurant Ordering System

## 📌 Overview
The **Restaurant Ordering System** is a digital solution that allows customers to scan a QR code, browse the menu, place orders, and track the order status seamlessly. The system also enables restaurant staff to manage and process orders efficiently, ensuring a smooth dining experience.

## 🔧 Tech Stack
### **Backend:**
- **Spring Boot** (Java) - REST API
- **MySQL** - Database management
- **Kafka** - Event-driven communication
- **Docker** - Containerized deployment

### **Frontend:**
- **Next.js (React.js)** - User interface
- **Tailwind CSS** - Styling
- **Google Maps API** - Location services

### **Mobile Application:**
- **React Native** (for mobile ordering and tracking)

## ✨ Key Features
✅ **QR Code Scanning** - Customers can scan a QR code to access the restaurant's menu.
✅ **Menu Browsing** - View food and drink options with detailed descriptions.
✅ **Order Placement** - Customers can place orders directly from their phones.
✅ **Real-time Order Tracking** - Status updates via WebSocket communication.
✅ **Payment Integration** - Secure online payment with **VNPay**.
✅ **Admin Dashboard** - Restaurant staff can manage orders, tables, and inventory.
✅ **Table Availability Management** - Helps in optimizing seating arrangements.
✅ **Multi-language Support** - Supports multiple languages for better accessibility.

## 🚀 How to Run
### **Prerequisites:**
- Install **Docker**
- Install **Java 23** and **Golang**
- Install **Node.js** and **Yarn**
- MySQL 8 database setup

### **Steps to Run Backend**
```bash
# Clone the repository
git clone https://github.com/dqh999/restaurant-ordering-system.git
cd restaurant-ordering-system

# Start backend services
docker-compose up -d
```

### **Steps to Run Frontend**
```bash
cd frontend
npm install
npm run dev
```

### **API Documentation:**
- Swagger UI: `http://localhost:8080/swagger-ui.html`

## 📌 Future Enhancements
- AI-based menu recommendations 🍽️
- Order history and analytics 📊
- Integration with third-party delivery services 🚴
- Loyalty and rewards system 🎁

## 💡 Contributing
We welcome contributions! Feel free to fork the repository, make changes, and create pull requests.

## 📞 Contact
- **Author:** Hop Do Quang
- **GitHub:** [dqh999](https://github.com/dqh999)