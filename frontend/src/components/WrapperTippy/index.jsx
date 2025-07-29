import React from 'react';
import Tippy from '@tippyjs/react/headless';

const WrapperTippy = ({ 
    interactive=true,
    children, 
    renderTooltip,
    delay=[0,200],
    offset=[-5,15],
    placement="bottom-end"
 }
) => {
    return (
        <Tippy 
            interactive={interactive}
            render={renderTooltip}
            delay={delay}
            offset={offset}
            placement={placement}
            
        >
            {children}
        </Tippy>
    );
};

export default WrapperTippy;
