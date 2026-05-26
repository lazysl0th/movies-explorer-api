const CONNECTING = (serviceName: string) => `[${serviceName}]: ⏳ Connecting...`
const CONNECTED = (serviceName: string) =>
  `[${serviceName}]: ✅ Connected successfully.`
const OPEN = (serviceName: string) =>
  `[${serviceName}]: 🚀 Connection open. Models Mongoose is ready.`
const ERROR = (e: Error, serviceName: string) =>
  `[${serviceName}]: ❌ Connection error: ${e.message}`
const DISCONNECTED = (serviceName: string) =>
  `[${serviceName}]: ⚠️ Disconnected.`
const RECONNECTED = (serviceName: string) =>
  `[${serviceName}]: 🔄 Connection successfully recovered.`
const DISCONNECTING = (serviceName: string) =>
  `[${serviceName}]: 🔌 Disconnecting...`
const CLOSE = (serviceName: string) => `[${serviceName}]: 🔒 Connection closed.`

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
