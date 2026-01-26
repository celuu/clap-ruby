# Services

Place your API service layers and external service integrations here.

## Example:

```typescript
// userService.ts
import { supabase } from '@/config';

export const userService = {
  async getUser(id: string) {
    return supabase.from('users').select().eq('id', id);
  },
};
```
