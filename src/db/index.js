const DEFAULT_CONFIG = {
  driver: process.env.DB_DRIVER || "memory",
  database: process.env.DB_NAME || "csp451_dev",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 0),
  user: process.env.DB_USER || "local_user"
};

let activeClient = null;

function normalizeConfig(overrides = {}) {
  return {
    ...DEFAULT_CONFIG,
    ...overrides,
    port: Number(overrides.port || DEFAULT_CONFIG.port)
  };
}

function createMemoryClient(config) {
  const tables = {
    audit_logs: []
  };

  return {
    connected: true,
    driver: config.driver,
    database: config.database,
    host: config.host,
    port: config.port,
    user: config.user,
    startedAt: new Date().toISOString(),
    query(statement, params = []) {
      return runMemoryQuery(tables, statement, params);
    },
    close() {
      this.connected = false;
      return { closed: true, database: this.database };
    }
  };
}

function runMemoryQuery(tables, statement, params = []) {
  const sql = String(statement || "").trim().toLowerCase();

  if (!sql) {
    return { rows: [], rowCount: 0, message: "No query provided." };
  }

  if (sql === "select 1" || sql === "select 1;") {
    return { rows: [{ result: 1 }], rowCount: 1 };
  }

  if (sql.startsWith("insert audit_logs")) {
    const record = {
      id: tables.audit_logs.length + 1,
      action: params[0] || "unknown",
      createdAt: new Date().toISOString()
    };
    tables.audit_logs.push(record);
    return { rows: [record], rowCount: 1 };
  }

  if (sql.startsWith("select * from audit_logs")) {
    return { rows: [...tables.audit_logs], rowCount: tables.audit_logs.length };
  }

  return {
    rows: [],
    rowCount: 0,
    message: `Memory database received unsupported query: ${statement}`
  };
}

function connect(overrides = {}) {
  const config = normalizeConfig(overrides);
  activeClient = createMemoryClient(config);
  return activeClient;
}

function getClient() {
  if (!activeClient || !activeClient.connected) {
    return connect();
  }

  return activeClient;
}

function query(statement, params = []) {
  return getClient().query(statement, params);
}

module.exports = {
  connect,
  getClient,
  normalizeConfig,
  query
};
