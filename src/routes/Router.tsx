import * as React from 'react';

import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

export function Router() {
    const auth = false;
  return (
    auth ? <AppStack /> : <AuthStack />
  );
}
