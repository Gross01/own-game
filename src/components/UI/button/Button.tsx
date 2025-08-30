import { ComponentPropsWithRef, ReactNode } from 'react';
import styles from './Button.module.css'

type TButtonProps = {
    children?: ReactNode;
    extraClass?: string;
} & ComponentPropsWithRef<'button'>

function Button({children, extraClass, ...props}: TButtonProps) {
    return (
        <button className={`${styles.button} ${extraClass ? extraClass : ''}`} {...props}>{children}</button>
    );
}

export default Button;
