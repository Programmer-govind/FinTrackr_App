# Fintrackr Application 💰📊

**Fintrackr** is a responsive and user-friendly application designed to help users manage their income and expenses efficiently. With intuitive features like transaction categorization and spending insights visualization, Fintrackr empowers users to take control of their finances.

# Live Link (https://gautam-govind-fintrackr-app.netlify.app/)

## Features ✨

- Add, edit, and delete transactions (credit/debit)
- Filter transactions by category
- Real-time insights: total credits, debits, and net balance
- Responsive, modern UI
- Persistent storage with PostgreSQL
- RESTful API with OpenAPI/Swagger documentation

## Technologies Used 🛠️
- **Frontend:** React, CSS, Netlify
- **Backend:** Spring Boot, Java, PostgreSQL, Render
- **API Docs:** Swagger/OpenAPI (springdoc-openapi)

  ---

## 📦 Getting Started (Local Development)

### Prerequisites
- Node.js & npm
- Java 17+
- Maven
- PostgreSQL

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/fintrackr.git
cd fintrackr
```

### 2. Backend Setup
- Configure your PostgreSQL database in `fintrackr-backend/src/main/resources/application.yml`.
- Build and run the backend:
```bash
cd fintrackr-backend
./mvnw spring-boot:run
```
- Swagger UI: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

### 3. Frontend Setup
- Set the API URL in `smart_fintracker/src/api.js` or via `.env`:
  - `.env`: `REACT_APP_API_URL=http://localhost:8080/api/transactions`
- Install dependencies and start the app:
```bash
cd ../smart_fintracker
npm install
npm start
```
- App: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment
- **Frontend:** Deploy `smart_fintracker` to Netlify. Set `REACT_APP_API_URL` in Netlify environment variables to your backend URL.
- **Backend:** Deploy `fintrackr-backend` to Render/Heroku/AWS. Ensure CORS is set to allow your Netlify domain.

---

## 📄 API Documentation
- Swagger UI: `/swagger-ui.html` on your backend deployment
- OpenAPI JSON: `/v3/api-docs`

---

## Screenshots 📸

![Dashboard](https://github.com/user-attachments/assets/d9f2d797-6225-4425-8bf6-c5de8211d40f)


## Usage 🚦

1. Add income and expense entries with relevant details like amount, date, and category.
2. View categorized transactions for insights into your financial behavior.
3. Explore visualizations to understand spending trends and make better financial decisions.

## Future Enhancements 🌟

* Integration with APIs for real-time currency conversion.
* User authentication for secure and personalized access.
* Export data as CSV or PDF for offline analysis.
* Integration with financial institutions for automated transaction syncing.

## Contributing 🤝

Contributions are welcome! Fork the repository and submit a pull request to share your ideas or enhancements.

## Acknowledgments 🙌

* Inspiration from personal finance management tools.
* Charting and visualization libraries for enhancing insights.
* React.js community for their excellent documentation and support.

## Connect with Me 💬

**Developer**: Gautam Govind

* GitHub: [Programmer-govind](https://github.com/Programmer-govind)
* LinkedIn: *(https://www.linkedin.com/in/gautam-govind-b92036256)*
* Email: *(gautamgovind448@gmail.com)*
