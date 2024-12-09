import React, { type PropsWithChildren } from 'react';
import { useState } from 'react';

const STATUS = { HOVERED: 'hovered', NORMAL: 'normal' };

function Link({ page, children }: PropsWithChildren<{ page: string }>) {
  const [status, setStatus] = useState(STATUS.NORMAL);

  const onMouseEnter = () => {
    setStatus(STATUS.HOVERED);
  };

  const onMouseLeave = () => {
    setStatus(STATUS.NORMAL);
  };

  return (
    <a
      className={status}
      href={page || '#'}
      aria-label={`Link is ${status}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}

export default Link;
