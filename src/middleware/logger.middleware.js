import fs from "fs";
import path from "path";

export default function loggerMiddleware(req, res, next) {
  // Exclude /api/users routes from logging
  if (req.originalUrl.startsWith("/api/users")) {
    return next();
  }

  const startTime = Date.now();

  // Safe extraction
  const method = req.method || "UNKNOWN";
  const originalUrl = req.originalUrl || "UNKNOWN_URL";
  const body = req.body || {};
  const query = req.query || {};
  const params = req.params || {};

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const timestamp = new Date();
    const dateStr = timestamp.toISOString().split("T")[0]; // YYYY-MM-DD
    const logDir = path.resolve("logs");
    const logFile = path.join(logDir, `${dateStr}.log`);

    // Ensure logs directory exists
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const logEntry = {
      timestamp: timestamp.toISOString(),
      method,
      url: originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      params: Object.keys(params).length ? params : undefined,
      query: Object.keys(query).length ? query : undefined,
      body: Object.keys(body).length ? body : undefined,
    };

    const logText = `
--------------------------------------------------
🕒 ${logEntry.timestamp}
➡️  ${method} ${originalUrl}
📦 Status: ${res.statusCode} (${duration}ms)
${logEntry.params ? `🧩 Params: ${JSON.stringify(logEntry.params)}` : ""}
${logEntry.query ? `🔍 Query: ${JSON.stringify(logEntry.query)}` : ""}
${logEntry.body ? `📝 Body: ${JSON.stringify(logEntry.body)}` : ""}
--------------------------------------------------
`;

    // ✅ Console log
    console.log(logText);

    // ✅ Append log to daily file
    fs.appendFile(logFile, logText, (err) => {
      if (err) console.error("❌ Error writing log file:", err.message);
    });
  });

  next();
}
