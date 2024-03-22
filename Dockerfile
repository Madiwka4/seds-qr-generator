# Use an Alpine-based Node.js image for a smaller image size
FROM node:alpine

# Create a working directory inside the image
WORKDIR /app

# Copy your package.json and package-lock.json (if you have one)  
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy your project files
COPY public/ public/

COPY app/ app/

COPY next.config.mjs .

COPY postcss.config.js .
COPY tailwind.config.ts .
COPY .eslintrc.json .

# If you didn't use 'next export', you'll need to build your app inside the image. Change this if you did a static export.
RUN npm run build

# Expose a port (standard for Node.js applications is 3000)
EXPOSE 3000

# Command to start your production server
CMD [ "npm", "run", "start" ]
