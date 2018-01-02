import { InMemoryDbService } from 'angular-in-memory-web-api';
// import { SearchFakeDb } from './search';
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
