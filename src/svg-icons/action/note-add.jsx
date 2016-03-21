import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ActionNoteAdd = (props) => (
  <SvgIcon {...props}>
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"/>
  </SvgIcon>
);
ActionNoteAdd = pure(ActionNoteAdd)
ActionNoteAdd.displayName = 'ActionNoteAdd';

export default ActionNoteAdd;
