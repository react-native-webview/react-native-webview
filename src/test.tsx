import React from 'react';

const Test: React.SFC<{
  show: boolean;
}> = ({ show }): React.ReactElement<string> => show && <div />;

const a =
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

console.log(a);

export default Test;
