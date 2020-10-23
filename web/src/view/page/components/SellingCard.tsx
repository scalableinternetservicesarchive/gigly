import * as React from 'react';
import { style } from '../../../style/styled';

export function SellingCard() {
  return <Card/>;
}

const Card = style(
  'object',
  'flex white items-center list pa6 ph2 ',
  (p: {}) => ({
    backgroundColor: 'black',
    paddingTop: '20px',
    paddingBottom: '20px',
    justifyContent: "flex-start",
    minHeight: '200px',
    borderRadius: '25px'
  })
)