import * as React from 'react';

export const PortalContext = React.createContext<IPortalContext>({
  gates: new Map(),
  teleport: (_gates: Map<string, React.ReactNode | undefined>, _gateName: string, _node: React.ReactNode) => {}
})
interface IPortalContext {
  gates: Map<string, React.ReactNode | undefined>,
  teleport: (gates: Map<string, React.ReactNode | undefined>, gateName: string, node: React.ReactNode) => void;
}
