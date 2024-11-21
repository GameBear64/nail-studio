const FolderDB = require('@gambar/folder-db').default;

module.exports = new FolderDB({ dbPath: './db', mergeInstances: true });
