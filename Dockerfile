FROM node:lts-alpine AS base

### Dependencies ###
FROM base AS deps
RUN apk add --no-cache libc6-compat git

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

# Builder
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

### Production image runner ###
FROM base AS runner

LABEL org.opencontainers.image.title="JavaChallenges"
LABEL org.opencontainers.image.description="JavaChallenges ist eine Plattform, die es ermöglicht, Java-Programmieraufgaben zu erstellen und diese von anderen lösen zu lassen. Die Plattform dient dazu, Programmierkenntnisse zu vertiefen und zu erweitern. Die Plattform ist vor allem für Studierende der HTW Saar gedacht, die einen Informatik-Studiengang belegen. Die Plattform ist Open Source und kann von jedem genutzt werden."
LABEL org.opencontainers.image.url="https://javachallenges.yannic-hock.de"
LABEL org.opencontainers.image.source="https://github.com/JavaChallenges"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.authors="HTW Saar"

# Install Maven and OpenJDK 11\
RUN apk add maven
RUN apk add openjdk11
# Set NODE_ENV to production
ENV NODE_ENV=production

# Disable Next.js telemetry
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

ARG VERSION

RUN touch VERSION && echo $VERSION > VERSION

# Set correct permissions for nextjs user and don't run as root
RUN mkdir .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules

COPY package.json package-lock.json* ./
COPY importBlacklist.json ./
COPY impressum.md ./
COPY importBlacklist.json ./

# Exposed port (for orchestrators and dynamic reverse proxies)
EXPOSE 3000
#ENV PORT 3000
#HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "wget", "-q0", "http://localhost:3000/health" ]

# Run the nextjs app
CMD ["npm", "run", "start"]