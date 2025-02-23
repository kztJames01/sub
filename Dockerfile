# Stage 1: Build the frontend
FROM node:20 as frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend .
RUN npm run build

# Stage 2: Build the backend
FROM node:20 as backend-builder
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend .

# Stage 3: Final image
FROM node:20
WORKDIR /app
COPY --from=frontend-builder /app/frontend/.next ./frontend/.next
COPY --from=backend-builder /app/backend ./backend
WORKDIR /app/backend
EXPOSE 5000
CMD ["node", "app.js"]
