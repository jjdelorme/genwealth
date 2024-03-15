import { Pool } from 'pg'
import * as _ from 'lodash';

/**
 * Converts SQL field names from snake_case to camelCase.
 * 
 * @param rows Rows from a database query
 * @returns 
 */
export const camelCaseRows = (rows: any[]) => _.map(rows, (row) => 
  _.mapKeys(row, (value, key) => _.camelCase(key)));

export class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool()

    // the pool will emit an error on behalf of any idle clients
    // it contains if a backend error or network partition happens
    this.pool.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err);
      throw err;
    })
  }

  async query(query: string) {
    const client = await this.pool.connect()
    const res = await client.query(query)
    client.release()
    return res.rows;
  }

  async end() {
    await this.pool.end()
  }
}
