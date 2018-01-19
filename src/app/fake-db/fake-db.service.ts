import { InMemoryDbService } from 'angular-in-memory-web-api';
import { UsersFakeDb } from './users';

export class FakeDbService implements InMemoryDbService
{
    createDb()
    {
        return {
          
            'users'                      : UsersFakeDb.users
        };
    }
}
