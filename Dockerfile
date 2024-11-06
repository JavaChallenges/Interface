FROM node:18-alpine AS base

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci
RUN apk add maven
RUN apk add openjdk11

# Copy the source code
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]