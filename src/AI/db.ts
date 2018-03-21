import Dexie from 'dexie';

const db = new Dexie('snake-ai-DB');
db.version(1).stores({ snakes: 'id,score,brain' });

export default db;