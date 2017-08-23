import React from 'react';
import { Image } from 'react-native';
import * as flags from './flags';

// type Props = {
//   size: 16 | 24 | 32 | 48 | 64,
//   code: string,
//   type?: 'flat' | 'shiny',
//   style?: any,
// };

const Flag = ({ size = 64, code, type = 'shiny', style }) => {
  const flag = flags['png']['flags'][code]
  const unknownFlag = flags['png']['flags']['unknown'];
  console.log(flags['png']['flags']['yemen'])
  return (
    <Image
      source={flag || unknownFlag}
      style={[{ width: size, height: size }, style]}
    />
  );
};

export default Flag;
