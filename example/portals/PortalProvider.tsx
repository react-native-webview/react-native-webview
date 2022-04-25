import * as React from 'react';

import {PortalContext} from './PortalContext';

interface PortalProviderProps {
  children: React.ReactNode;
}

export default function PortalProvider({children}: PortalProviderProps) {
  const [gates, setGates] = React.useState(new Map());

  const teleport = React.useCallback(
    (gates: Map<string, React.ReactNode | undefined>, gateName: string, node: React.ReactNode) => {
      const newGates = new Map(gates.set(gateName, node));
      setGates(newGates);
    },
    []
  );

  return <PortalContext.Provider value={{gates, teleport}}>{children}</PortalContext.Provider>;
}
