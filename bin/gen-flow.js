#!/usr/bin/env node

const { compiler } = require('flowgen');
const prettier = require('prettier');

let flowDef = compiler.compileDefinitionFile(process.argv[2]);

// Fix problematic formatting.
flowDef = flowDef.replace(
  /\} (declare|export)\s+(interface|type)/g,
  '}\n$1 $2',
);

// Strip non-local imports.
flowDef = flowDef.replace(/import[^.;]*;/g, '');

// Switch imports to type imports.
flowDef = flowDef.replace(/import\s+{/g, 'import type {');

// Convert intefaces to types.
flowDef = flowDef.replace(/interface\s+([a-zA-Z]+)/g, 'type $1 =');

// Remove problems.
flowDef = flowDef.replace(/Constructor<[a-zA-Z0-9]+>\s+&/g, '');
flowDef = flowDef.replace(/& ViewProps/g, '');
flowDef = flowDef.replace(/mixins/g, 'extends');

// Annotate builtins.
flowDef = flowDef.replace(
  /(class\s+[a-zA-Z0-9]+\s+extends\s+)Component/g,
  '$1React$$Component',
);
flowDef = flowDef.replace(/ReactElement/g, 'React$$Node');

const externalTypes = {
  NativeSyntheticEvent: `
    export type NativeSyntheticEvent<T> = {|
      bubbles: ?boolean,
      cancelable: ?boolean,
      currentTarget: number,
      defaultPrevented: ?boolean,
      dispatchConfig: {|
        registrationName: string,
      |},
      eventPhase: ?number,
      preventDefault: () => void,
      isDefaultPrevented: () => boolean,
      stopPropagation: () => void,
      isPropagationStopped: () => boolean,
      isTrusted: ?boolean,
      nativeEvent: T,
      persist: () => void,
      target: ?number,
      timeStamp: number,
      type: ?string,
    |};
  `,

  // Placeholder.
  UIManagerStatic: `
    export type UIManagerStatic = {};
  `,
};

for (const [type, definition] of Object.entries(externalTypes)) {
  if (flowDef.includes(type)) {
    flowDef = definition + flowDef;
  }
}

// Wrap output.
flowDef = `
// @flow
${flowDef}
`;

console.log(
  prettier.format(flowDef, { singleQuote: true, parser: 'flow' }).trim(),
);
