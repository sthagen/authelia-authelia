CREATE TABLE IF NOT EXISTS banned_user (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires TIMESTAMP NULL DEFAULT NULL,
    expired TIMESTAMP NULL DEFAULT NULL,
    revoked BOOLEAN NOT NULL DEFAULT FALSE,
    username VARCHAR(100) NOT NULL,
    source VARCHAR(10) NOT NULL,
    reason VARCHAR(100) NULL DEFAULT NULL
);

CREATE INDEX banned_user_username_idx ON banned_user (username);
CREATE INDEX banned_user_lookup_idx ON banned_user (username, revoked, expires, expired);
CREATE INDEX banned_user_list_idx ON banned_user (revoked, expires, expired);

CREATE TABLE IF NOT EXISTS banned_ip (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires TIMESTAMP NULL DEFAULT NULL,
    expired TIMESTAMP NULL DEFAULT NULL,
    revoked BOOLEAN NOT NULL DEFAULT FALSE,
    ip VARCHAR(39) NOT NULL,
    source VARCHAR(10) NOT NULL,
    reason VARCHAR(100) NULL DEFAULT NULL
);

CREATE INDEX banned_ip_ip_idx ON banned_ip (ip);
CREATE INDEX banned_ip_lookup_idx ON banned_ip (ip, revoked, expires, expired);
CREATE INDEX banned_ip_list_idx ON banned_ip (revoked, expires, expired);
