const CONNECTING = (serviceName: string): string =>
  `[${serviceName}]: ⏳ Connecting...`
const CONNECTED = (serviceName: string): string =>
  `[${serviceName}]: ✅ Connected successfully.`
const OPEN = (serviceName: string): string =>
  `[${serviceName}]: 🚀 Connection open. Models Mongoose is ready.`
const ERROR = (e: Error, serviceName: string): string =>
  `[${serviceName}]: ❌ Connection error: ${e.message}`
const DISCONNECTED = (serviceName: string): string =>
  `[${serviceName}]: ⚠️ Disconnected.`
const RECONNECTED = (serviceName: string): string =>
  `[${serviceName}]: 🔄 Connection successfully recovered.`
const DISCONNECTING = (serviceName: string): string =>
  `[${serviceName}]: 🔌 Disconnecting...`
const CLOSE = (serviceName: string): string =>
  `[${serviceName}]: 🔒 Connection closed.`

const DB_LOGS = {
  CONNECTING,
  CONNECTED,
  OPEN,
  ERROR,
  DISCONNECTED,
  RECONNECTED,
  DISCONNECTING,
  CLOSE,
}

export default DB_LOGS
