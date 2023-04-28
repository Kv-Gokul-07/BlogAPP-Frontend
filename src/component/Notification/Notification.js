import React from 'react';
import { notification } from 'antd';


const Notification = () => {
  return (
    notification.open({
        message: 'Sample-Notification-Title',
        description:
          'Sample Notification Description',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      })
  )
}

export default Notification