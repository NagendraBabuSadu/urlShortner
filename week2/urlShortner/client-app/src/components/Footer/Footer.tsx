import * as React from 'react';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return (
    <div className='bg-slate-800 text-white text-base text-center p-5'>
        Copyright &#169; URL Shortner | Babasura

    </div>
  )
};

export default Footer;
