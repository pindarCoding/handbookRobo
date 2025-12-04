###############################################
#               BUILDER IMAGE                 #
###############################################
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files & install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of your application source
COPY . .

# Build Next.js (normal server build, not standalone)
RUN npm run build


###############################################
#               RUNNER IMAGE                  #
###############################################
FROM node:20-alpine AS runner

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

# Copy only what you need to run "next start"
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

EXPOSE 3000

CMD ["npm", "run", "start"]
