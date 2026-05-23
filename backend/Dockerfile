FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose backend port
EXPOSE 8081

# Environment variables
ENV PORT=8081

# Start backend
CMD ["npm", "start"]
