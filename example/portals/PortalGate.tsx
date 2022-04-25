import * as React from 'react';

import {PortalContext} from './PortalContext';

interface PortalGateProps {
  gateName: string;
}

export default function PortalGate({gateName}: PortalGateProps) {
  const {gates} = React.useContext(PortalContext);

  return <React.Fragment>{gates.get(gateName)}</React.Fragment>;
}
