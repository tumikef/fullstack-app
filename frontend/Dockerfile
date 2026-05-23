FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build-time backend URL
ARG REACT_APP_BACKEND_URL

ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# Build React app
RUN npm run build

# Install static server
RUN npm install -g serve

# Expose frontend port
EXPOSE 3002

# Run frontend
CMD ["serve", "-s", "build", "-l", "3002"]
