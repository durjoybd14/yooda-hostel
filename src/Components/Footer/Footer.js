import React from 'react';

const Footer = () => {
    return (
        <div className='bg-light text-center text-muted py-5 px-3'>
            <h6>Copyright &copy; {new Date().getFullYear()} - Yooda Hostel </h6>
        </div>
    );
};

export default Footer;