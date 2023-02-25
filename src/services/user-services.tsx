import React from 'react';

export class UserServices extends React.Component {
  //devuelve un usuario
  static getUserProfile = (id: string) => {
    return {
      id: 1,
      name: 'Javier Brito',
      email: 'jbrito2@utmachala.edu.ec',
      image_url:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    };
  };
}
