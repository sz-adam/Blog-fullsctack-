import React, { useState } from 'react';

function UserBlockUnblockButton() {
  const [profileBlock, setProfileBlock] = useState(false);

  const handleClick = () => {
    setProfileBlock((prevProfileBlock) => !prevProfileBlock);

    if (profileBlock) {
        handleUnBlocked();
    } else {
      handleBlocked();
    }
  };

  const handleBlocked = () => {
    console.log('Profil blokkolva!');
  };

  const handleUnBlocked = () => {
    console.log('Profil feloldva!');
  };

  return (
    <div className='flex items-center justify-center'>
      <button onClick={handleClick}>
        {profileBlock ? 'Un Blocked' : 'Blocked'}
      </button>
    </div>
  );
}

export default UserBlockUnblockButton;
